/* eslint-disable consistent-return,no-shadow */
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load survey model
const Survey = require('../../../models/Survey');
const QuestionGroup = require('../../../models/QuestionGroup');

/**
 * @function: GET /api/survey/test
 * @desc: Test survey router
 * @access: public
 */
router.get('/test', (req, res) =>
  res.json({
    msg: `Test survey successfully`,
  }),
);

/**
 * @function: POST /api/survey
 * @desc: Create survey
 * @access: private
 */
router.post('/', (req, res) => {
  const newSurvey = new Survey({
    name: req.body.name,
    description: req.body.description,
    title: req.body.title,
    // user: req.user.id,
  });

  newSurvey.save().then(survey => res.json(survey));
});

/**
 * @function: POST /api/survey/update
 * @desc: Create survey
 * @access: private
 */
router.post('/update', (req, res) => {
  // const {
  //   id,
  //   name,
  //   survey,
  //   childs,
  //   questions,
  //   inputType,
  //   optionAnswers,
  // } = req.body;

  const newSurvey = {
    id: req.body.id,
    name: req.body.name,
    survey: req.body.survey,
    childs: req.body.childs,
    questions: req.body.questions,
    inputType: req.body.inputType,
    optionAnswers: req.body.optionAnswers,
  };

  Survey.findByIdAndUpdate(newSurvey.id, { $set: newSurvey })
    .then(survey => {
      res.json(survey);
    })
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
    Survey.find()
      .sort({ date: -1 })
      .then(surveys => res.json(surveys))
      .catch(err => res.status(404).json(err));
  },
);

/**
 * @function: GET /api/survey/list
 * @desc: Return list survey in db
 * @access: private
 */
router.get('/groups/:surveyid', (req, res) => {
  QuestionGroup.find({ survey: req.params.surveyid })
    .then(groups => {
      res.json(groups);
    })
    .catch(error => res.json({ msg: 'cannot find any groups' }));
});

module.exports = router;
