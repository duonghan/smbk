const resultMOC = answers => {
  return Object.entries(answers).map(entry => {
    const result = { questionId: entry[0] };
    if (entry[1].score) result.value = entry[1].score;
    else if (entry[1].text) result.text = entry[1].text;
    return result;
  });
};

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const xl = require('excel4node');

// Load question model
const Response = require('../../../models/Response');
const Survey = require('../../../models/Survey');
const QuestionGroup = require('../../../models/QuestionGroup');
const Question = require('../../../models/Question');

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
        return { dataSource, groups };
      })
      .then(({ dataSource, groups }) => {
        Response.find({ survey: surveyId })
          .then(responses => {
            responses.map(response => {
              if (response.answers.length > 0) {
                response.answers.filter(answer => !answer.text).map(answer => {
                  if (!answer.value) {
                    dataSource.result[
                      answer.questionId.toString()
                    ].ignored += 1;
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
            return dataSource;
          })
          .then(dataSource => {
            // Create excel file
            // Create a new instance of a Workbook class
            const wb = new xl.Workbook(workbookConfig);

            Survey.findById(surveyId).then(survey => {
              groups.map((group, index) => {
                const ws = wb.addWorksheet(`Câu ${index + 1}`);

                ws.cell(1, 2)
                  .string(survey.title)
                  .style({
                    font: {
                      bold: true,
                      size: 18,
                    },
                  });

                ws.cell(4, 2).string(`Câu hỏi: ${group.name}`);
                group.optionAnswers.map((option, index) => {
                  ws.cell(6, 3 + index).string(option.text);
                });

                group.questions.map((question, i) => {
                  ws.cell(7 + i, 2).string(dataSource.result[question].content);

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

                ws.cell(7 + group.questions.length + 1, 2).string(
                  'Tổng số phiếu',
                );
                ws.cell(7 + group.questions.length + 2, 2).string(
                  'Phiếu trống',
                );
                ws.cell(7 + group.questions.length + 3, 2).string('Phiếu lỗi');

                ws.cell(7 + group.questions.length + 1, 3).number(
                  dataSource.totalItem,
                );
                ws.cell(7 + group.questions.length + 2, 3).number(
                  dataSource.emptyItem,
                );
                ws.cell(7 + group.questions.length + 3, 3).number(0);
              });

              resolve(wb);
            });
          });
      });
  });

module.exports = { resultMOC, generateData };
