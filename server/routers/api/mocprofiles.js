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
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const newMOCProfile = new MOCProfile({
      name: req.body.name,
      workUnit: req.body.workUnit,
      position: req.body.position,
      mainTask: req.body.mainTask,
      speciality: req.body.speciality,
      personalEmail: req.body.personalEmail,
      phone: req.body.phone,
    });

    newMOCProfile
      .save()
      .then(newMocProfile => res.json({ id: newMocProfile._id }))
      .catch(err => res.json(err));
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
