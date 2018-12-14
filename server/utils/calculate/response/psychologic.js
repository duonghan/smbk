/* eslint-disable consistent-return,no-shadow */
const _ = require('lodash');

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

module.exports = resultPsychologic;
