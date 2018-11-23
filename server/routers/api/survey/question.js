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
router.get(
  '/list',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Question.find()
      .sort({ date: -1 })
      .then(questions => res.json(questions))
      .catch(err => res.status(404).json(err));
  },
);

module.exports = router;
