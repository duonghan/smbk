const _ = require('lodash');
const xl = require('excel4node');
const Quiche = require('quiche');
const bar = new Quiche('bar');

// Load question model
const Response = require('../../../models/Response');
const Survey = require('../../../models/Survey');
const Question = require('../../../models/Question');

const resultMOC = answers => {
  return Object.entries(answers).map(entry => {
    const result = { questionId: entry[0] };
    if (entry[1].score) result.value = entry[1].score;
    else if (entry[1].text) result.text = entry[1].text;
    return result;
  });
};

const chartColor = {
  '0': '#f33334',
  '1': '#f29b1d',
  '2': '#4cba6b',
  '3': '#9ea8ad',
  '4': '#74abe2',
  '5': '#3fb68e',
  '6': '#367dc4',
  '7': '#0e8c62',
  '8': '#ED4A7B',
  '9': '#b90c0d',
  '10': '#FFCE56',
};

// Load excel config
const { workbookConfig } = require('../../../config/excel');

const generateData = (dataSource, groups, surveyId) =>
  new Promise((resolve, reject) => {
    groups.map(group => {
      if (group.optionAnswers.length > 0) {
        group.questions.map(questionId => {
          dataSource.result[questionId] = {
            answers: {},
            ignored: 0,
          };

          group.optionAnswers.map(option => {
            dataSource.result[questionId].answers[option.score] = 0;
          });
        });
      }
    });

    Question.find({
      _id: {
        $in: _.keys(dataSource.result),
      },
    })
      .then(questions => {
        questions.map(question => {
          dataSource.result[question._id].content = question.content;
        });
        return { dataSource: data, groups };
      })
      .then(({ dataSource, groups }) => {
        Response.find({ survey: surveyId }).then(responses => {
          responses.map(response => {
            if (response.answers.length > 0) {
              response.answers.filter(answer => !answer.text).map(answer => {
                if (!answer.value) {
                  dataSource.result[answer.questionId.toString()].ignored += 1;
                } else {
                  dataSource.result[answer.questionId.toString()].answers[
                    answer.value
                  ] += 1;
                }
              });
            } else {
              dataSource.emptyItem += 1;
            }
          });
          dataSource.totalItem = responses.length;
          resolve(dataSource);
        });
      });
  });

const exportExcel = (dataSource, groups, surveyId) =>
  new Promise((resolve, reject) => {
    // Create excel file
    // Create a new instance of a Workbook class
    const wb = new xl.Workbook(workbookConfig);

    Survey.findById(surveyId).then(survey => {
      groups.map((group, index) => {
        const ws = wb.addWorksheet(`Câu ${index + 1}`);

        // write survey header for each worksheet
        ws.cell(1, 2)
          .string(survey.title)
          .style({
            font: {
              bold: true,
              size: 18,
            },
          });

        ws.cell(4, 2).string(`Câu hỏi: ${group.name}`);

        // write answer col title
        group.optionAnswers.map((option, index) => {
          ws.cell(6, 3 + index).string(option.text);
        });

        group.questions.map((question, i) => {
          // write each row question content
          ws.cell(7 + i, 2).string(dataSource.result[question].content);

          // write data
          group.optionAnswers.map((option, ii) => {
            ws.cell(7 + i, 3 + ii).number(
              dataSource.result[question].answers[option.score],
            );
          });

          if (dataSource.result[question].ignored > 0) {
            ws.cell(7 + i, 3 + group.optionAnswers.length).string(
              `Có ${
                dataSource.result[question].ignored
              } phiếu không trả lời ý này`,
            );
          }
        });

        ws.cell(7 + group.questions.length + 1, 2).string('Tổng số phiếu');
        ws.cell(7 + group.questions.length + 2, 2).string('Phiếu trống');
        ws.cell(7 + group.questions.length + 3, 2).string('Phiếu lỗi');

        ws.cell(7 + group.questions.length + 1, 3).number(dataSource.totalItem);
        ws.cell(7 + group.questions.length + 2, 3).number(dataSource.emptyItem);
        ws.cell(7 + group.questions.length + 3, 3).number(0);
      });

      resolve(wb);
    });
  });

const exportChart = (dataSource, groups) => {
  const chartData = groups.map(group => {
    return {
      name: group.name,
      labels: group.questions.map(question =>
        dataSource.result[question].content
          .split(' ')
          .map((word, i) => ((i + 1) % 4 === 0 ? `${word}\n` : word))
          .join(' '),
      ),
      datasets: group.optionAnswers.map(answer => ({
        label: answer.text,
        backgroundColor: chartColor[answer.score],
        borderColor: chartColor[answer.score],
        borderWidth: 1,
        hoverBackgroundColor: chartColor[10 - answer.score],
        hoverBorderColor: chartColor[10 - answer.score],
        data: group.questions.map(
          question => dataSource.result[question].answers[answer.score],
        ),
      })),
    };
  });
  return chartData;
};

module.exports = { resultMOC, generateData, exportExcel, exportChart };
