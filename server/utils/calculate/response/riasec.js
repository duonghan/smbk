const _ = require('lodash');
const resultIndex = require('../index/riasec');

const resultRIASEC = answers => {
  const result = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0 };

  _.values(answers).map(item => {
    result[item.score] = result[item.score] ? result[item.score] + 1 : 1;
  });

  const orderedKeys = _.keys(result).sort((a, b) => result[b] - result[a]);

  return { name: 'riasec', result, orderedKeys, resultIndex };
};

module.exports = resultRIASEC;
