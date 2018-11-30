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
router.post('/', (req, res) => {
  const newSurvey = new Survey({
    name: req.body.name,
    description: req.body.description,
    cover: req.body.cover,
    title: req.body.title,
  });

  newSurvey.save().then(survey => res.json(survey));
});

/**
 * @function: POST /api/survey/update
 * @desc: Create survey
 * @access: private
 */
router.post('/update', (req, res) => {
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
});

/**
 * @function: GET /api/survey/list
 * @desc: Return list survey in db
 * @access: private
 */
router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Survey.find({})
      .select('_id name title description cover')
      .then(surveys => res.json(surveys))
      .catch(err => res.status(404).json(err));
  },
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.query.id !== '') {
      Survey.findById(req.query.id)
        .select('title name')
        .sort({ date: -1 })
        .then(surveys => res.json(surveys))
        .catch(err => res.status(404).json(err));
    }
  },
);

router.get('/groups/:surveyid', (req, res) => {
  QuestionGroup.find({ survey: req.params.surveyid })
    .then(groups => {
      res.json(groups);
    })
    .catch(error => res.json({ msg: 'cannot find any groups' }));
});

module.exports = router;
