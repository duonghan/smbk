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
            console.log(story);
            return res.json(
              story.map(item => ({
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
    Response.findById(req.body.id).then(response => {
      Survey.findById(response.survey).then(survey => {
        switch (survey.name) {
          case 'psychological':
            const resultScore = resultPsychologic(req.body.answers);
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
                Response.findByIdAndUpdate(
                  response._id,
                  {
                    $set: {
                      results: result.map(item => ({
                        item: item.name,
                        value: item.description,
                      })),
                    },
                  },
                  { new: true },
                ).then(() =>
                  res.json({
                    result: { name: 'psychological', result },
                  }),
                );
              });

            break;

          // return res.json(resultPsychologic(req.body.answers, survey._id));
          case 'neo':
            QuestionGroup.findOne({ survey: survey._id }).then(group => {
              const calculatedResult = resultNEO(req.body.answers[group._id]);
              const results = [
                ...calculatedResult.male.map(item => ({
                  item: item.name,
                  value: item.level.text,
                  gender: 'male',
                })),
                ...calculatedResult.female.map(item => ({
                  item: item.name,
                  value: item.level.text,
                  gender: 'female',
                })),
              ];

              Response.findByIdAndUpdate(
                response._id,
                {
                  $set: {
                    results,
                  },
                },
                { new: true },
              ).then(() =>
                res.json({
                  result: calculatedResult,
                }),
              );
            });
            break;
          case 'riasec':
            QuestionGroup.findOne({ survey: survey._id }).then(group => {
              const results = resultRIASEC(req.body.answers[group._id]);

              Response.findByIdAndUpdate(
                response._id,
                {
                  $set: {
                    results: results.orderedKeys.map((item, index) => ({
                      item: results.resultIndex[item].name,
                      value: index + 1,
                    })),
                  },
                },
                { new: true },
              ).then(() =>
                res.json({
                  result: resultRIASEC(req.body.answers[group._id]),
                }),
              );
            });
            break;
          case 'moc':
          case 'moc2':
            Response.findByIdAndUpdate(
              req.body.id,
              {
                $set: { answers: resultMOC(req.body.answers) },
              },
              { new: true },
            ).then(() => {});
            return res.json({ result: resultMOC(req.body.answers) });
          default:
            return res.json({ result: false });
        }
      });
    });
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
