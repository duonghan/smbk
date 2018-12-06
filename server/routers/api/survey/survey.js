/* eslint-disable consistent-return,no-shadow */
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load survey model
const Survey = require('../../../models/Survey');
const QuestionGroup = require('../../../models/QuestionGroup');

/**
 * @function: POST /api/survey
 * @desc: Create survey
 * @access: private
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    if (req.user.role === 'ADMIN') {
      const newSurvey = new Survey({
        name: req.body.name,
        description: req.body.description,
        cover: req.body.cover,
        title: req.body.title,
        requiredProfile: req.body.requiredProfile,
      });

      newSurvey.save().then(survey => res.json(survey));
    } else {
      res.status(403).send('You have no rights to visit this page');
    }
  },
);

/**
 * @function: POST /api/survey/update
 * @desc: Create survey
 * @access: private
 */
router.post(
  '/update',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    if (req.user.role === 'ADMIN') {
      const newSurvey = {
        lastUpdate: Date.now(),
      };

      if (req.body.id) newSurvey.id = req.body.id;
      if (req.body.name) newSurvey.name = req.body.name;
      if (req.body.cover) newSurvey.cover = req.body.cover;
      if (req.body.title) newSurvey.title = req.body.title;

      Survey.findByIdAndUpdate(newSurvey.id, { $set: newSurvey }, { new: true })
        .then(survey => {
          res.json(survey);
        })
        .catch(err => res.status(400).json(err));
    } else {
      res.status(403).send('You have no rights to visit this page');
    }
  },
);

/**
 * @function: GET /api/survey/list
 * @desc: Return list survey in db
 * @access: private
 */
router.get(
  '/all',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    Survey.find({})
      .then(surveys => res.json(surveys))
      .catch(err => res.status(404).json(err));
  },
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    if (req.query.id !== '') {
      Survey.findById(req.query.id)
        .sort({ date: -1 })
        .then(surveys => res.json(surveys))
        .catch(err => res.status(404).json(err));
    }
  },
);

module.exports = router;
