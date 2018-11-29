/* eslint-disable consistent-return,no-shadow */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load question model
const Response = require('../../../models/Response');
const Survey = require('../../../models/Survey');
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
    Response.findById(req.body.id).then(response => {
      Survey.findById(response.survey).then(survey => {
        if (survey.name === 'psychological_test') {
          let score = 0;
          Object.values(req.body.answers).map(item => {
            score += item.score;
          });

          console.log(score);
        }
        if (survey.name === 'neo') {
          const reverseIndex = [
            2,
            3,
            4,
            7,
            8,
            9,
            12,
            14,
            17,
            22,
            23,
            27,
            32,
            37,
            38,
            42,
            43,
            47,
            48,
            49,
            50,
            52,
            53,
            54,
            57,
            59,
          ];

          const C = [1, 6, 11, 16, 21, 26, 31, 36, 41, 46, 51, 56];
          const A = [2, 7, 12, 17, 22, 27, 32, 37, 42, 47, 52, 57];
          const N = [4, 9, 14, 19, 24, 29, 34, 39, 44, 49, 54, 59];
          const O = [3, 8, 13, 18, 23, 28, 33, 38, 43, 48, 53, 58];
          const E = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

          // reverse
          const newResponse = Object.values(req.body.answers).map(item => {
            if (reverseIndex.includes(item.orderNum))
              item.score = 4 - item.score;
            return item;
          });

          console.log(JSON.stringify(newResponse));

          const scoreC = C.reduce(
            (accumulator, currentValue) =>
              newResponse[accumulator] + newResponse[currentValue],
            0,
          );

          console.log(scoreC);
        }
        if (survey.name === 'riasec') {
        }
      });
    });

    res.send(req.body);

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

router.post(
  '/init',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.body.userId && req.body.surveyId) {
      Response.findOne({
        user: req.body.userId.trim(),
        survey: req.body.surveyId,
      }).then(response => {
        QuestionGroup.find({
          survey: req.body.surveyId,
          childs: [],
        }).then(groups => {
          let numofQuestion = 0;

          groups.map(group => {
            numofQuestion += group.questions.length;
          });

          if (response) {
            res.json({ id: response._id.toString(), total: numofQuestion });
          } else {
            new Response({
              survey: mongoose.Types.ObjectId(req.body.surveyId),
              user: mongoose.Types.ObjectId(req.body.userId),
            })
              .save()
              .then(newResponse =>
                res.json({
                  id: newResponse._id.toString(),
                  total: numofQuestion,
                }),
              );
          }
        });
      });
    } else {
      res.status(400).json({ message: 'surveyId and userId is required' });
    }
  },
);

module.exports = router;
