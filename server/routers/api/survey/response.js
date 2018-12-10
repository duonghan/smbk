/* eslint-disable consistent-return,no-shadow */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const xl = require('excel4node');

// Load question model
const Response = require('../../../models/Response');
const Survey = require('../../../models/Survey');
const QuestionGroup = require('../../../models/QuestionGroup');
const Question = require('../../../models/Question');
const User = require('../../../models/User');
const MOCProfile = require('../../../models/MOCProfile');

// Load result calculator method
const resultNEO = require('../../../utils/calculate/response/neo');
const resultRIASEC = require('../../../utils/calculate/response/riasec');
const resultPsychologic = require('../../../utils/calculate/response/psychologic');
const {
  resultMOC,
  generateData,
  exportExcel,
} = require('../../../utils/calculate/response/moc');

// Load excel config
const { workbookConfig } = require('../../../config/excel');

router.get(
  '/',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    if (req.user.role !== 'ADMIN') return res.status(403).end();

    const conditional = {};

    if (req.query.survey) conditional.survey = req.query.survey;

    if (req.query.id) conditional._id = req.query.id;

    if (req.query.type === 'moc') {
      Response.find(conditional)
        .populate('profile')
        .exec((err, story) => {
          if (err) return res.status(404).end(err);
          return res.json(
            story.map(item => ({
              name: item.profile.name,
              profile: item.profile,
              answers: item.answers,
            })),
          );
        });
    } else {
      Response.find(conditional)
        .then(response => res.json(response))
        .catch(err => res.status(404).send(err));
    }
  },
);

router.get(
  '/statusList',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    if (req.user.role !== 'ADMIN') return res.status(403).end();

    const status = {};
    Survey.countDocuments({})
      .then(count => {
        status.survey = count;
        Question.countDocuments({}).then(count => {
          status.question = count;
          User.countDocuments({}).then(count => {
            status.user = count;
            Response.countDocuments({}).then(count => {
              status.response = count;
              return res.json(status);
            });
          });
        });
      })
      .catch(err => res.json(err.response));
  },
);

router.post(
  '/submit',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
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
    //       .handleUpdate()
    //       .then(newReponse => res.json(newReponse));
    //   }
    // });
  },
);

// Initial and update response
router.post(
  '/init',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
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

          // using in moc survey to handleUpdate user profile
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

router.get(
  '/export',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    if (req.query.survey) {
      const dataSource = {
        result: {},
        emptyItem: 0,
        totalItem: 0,
      };

      QuestionGroup.find({
        survey: req.query.survey,
        childs: [],
        inputType: {
          $ne: 'text-area',
        },
      }).then(groups => {
        generateData(dataSource, groups, req.query.survey)
          .then(dataSource => exportExcel(dataSource, groups, req.query.survey))
          .then(wb => wb.write('report.xlsx', res));
      });
    }
  },
);

module.exports = router;
