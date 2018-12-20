/* eslint-disable consistent-return,no-shadow */
const _ = require('lodash');
const indexScore = require('../index/psychologic');

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

module.exports = { resultPsychologic, initialChartValues };
