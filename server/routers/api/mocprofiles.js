/* eslint-disable consistent-return,no-shadow */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

// Load survey model
const MOCProfile = require('../../models/MOCProfile');
const Response = require('../../models/Response');

router.get('/test', (req, res) =>
  res.json({
    msg: 'Test MOC Profile successfully',
  }),
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
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
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
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

router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    MOCProfile.findByIdAndRemove(req.body.id).then(() => {
      Response.findOneAndRemove({
        profile: mongoose.Types.ObjectId(req.body.id),
      }).then(() => res.json({ success: true }));
    });
  },
);

module.exports = router;
