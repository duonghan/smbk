/* eslint-disable consistent-return,no-shadow */
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const hbs = require('nodemailer-express-handlebars');
const passport = require('passport');
const _ = require('lodash');
const transporter = require('../../../utils/auth/sendMail');

// Load question model
const Question = require('../../../models/Question');
const QuestionGroup = require('../../../models/QuestionGroup');

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
router.post('/add', (req, res) => {
  const newQuestion = new Question({
    content: req.body.content.trim(),
  });

  newQuestion
    .save()
    .then(question => res.json(question))
    .catch(err => res.status(400).json(err));
});

/**
 * @function: GET /api/Question/list
 * @desc: Return list survey in db
 * @access: private
 */
router.get('/list/:groupId', (req, res) => {
  QuestionGroup.findById(req.params.groupId)
    .select('optionAnswers')
    .populate({ path: 'questions', select: 'content' })
    .exec((error, groups) => res.json(groups));
});

module.exports = router;
