const resultRIASEC = answers => {
  const result = {};

  Object.values(answers).map(item => {
    result[item.score] = result[item.score] ? result[item.score] + 1 : 1;
  });

  return result;
};

module.exports = resultRIASEC;
