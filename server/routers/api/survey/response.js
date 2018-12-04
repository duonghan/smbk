/* eslint-disable consistent-return,no-shadow */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load question model
const Response = require('../../../models/Response');
const Survey = require('../../../models/Survey');
const QuestionGroup = require('../../../models/QuestionGroup');
const MOCProfile = require('../../../models/MOCProfile');

const resultNEO = require('../../../utils/calculate/response/neo');
const resultRIASEC = require('../../../utils/calculate/response/riasec');
const resultPsychologic = require('../../../utils/calculate/response/psychologic');
const resultMOC = require('../../../utils/calculate/response/moc');

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
  '/submit',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Response.findById(req.body.id).then(response => {
      Survey.findById(response.survey).then(survey => {
        switch (survey.name) {
          case 'psychological_test':
            return res.json({
              result: resultPsychologic(req.body.answers),
            });
          case 'neo':
            return res.json({
              result: resultNEO(req.body.answers),
            });
          case 'riasec':
            return res.json({ result: resultRIASEC(req.body.answers) });
          case 'moc':
          case 'moc2':
            Response.findByIdAndUpdate(
              req.body.id,
              {
                $set: { answers: resultMOC(req.body.answers) },
              },
              { new: true },
            ).then(newResponse => {});
            return res.json({ result: resultMOC(req.body.answers) });
          default:
            return res.json({ result: false });
        }
      });
    });

    // res.send({ result });

    // Response.findOne({ user: req.user.id }).then(response => {
    //   if (response) {
    //     // Update
    //     Response.findOneAndUpdate(
    //       { user: req.user.id },
    //       { $set: responseFields },
    //       { new: true },
    //     ).then(newResponse => res.json(newResponse));
    //   } else {
    //     // Save profile
    //     new Response(responseFields)
    //       .save()
    //       .then(newReponse => res.json(newReponse));
    //   }
    // });
  },
);

// Initial and update response
router.post(
  '/init',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.body.userId && req.body.surveyId) {
      Response.findOne({
        user: req.body.userId.trim(),
        survey: req.body.surveyId,
      }).then(response => {
        // Get total question of current survey
        QuestionGroup.find({
          survey: req.body.surveyId,
          childs: [],
        }).then(groups => {
          let numofQuestion = 0;

          groups.map(group => {
            numofQuestion += group.questions.length;
          });

          // if not, create response document
          const initialResponse = {
            survey: mongoose.Types.ObjectId(req.body.surveyId),
            user: mongoose.Types.ObjectId(req.body.userId),
          };

          // using in moc survey to save user profile
          if (req.body.profile) {
            initialResponse.profile = mongoose.Types.ObjectId(req.body.profile);
          }

          new Response(initialResponse).save().then(newResponse =>
            res.json({
              id: newResponse._id.toString(),
              total: numofQuestion,
            }),
          );
        });
      });
    } else {
      res.status(400).json({ message: 'surveyId and userId is required' });
    }
  },
);

module.exports = router;
