/* eslint-disable consistent-return,no-shadow */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load question model
const Response = require('../../../models/Response');
const QuestionGroup = require('../../../models/QuestionGroup');

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

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Response.findById(req.params.id)
      .populate('survey user')
      .exec((error, story) => {
        if (!error) return res.json(story);

        return res.json(error);
      });
  },
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const responseFields = {};
    responseFields.user = req.user.id;
    if (req.body.survey) responseFields.survey = req.body.survey;
    if (req.body.answer) responseFields.answer = JSON.parse(req.body.answer);

    Response.findOne({ user: req.user.id }).then(response => {
      if (response) {
        // Update
        Response.findOneAndUpdate(
          { user: req.user.id },
          { $set: responseFields },
          { new: true },
        ).then(newResponse => res.json(newResponse));
      } else {
        // Save profile
        new Response(responseFields)
          .save()
          .then(newReponse => res.json(newReponse));
      }
    });
  },
);

router.post(
  '/init',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.body.userId && req.body.surveyId) {
      Response.findOne({
        user: req.body.userId.trim(),
        survey: req.body.surveyId,
      }).then(response => {
        if (response) {
          res.json({ id: response._id.toString() });
        } else {
          new Response({
            survey: mongoose.Types.ObjectId(req.body.surveyId),
            user: mongoose.Types.ObjectId(req.body.userId),
          })
            .save()
            .then(newResponse => res.json({ id: newResponse._id.toString() }));
        }
      });
    } else {
      res.status(400).json({ message: 'surveyId and userId is required' });
    }
  },
);

module.exports = router;
