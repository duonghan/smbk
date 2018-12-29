/* eslint-disable consistent-return,no-shadow */
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const _ = require('lodash');

// Load question group model
const QuestionGroup = require('../../../models/QuestionGroup');
const Question = require('../../../models/Question');
const Survey = require('../../../models/Survey');

/**
 * @function: GET /api/question-group/test
 * @desc: Test question group router
 * @access: public
 */
router.get('/test', (req, res) =>
  res.json({
    msg: `Test question group successfully`,
  }),
);

/**
 * @function: POST /api/survey
 * @desc: Create survey
 * @access: private
 */
router.post(
  '/update',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    Survey.findById(req.body.surveyId).then(survey => {
      QuestionGroup.findById(req.body.parent).then(parentGroups => {
        const newQuestionGroup = {};

        newQuestionGroup.id = req.body.id;
        if (req.body.name) newQuestionGroup.name = req.body.name.trim();
        if (req.body.survey) newQuestionGroup.survey = survey._id;
        if (req.body.childs) newQuestionGroup.childs = parentGroups._id;
        if (req.body.parent) newQuestionGroup.parent = req.body.parent;
        if (req.body.questions)
          newQuestionGroup.questions = JSON.parse(req.body.questions);
        if (req.body.inputType) newQuestionGroup.inputType = req.body.inputType;
        if (req.body.optionAnswers)
          newQuestionGroup.optionAnswers = JSON.parse(req.body.optionAnswers);

        // return res.json(newQuestionGroup);

        QuestionGroup.findByIdAndUpdate(newQuestionGroup.id, {
          $set: newQuestionGroup,
        })
          .then(groups => {
            res.json(groups);
          })
          .catch(err => {
            const message = 'Cannot update question group';
            res.status(404).json({ message, info: err });
          });
      });
    });
  },
);

/**
 * @function: POST /api/question-group
 * @desc: Create question group
 * @access: private
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    try {
      // initial property
      const GroupOpt = {
        name: req.body.name,
        survey: mongoose.Types.ObjectId(req.body.surveyId),
        childs: [],
        questions: [],
        optionAnswers: [],
        inputType: req.body.inputType,
      };

      // reduce answer options result
      GroupOpt.optionAnswers = req.body.optionAnswers;

      // handle rate type answer optuion
      if (req.body.inputType === 'rate') {
        GroupOpt.optionAnswers = [
          req.body.lower,
          ...new Array(req.body.range).fill(0).map((_, index) => index + 1),
          req.body.upper,
        ];
      }

      if (req.body.parent) {
        GroupOpt.parent = mongoose.Types.ObjectId(req.body.parent);
      }

      GroupOpt.optionAnswers = GroupOpt.optionAnswers.map((item, index) => ({
        text: item,
        score: index,
      }));

      // if groupId is exist, update group, otherwise, create new group
      if (req.body.id) {
        QuestionGroup.findByIdAndUpdate(
          req.body.id,
          {
            $set: {
              ...GroupOpt,
            },
          },
          {
            new: true,
          },
        )
          .then(() =>
            res.json({
              success: true,
            }),
          )
          .catch(err => res.status(400).json(err));
      } else {
        new QuestionGroup(GroupOpt)
          .save()
          .then(group => {
            QuestionGroup.findByIdAndUpdate(
              req.body.parent,
              {
                $push: {
                  childs: group._id,
                },
              },
              {
                new: true,
              },
            ).then(() =>
              res.json({
                success: true,
              }),
            );
          })
          .catch(err => res.status(400).json(err));
      }
    } catch (e) {
      console.log(e);
    }
  },
);

/**
 * @function: PUT /api/question-group
 * @desc: Update question group information
 * @access: private
 */
router.put(
  '/',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    if (req.user.role !== 'ADMIN')
      return res
        .status(403)
        .json({ message: "You don't have permission to access this place" });

    if (!req.body.id)
      return res.status(400).json({ message: 'QuestionId not found' });

    QuestionGroup.findByIdAndUpdate(
      req.body.id,
      {
        $set: {
          name: req.body.name,
        },
      },
      { new: true },
    )
      .then(() => res.json({ success: true }))
      .catch(() => res.status(404).json({ message: 'Question not found' }));
  },
);

/**
 * @function: DELETE /api/question-group
 * @desc: Delete question group
 * @access: private
 */
router.delete(
  '/',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    try {
      QuestionGroup.findById(req.body.id).then(group => {
        if (group.parent) {
          Question.deleteMany({ _id: { $in: group.questions } }).then(() => {
            QuestionGroup.findByIdAndRemove(req.body.id).then(() => {
              QuestionGroup.findByIdAndUpdate(
                group.parent,
                {
                  $pull: {
                    childs: group._id,
                  },
                },
                {
                  new: true,
                },
              ).then(() => res.json({ success: true }));
            });
          });
        } else {
          // collect all question Id of this group
          QuestionGroup.find({ _id: { $in: group.childs } }, (err, groups) => {
            const questions = _.flattenDeep(
              groups.map(group => group.questions),
            );

            // delete all question
            Question.deleteMany({ _id: { $in: questions } }, () => {
              // delete all child question group and this question group
              QuestionGroup.deleteMany(
                { _id: { $in: [...group.childs, req.body.id] } },
                () => res.json({ success: true }),
              );
            });
          });
        }
      });
    } catch (e) {
      return res.status(404).json({ message: 'Error' });
    }
  },
);

/**
 * @function: GET /api/survey/list
 * @desc: Return list survey in db
 * @access: private
 */
router.get(
  '/list/:surveyid',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    QuestionGroup.find(
      { survey: req.params.surveyid, parent: null },
      '_id name childs optionAnswers inputType',
    )
      .populate({
        path: 'childs',
        select: '_id name optionAnswers inputType parent',
      })
      .sort({ date: 1 })
      .exec((error, groups) => res.json(groups));
  },
);

module.exports = router;
