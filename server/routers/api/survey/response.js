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
const { resultNEO } = require('../../../utils/calculate/response/neo');
const { resultRIASEC } = require('../../../utils/calculate/response/riasec');
const {
  resultPsychologic,
} = require('../../../utils/calculate/response/psychological');
const {
  resultMOC,
  generateData,
  exportExcel,
} = require('../../../utils/calculate/response/moc');

const psychologicIndex = require('../../../utils/calculate/index/psychological');

router.get(
  '/',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    if (req.user.role !== 'ADMIN' && !req.query.user)
      return res.status(403).end();

    const condition = {};

    if (req.query.name) {
      condition.name = req.query.name;
    } else {
      condition._id = req.query.survey;
    }

    Survey.findOne(condition).then(survey => {
      const resCondition = { survey: survey._id };

      if (req.query.user) {
        resCondition.user = mongoose.Types.ObjectId(req.query.user);
      }

      if (survey.name === 'moc' || survey.name === 'moc2') {
        Response.find(resCondition)
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
        Response.find(resCondition)
          .populate('user')
          .exec((err, story) => {
            if (err) return res.status(404).end(err);
            return res.json(
              story.filter(item => item.user.role !== 'ADMIN').map(item => ({
                responseId: item._id,
                userId: item.user._id,
                userName: item.user.name,
                results: item.results,
                date: item.date,
              })),
            );
          });
      }
    });
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
    Survey.findById(req.body.surveyId).then(survey => {
      switch (survey.name) {
        case 'psychological':
          const resultScore = resultPsychologic(req.body.response.answers);

          QuestionGroup.find({ survey: survey._id, parent: null })
            .select('childs name')
            .then(groups => {
              const result = [];

              groups.map(group => {
                const resultItem = {
                  name: group.name,
                };

                if (!resultScore[group._id]) {
                  resultItem.score = -1;
                }

                if (group.childs.length > 0) {
                  resultItem.score = group.childs.reduce(
                    (acc, cur) => acc + resultScore[cur._id],
                    0,
                  );
                }

                if (group.childs.length === 0 && resultScore[group._id]) {
                  resultItem.score = resultScore[group._id];
                }

                const i = _.findIndex(
                  psychologicIndex,
                  obj => obj.name === group.name,
                );

                const lower = psychologicIndex[i].m + psychologicIndex[i].sd;
                const upper =
                  psychologicIndex[i].m + 2 * psychologicIndex[i].sd;

                if (resultItem.score < 0) {
                  resultItem.description = 'Bạn chưa trả lời';
                } else if (resultItem.score < lower) {
                  resultItem.description = 'Không gặp vấn đề';
                } else if (resultItem.score > upper) {
                  resultItem.description = 'Nguy cơ';
                } else {
                  resultItem.description = 'Nên gặp chuyên gia';
                }

                result.push({
                  ...resultItem,
                  lower,
                  upper,
                  value: resultItem.score,
                });
              });

              // update response information
              new Response({
                user: mongoose.Types.ObjectId(req.body.userId),
                survey: mongoose.Types.ObjectId(req.body.surveyId),
                results: result.map(item => ({
                  item: item.name,
                  value: item.description,
                })),
              })
                .save()
                .then(() =>
                  res.json({
                    result: { name: 'psychological', result },
                  }),
                );
            });

          break;

        // return res.json(resultPsychologic(req.body.answers, survey._id));
        case 'neo':
          QuestionGroup.findOne({ survey: survey._id }).then(group => {
            const calculatedResult = resultNEO(
              req.body.response.answers[group._id],
              req.body.gender,
            );

            new Response({
              user: mongoose.Types.ObjectId(req.body.userId),
              survey: mongoose.Types.ObjectId(req.body.surveyId),
              results: _.values(calculatedResult).map(item => ({
                item: item.name,
                value: item.level.text,
              })),
            })
              .save()
              .then(() =>
                res.json({ result: { ...calculatedResult, name: 'neo' } }),
              );
          });
          break;
        case 'riasec':
          QuestionGroup.findOne({ survey: survey._id }).then(group => {
            const results = resultRIASEC(req.body.response.answers[group._id]);

            new Response({
              user: mongoose.Types.ObjectId(req.body.userId),
              survey: mongoose.Types.ObjectId(req.body.surveyId),
              results: results.orderedKeys.map((item, index) => ({
                item: results.resultIndex[item].name,
                value: index + 1,
              })),
            })
              .save()
              .then(() =>
                res.json({
                  result: resultRIASEC(req.body.response.answers[group._id]),
                }),
              );
            // end
          });

          break;
        case 'moc':
        case 'moc2':
          new Response({
            user: mongoose.Types.ObjectId(req.body.userId),
            profile: mongoose.Types.ObjectId(req.body.profileId),
            survey: mongoose.Types.ObjectId(req.body.userId),
            answers: resultMOC(req.body.response.answers),
          })
            .save()
            .then(() =>
              res.json({
                result: {
                  name: 'moc',
                  success: true,
                },
              }),
            );

          break;

        default:
          return res.json({ result: false });
      }
    });
  },
);

// Initial and update response
router.post(
  '/init',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    // Get total question of current survey
    QuestionGroup.find({
      survey: req.body.surveyId,
      childs: [],
    }).then(groups => {
      let numofQuestion = 0;

      groups.map(group => {
        numofQuestion += group.questions.length;
      });

      return res.json({ total: numofQuestion });
    });
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
