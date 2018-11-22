/* eslint-disable consistent-return,no-shadow */
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load survey model
const Survey = require('../../../models/Survey');

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

module.exports = router;
