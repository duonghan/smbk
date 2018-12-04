const resultMOC = answers => {
  return Object.entries(answers).map(entry => {
    const result = { questionId: entry[0] };
    if (entry[1].score) result.value = entry[1].score;
    else if (entry[1].text) result.text = entry[1].text;
    return result;
  });
};

module.exports = resultMOC;
