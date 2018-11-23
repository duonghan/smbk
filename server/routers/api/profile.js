/* eslint-disable no-shadow,consistent-return */
const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const passport = require('passport');

// Load profile model
const Profile = require('../../models/Profile');

// Load user profile
// const User = require('../../models/User');

// Load validation
const validateProfile = require('../../validation/profile');

/**
 * @function: GET /api/profile/test
 * @desc: Test profile router
 * @access: Public
 */
router.get('/test', (req, res) => res.json({ msg: 'Profile worked' }));

/**
 * @function: GET /api/profile
 * @desc: Get current users profile
 * @access: Private
 */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  },
);

/**
 * @function: POST /api/profile/
 * @desc: Create or update users profile
 * @access: Private
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfile(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get field
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.date) profileFields.date = req.body.date;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
        ).then(profile => res.json(profile));
      } else {
        // Check if handle exist
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exist';
            res.status(400).json(errors);
          }

          // Save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  },
);

module.exports = router;
