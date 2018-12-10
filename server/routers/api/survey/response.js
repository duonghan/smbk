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
const resultMOC = require('../../../utils/calculate/response/moc');

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
    //       .save()
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

router.get(
  '/export',
  // passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
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
      })
        .then(groups => {
          groups.map(group => {
            if (group.optionAnswers.length > 0) {
              group.questions.map(questionId => {
                dataSource.result[questionId] = {
                  answers: {},
                  ignored: 0,
                };

                group.optionAnswers.map(option => {
                  dataSource.result[questionId].answers[option.score] = 0;
                });
              });
            }
          });

          // _.mapKeys(dataSource.result, key => {
          //   Question.findById(key).then(question => {
          //     dataSource.result[key].content = question.content;
          //   });
          // });

          return { dataSource, groups };
        })
        .then(({ dataSource, groups }) => {
          Response.find({ survey: req.query.survey })
            .then(responses => {
              responses.map(response => {
                if (response.answers.length > 0) {
                  response.answers
                    .filter(answer => !answer.text)
                    .map(answer => {
                      if (!answer.value) {
                        dataSource.result[
                          answer.questionId.toString()
                        ].ignored += 1;
                      } else {
                        dataSource.result[answer.questionId.toString()].answers[
                          answer.value
                        ] += 1;
                      }
                    });
                } else {
                  dataSource.emptyItem += 1;
                }
              });
              dataSource.totalItem = responses.length;
              return dataSource;
            })
            .then(dataSource => {
              // Create excel file
              // Create a new instance of a Workbook class
              const wb = new xl.Workbook(workbookConfig);

              Survey.findById(req.query.survey).then(survey => {
                groups.map((group, index) => {
                  const ws = wb.addWorksheet(`Câu ${index + 1}`);

                  ws.cell(1, 2)
                    .string(survey.title)
                    .style({
                      font: {
                        bold: true,
                        size: 18,
                      },
                    });

                  ws.cell(4, 2).string(`Câu hỏi: ${group.name}`);
                  group.optionAnswers.map((option, index) => {
                    ws.cell(6, 3 + index).string(option.text);
                  });

                  group.questions.map((question, i) => {
                    ws.cell(7 + i, 2).string(question.toString());

                    group.optionAnswers.map((option, ii) => {
                      ws.cell(7 + i, 3 + ii).number(
                        dataSource.result[question].answers[option.score],
                      );
                    });

                    if (dataSource.result[question].ignored > 0) {
                      ws.cell(7 + i, 3 + group.optionAnswers.length).string(
                        `Có ${
                          dataSource.result[question].ignored
                        } phiếu không trả lời ý này`,
                      );
                    }
                  });

                  ws.cell(7 + group.questions.length + 1, 2).string(
                    'Tổng số phiếu',
                  );
                  ws.cell(7 + group.questions.length + 2, 2).string(
                    'Phiếu trống',
                  );
                  ws.cell(7 + group.questions.length + 3, 2).string(
                    'Phiếu lỗi',
                  );

                  ws.cell(7 + group.questions.length + 1, 3).number(
                    dataSource.totalItem,
                  );
                  ws.cell(7 + group.questions.length + 2, 3).number(
                    dataSource.emptyItem,
                  );
                  ws.cell(7 + group.questions.length + 3, 3).number(0);
                });

                return wb.write('report.xlsx', res);
              });
            });
        });
    }
  },
);

module.exports = router;
