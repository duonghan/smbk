/* eslint-disable consistent-return,no-shadow */
const express = require('express');
const router = express.Router();
const Mongoose = require('mongoose');

// Load question model
const ResultIndicator = require('../../../models/ResultIndicator');
const QuestionGroup = require('../../../models/QuestionGroup');
const Survey = require('../../../models/Survey');

/**
 * @function: GET /api/question/test
 * @desc: Test question router
 * @access: public
 */
router.get('/test', (req, res) =>
  res.json({
    msg: `Test question successfully`,
  }),
);

/**
 * @function: POST /api/question/add
 * @desc: Add question
 * @access: public
 */
router.post('/', (req, res) => {
  Survey.findById(req.body.surveyId).then(survey => {
    const options = {};
    options.survey = survey._id;
    if (req.body.name) options.name = req.body.name.trim();
    if (req.body.level) options.level = req.body.level;
    if (req.body.description) options.description = req.body.description.trim();

    const newResultIndicator = new ResultIndicator(options);

    newResultIndicator
      .save()
      .then(result => res.json(result))
      .catch(err => res.status(400).json(err));
  });
});

module.exports = router;
