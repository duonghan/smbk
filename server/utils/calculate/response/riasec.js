const _ = require('lodash');
const xl = require('excel4node');
const resultIndex = require('../index/riasec');
const indexScore = require('../index/riasec');
const { workbookConfig } = require('../../../config/excel');

const resultRIASEC = answers => {
  const result = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0 };

  _.values(answers).map(item => {
    result[item.score] = result[item.score] ? result[item.score] + 1 : 1;
  });

  const orderedKeys = _.keys(result).sort((a, b) => result[b] - result[a]);

  return { name: 'riasec', result, orderedKeys, resultIndex };
};

const initialChartValues = () => {
  const initialData = new Map();

  const itemPsychological = _.toPairs(indexScore).map(item => item[1].name);
  const value = ['1', '2'];

  value.map(itemValue => {
    initialData.set(itemValue, new Map());

    itemPsychological.map(item => {
      initialData.get(itemValue).set(item, 0);
    });
  });

  return initialData;
};

const exportRiasecExcel = data => {
  const wb = new xl.Workbook(workbookConfig);

  const ws = wb.addWorksheet('Thống kê phản hồi');

  // Set title
  ws.cell(1, 2)
    .string(`Thống kê phản hồi về khảo sát "Trắc nghiệm tư vấn nghề nghiệp"`)
    .style({
      font: {
        bold: true,
        size: 18,
      },
    });

  wb.cell(3, 2).string('Chú thích: ');

  data.labels.map((item, index) => {
    ws.cell(5, 1 + index).string(item);
  });

  data.values.map((eachRow, i) => {
    eachRow.map((item, j) => {
      ws.cell(6 + i, 1 + j).string(item);
    });
  });

  return wb;
};

module.exports = { resultRIASEC, initialChartValues, exportRiasecExcel };
