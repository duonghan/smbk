/* eslint-disable consistent-return,no-shadow */
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');

// Load question group model
const QuestionGroup = require('../../../models/QuestionGroup');
const Survey = require('../../../models/Survey');

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
router.post(
  '/update',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    Survey.findById(req.body.surveyId).then(survey => {
      QuestionGroup.findById(req.body.parent).then(parentGroups => {
        const newQuestionGroup = {};

        newQuestionGroup.id = req.body.id;
        if (req.body.name) newQuestionGroup.name = req.body.name.trim();
        if (req.body.survey) newQuestionGroup.survey = survey._id;
        if (req.body.childs) newQuestionGroup.childs = parentGroups._id;
        if (req.body.parent) newQuestionGroup.parent = req.body.parent;
        if (req.body.questions)
          newQuestionGroup.questions = JSON.parse(req.body.questions);
        if (req.body.inputType) newQuestionGroup.inputType = req.body.inputType;
        if (req.body.optionAnswers)
          newQuestionGroup.optionAnswers = JSON.parse(req.body.optionAnswers);

        // return res.json(newQuestionGroup);

        QuestionGroup.findByIdAndUpdate(newQuestionGroup.id, {
          $set: newQuestionGroup,
        })
          .then(groups => {
            res.json(groups);
          })
          .catch(err => {
            const message = 'Cannot update question group';
            res.status(404).json({ message, info: err });
          });
      });
    });
  },
);

/**
 * @function: POST /api/question-group
 * @desc: Create question group
 * @access: private
 */
router.post(
  '/add',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const newQuestionGroup = new QuestionGroup({
      name: req.body.name.trim(),
      survey: mongoose.Types.ObjectId(req.body.surveyId),
      childs: req.body.childs,
      questions: req.body.questions,
      inputType: req.body.inputType,
      optionAnswers: JSON.parse(req.body.optionAnswers),
    });

    console.log(JSON.stringify(newQuestionGroup));

    newQuestionGroup
      .save()
      .then(group => res.json(group))
      .catch(err => res.status(400).json(err));
  },
);

/**
 * @function: GET /api/survey/list
 * @desc: Return list survey in db
 * @access: private
 */
router.get(
  '/list/:surveyid',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    QuestionGroup.find(
      { survey: req.params.surveyid, parent: null },
      '_id name childs optionAnswers inputType',
    )
      .populate({ path: 'childs', select: '_id name optionAnswers inputType' })
      .sort({ date: 1 })
      .exec((error, groups) => res.json(groups));
  },
);

module.exports = router;
