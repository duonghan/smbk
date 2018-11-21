/* eslint-disable consistent-return,no-shadow */
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const hbs = require('nodemailer-express-handlebars');
const passport = require('passport');
const _ = require('lodash');
const transporter = require('../../utils/auth/sendMail');


// Load answer model
const Answer = require('../../models/Answer');

/**
 * @function: GET /api/answer/test
 * @desc: Test answer router
 * @access: public
 */
router.get('/test', (req, res) =>
  res.json({
    msg: `Test answer successfully`,
  }),
);

/**
 * @function: GET /api/answer/list
 * @desc: Return list answer in db
 * @access: private
 */
router.get(
  '/list',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Answer.find()
    .sort({ date: -1 })
    .then(answers => res.json(answers))
    .catch(err => res.status(404).json(err));
  },
);

module.exports = router;
