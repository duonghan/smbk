/* eslint-disable consistent-return,no-shadow */
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load survey model
const MOCProfile = require('../../models/MOCProfile');

router.get('/test', (req, res) =>
  res.json({
    msg: 'Test MOC Profile successfully',
  }),
);

router.post(
  '/test',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const newMOCProfile = new MOCProfile({
      name: req.body.name,
      workUnit: 'Bkav',
      position: 'Intern',
      mainTasks: 'VLBM',
      speciality: 'IT',
      personalEmail: 'duonghv@bkav.com',
      phone: '0975410740',
    });

    newMOCProfile
      .save()
      .then(newMocProfile => res.json({ id: newMocProfile._id }));
  },
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const newMOCProfile = new MOCProfile({
      name: req.body.name,
      workUnit: req.body.workUnit,
      position: req.body.position,
      mainTasks: req.body.mainTasks,
      speciality: req.body.speciality,
      personalEmail: req.body.personalEmail,
      phone: req.body.phone,
      date: req.body.date,
    });

    newMOCProfile.save().then(survey => res.json(survey));
  },
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.query.id !== '') {
      MOCProfile.findById(req.query.id)
        .sort({ date: -1 })
        .then(surveys => res.json(surveys))
        .catch(err => res.status(404).json(err));
    } else {
      MOCProfile.find({})
        .then(surveys => res.json(surveys))
        .catch(err => res.status(404).json(err));
    }
  },
);

module.exports = router;
