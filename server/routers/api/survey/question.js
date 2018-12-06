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
 * @function: POST /api/question/add
 * @desc: Add question
 * @access: public
 */
router.post(
  '/add',
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

router.post('/update', (req, res) => {
  const { id } = req.body;

  // Question.findById(id)
  //   .then(question => {
  //     const newQuestion = {};
  //     if (req.body.orderNumber) newQuestion.orderNumber = req.body.orderNumber;
  //     if (req.body.content) newQuestion.content = req.body.content;
  //
  //     Question.findByIdAndUpdate(id, { $set: newQuestion }, { new: true }).then(
  //       question => res.json(question),
  //     );
  //   })
  //   .catch(err => res.status(404).json({ errors: 'Question not found' }));

  // Question.find({ content: /Em/i }).then(questions => {
  //   console.log(questions.length);
  //   return res.json(questions);
  // });

  // QuestionGroup.find({ survey: '5bf4974dfa4c6c21a1b5ed68' }).then(groups => {
  //   groups.filter(item => item.questions.length > 0).map(itemParent => {
  //     itemParent.questions.map((item, index) => {
  //       Question.findByIdAndUpdate(
  //         item,
  //         {
  //           $set: {
  //             group: itemParent._id,
  //             orderNumber: index + 1,
  //           },
  //         },
  //         { new: true },
  //       ).then(doc => res.json(doc));
  //     });
  //   });
  // });

  QuestionGroup.findById('5bfc74c272cb2907acca20d7').then(groups => {
    // return res.json(groups.map(item => item.questions));
    groups.questions.map((item, index) => {
      Question.findByIdAndUpdate(
        item,
        {
          $set: {
            group: mongoose.Types.ObjectId('5bfc74c272cb2907acca20d7'),
            orderNumber: index + 1,
          },
        },
        { new: true },
      ).then(doc => res.json(doc));
    });

    // return res.json(groups.questions);
  });
});

/**
 * @function: GET /api/Question/list
 * @desc: Return list survey in db
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
