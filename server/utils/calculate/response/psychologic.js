const resultPsychologic = answers =>
  Object.values(answers).reduce((acc, cur) => acc + cur.score, 0);

module.exports = resultPsychologic;
