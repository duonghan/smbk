const _ = require('lodash');
const resultIndex = require('../index/riasec');
const indexScore = require('../index/riasec');

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

module.exports = { resultRIASEC, initialChartValues };
