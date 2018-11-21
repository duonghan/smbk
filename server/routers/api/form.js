/* eslint-disable no-unused-vars,consistent-return */
const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const passport = require('passport');

// Form model
const Form = require('../../models/Form');
const Profile = require('../../models/Profile');

// Validation
const validateFormInput = require('../../validation/form');

router.get('/test', (req, res) => res.json({ msg: 'Form works!' }));

/**
 * @function: GET /api/form
 * @desc: Get forms
 * @access: public
 */
router.get('/', (req, res) => {
  Form.find()
    .sort({ date: -1 })
    .then(forms => res.json(forms))
    .catch(err => res.status(404).json(err));
});

/**
 * @function: GET /api/form/:id
 * @desc: Get form by id
 * @access: public
 */
router.get('/:id', (req, res) => {
  Form.findById(req.params.id)
    .then(form => res.json(form))
    .catch(err => res.status(404).json(err));
});

/**
 * @function: POST /api/form
 * @desc: Create form
 * @access: private
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateFormInput(req.body);

    // Check Validate
    if (!isValid) {
      return res.status(400).json({ errors });
    }

    const newForm = new Form({
      name: req.body.name,
      content: req.body.content,
      user: req.user.id,
    });

    newForm.save().then(form => res.json(form));
  },
);

/**
 * @function: DELETE /api/form/:id
 * @desc: Delete form
 * @access: private
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Form.findById(req.params.id)
        .then(form => {
          // Check for form owner
          if (form.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          // Delete this form
          form.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ formnotfound: 'No Form founed' }));
    });
  },
);

module.exports = router;
