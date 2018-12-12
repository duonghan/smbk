/* eslint-disable consistent-return,no-shadow */
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const _ = require('lodash');

// Load question group model
const QuestionGroup = require('../../../models/QuestionGroup');
const Question = require('../../../models/Question');
const Survey = require('../../../models/Survey');

const resultPsychologic = (answers, surveyId) => {
  QuestionGroup.find({ survey: surveyId, parent: null }).then(groups => {
    console.log(groups);
    return groups;
  });
};

module.exports = resultPsychologic;
