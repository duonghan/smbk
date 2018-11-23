/* eslint-disable consistent-return,no-shadow */
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');

// Load question group model
const QuestionGroup = require('../../../models/QuestionGroup');

/**
 * @function: GET /api/question-group/test
 * @desc: Test question group router
 * @access: public
 */
router.get('/test', (req, res) =>
  res.json({
    msg: `Test question group successfully`,
  }),
);

/**
 * @function: POST /api/survey
 * @desc: Create survey
 * @access: private
 */
router.post('/', (req, res) => {
  const newSurvey = new QuestionGroup({
    name: req.body.name,
    description: req.body.description,
    title: req.body.title,
    // user: req.user.id,
  });

  newSurvey.save().then(survey => res.json(survey));
});

/**
 * @function: POST /api/question-group
 * @desc: Create question group
 * @access: private
 */
router.post('/add', (req, res) => {
  const newQuestionGroup = new QuestionGroup({
    name: req.body.name,
    survey: mongoose.Types.ObjectId(req.body.surveyId),
    childs: req.body.childs,
    questions: req.body.questions,
    inputType: req.body.inputType,
    optionAnswers: req.body.optionAnswers,
  });

  console.log(JSON.stringify(newQuestionGroup));

  newQuestionGroup
    .save()
    .then(group => res.json(group))
    .catch(err => res.status(400).json(err));
});

/**
 * @function: GET /api/survey/list
 * @desc: Return list survey in db
 * @access: private
 */
router.get(
  '/list',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    QuestionGroup.find()
      .sort({ date: -1 })
      .then(surveys => res.json(surveys))
      .catch(err => res.status(404).json(err));
  },
);

module.exports = router;
