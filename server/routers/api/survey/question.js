/* eslint-disable consistent-return,no-shadow */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

// Load question model
const Question = require('../../../models/Question');
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

/**
 * @function: CRUD /api/survey/questions/
 * @desc: Question CRUD
 * @access: public
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    try {
      if (req.user.role !== 'ADMIN')
        return res
          .status(403)
          .json({ message: "You don't have permission to access this place" });

      QuestionGroup.findById(req.body.groupId).then(group => {
        const newQuestion = new Question({
          orderNumber: group.questions.length + 1,
          content: req.body.content.trim(),
        });

        newQuestion
          .save()
          .then(question => {
            // add question to question group
            QuestionGroup.findByIdAndUpdate(
              req.body.groupId,
              {
                $push: { questions: mongoose.Types.ObjectId(question._id) },
              },
              { safe: true, upsert: true },
            ).then(newGroup => res.json(question));
          })
          .catch(err => res.status(400).json(err));
      });
    } catch (e) {
      return res.status(400).json(e);
    }
  },
);

router.put(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    if (req.user.role !== 'ADMIN')
      return res
        .status(403)
        .json({ message: "You don't have permission to access this place" });

    if (!req.body.id)
      return res.status(400).json({ message: 'QuestionId not found' });

    Question.findByIdAndUpdate(
      req.body.id,
      {
        $set: {
          content: req.body.content,
        },
      },
      { new: true },
    )
      .then(question => res.json(question))
      .catch(err => res.status(404).json({ message: 'Question not found' }));
  },
);

router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Question.findByIdAndRemove(req.body.id).then(() => {
      QuestionGroup.findByIdAndUpdate(
        req.body.group,
        {
          $pull: { questions: mongoose.Types.ObjectId(req.body.id) },
        },
        { new: true },
      ).then(() => {
        res.json({ success: true });
      });
    });
  },
);

/**
 * @function: GET /api/survey/questions/group/:groupId
 * @desc: Return all questions in a group
 * @access: private
 */
router.get(
  '/group/:groupId',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    QuestionGroup.findById(req.params.groupId)
      .select('groups')
      .populate({ path: 'questions', select: 'orderNumber content' })
      .sort({ orderNumber: 1 })
      .exec((error, story) => res.json(story.questions));
  },
);

/**
 * @function: GET /api/survey/questions/count
 * @desc: Return number of questions in a survey
 * @access: private
 */
router.get(
  '/count',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    if (req.query.surveyId && req.query.surveyId !== '') {
      QuestionGroup.find({ survey: req.query.surveyId, childs: [] }).then(
        groups => {
          const total = groups.reduce(
            (acc, cur) => acc + cur.questions.length,
            0,
          );

          res.json({ total });
        },
      );
    }
  },
);

module.exports = router;
