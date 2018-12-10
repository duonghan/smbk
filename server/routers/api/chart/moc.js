/* eslint-disable consistent-return,no-shadow */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
  generateData,
  exportChart,
} = require('../../../utils/calculate/response/moc');

const QuestionGroup = require('../../../models/QuestionGroup');

router.get(
  '/',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    if (req.user.role !== 'ADMIN') return res.status(403).end();

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
          .then(dataSource => exportChart(dataSource, groups))
          .then(chartData => res.json(chartData));
      });
    }
  },
);

module.exports = router;
