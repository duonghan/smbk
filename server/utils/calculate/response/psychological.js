/* eslint-disable consistent-return,no-shadow */
const _ = require('lodash');
const xl = require('excel4node');

const indexScore = require('../index/psychological');
const { workbookConfig } = require('../../../config/excel');

const resultPsychologic = answers => {
  const result = {};
  _.keys(answers).map(key => {
    result[key] = _.values(answers[key]).reduce(
      (acc, cur) => acc + cur.score,
      0,
    );
  });

  return result;
};

const initialChartValues = () => {
  const initialData = new Map();

  const itemPsychological = indexScore.map(item => item.name);
  const value = ['Nên gặp chuyên gia', 'Nguy cơ', 'Không gặp vấn đề'];

  value.map(itemValue => {
    initialData.set(itemValue, new Map());

    itemPsychological.map(item => {
      initialData.get(itemValue).set(item, 0);
    });
  });

  return initialData;
};

const exportExcel = data => {
  const wb = new xl.Workbook(workbookConfig);

  const ws = wb.addWorksheet('Thống kê phản hồi');

  // Set title
  ws.cell(1, 2)
    .string(
      `Thống kê phản hồi về khảo sát "Trắc nghiệm tâm lý học sinh trung học"`,
    )
    .style({
      font: {
        bold: true,
        size: 18,
      },
    });

  data.labels.map((item, index) => {
    ws.cell(3, 1 + index).string(item);
  });

  data.values.map((eachRow, i) => {
    eachRow.map((item, j) => {
      ws.cell(4 + i, 1 + j).string(item);
    });
  });

  return wb;
};

module.exports = {
  resultPsychologic,
  initialChartValues,
  exportExcel,
};
