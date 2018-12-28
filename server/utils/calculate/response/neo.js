const _ = require('lodash');
const xl = require('excel4node');
const indexName = require('../index/neo');

const { workbookConfig } = require('../../../config/excel');

const reverseIndex = [
  2,
  3,
  4,
  7,
  8,
  9,
  12,
  14,
  17,
  22,
  23,
  27,
  32,
  37,
  38,
  42,
  43,
  47,
  48,
  49,
  50,
  52,
  53,
  54,
  57,
  59,
];
const a = {
  C: [1, 6, 11, 16, 21, 26, 31, 36, 41, 46, 51, 56],
  A: [2, 7, 12, 17, 22, 27, 32, 37, 42, 47, 52, 57],
  N: [4, 9, 14, 19, 24, 29, 34, 39, 44, 49, 54, 59],
  O: [3, 8, 13, 18, 23, 28, 33, 38, 43, 48, 53, 58],
  E: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
};

const indexScore = {
  female: {
    A: {
      lower: 19.1,
      upper: 35.4,
    },
    C: {
      lower: 22.4,
      upper: 32.5,
    },
    O: {
      lower: 22.4,
      upper: 33.8,
    },
    N: {
      lower: 22.6,
      upper: 38.2,
    },
    E: {
      lower: 25.7,
      upper: 39.8,
    },
  },

  male: {
    A: {
      lower: 18.1,
      upper: 35.4,
    },
    C: {
      lower: 20.3,
      upper: 33.7,
    },
    O: {
      lower: 23.5,
      upper: 33.7,
    },
    N: {
      lower: 19.8,
      upper: 34.8,
    },
    E: {
      lower: 23.5,
      upper: 37.8,
    },
  },
};

const resultIndex = require('../index/neo');

const level = {
  low: {
    text: 'Thấp',
    color: 'blue',
  },
  mid: {
    text: 'Trung bình',
    color: 'green',
  },
  high: {
    text: 'Cao',
    color: 'red',
  },
};

const resultNEO = (answers, gender) => {
  // reverse
  const newResponse = Object.values(answers).map(item => {
    if (reverseIndex.includes(item.orderNum)) item.score = 4 - item.score;
    return item;
  });

  const resultScore = compareWithIndex(newResponse, gender);

  return resultScore;
};

const sumOfScore = (answers, type) =>
  answers
    .filter(item => a[type].includes(item.orderNum))
    .reduce((acc, cur) => acc + cur.score, 0);

const compare = (lower, upper, num) => {
  if (num < lower) return 'low';
  if (lower < num && num < upper) return 'mid';
  return 'high';
};

const compareWithIndex = (response, gender) => {
  const test = {};
  Object.entries(indexScore[gender]).forEach(entry => {
    const type = entry[0];
    const range = entry[1];
    const sum = sumOfScore(response, type);
    test[type] = compare(range.lower, range.upper, sum);
  });

  return _.toPairs(test).map(entry => ({
    name: resultIndex[entry[0]].name,
    level: level[entry[1]],
    description: resultIndex[entry[0]][entry[1]],
  }));
};

const initialChartValues = () => {
  const initialData = new Map();

  const itemPsychological = _.toPairs(indexName).map(item => item[1].name);
  const value = ['Thấp', 'Trung bình', 'Cao'];

  value.map(itemValue => {
    initialData.set(itemValue, new Map());

    itemPsychological.map(item => {
      initialData.get(itemValue).set(item, 0);
    });
  });

  return initialData;
};

const exportNeoExcel = data => {
  const wb = new xl.Workbook(workbookConfig);

  const ws = wb.addWorksheet('Thống kê phản hồi');

  // Set title
  ws.cell(1, 2)
    .string(`Thống kê phản hồi về khảo sát "Trắc nghiệm dự đoán nhân cách"`)
    .style({ font: { bold: true, size: 18 } });

  data.labels.map((item, index) => {
    ws.cell(3, 1 + index)
      .string(item)
      .style({ font: { bold: true } });
  });

  data.values.map((eachRow, i) => {
    eachRow.map((item, j) => {
      ws.cell(4 + i, 1 + j).string(item);
    });
  });

  return wb;
};

module.exports = { resultNEO, initialChartValues, exportNeoExcel };
