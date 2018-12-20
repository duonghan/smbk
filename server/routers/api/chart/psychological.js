/* eslint-disable consistent-return,no-shadow */
const express = require('express');
const router = express.Router();
const passport = require('passport');

const Response = require('../../../models/Response');
const Survey = require('../../../models/Survey');

const {
  initialChartValues,
} = require('../../../utils/calculate/response/psychological');

router.get(
  '/',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    if (req.user.role !== 'ADMIN') return res.status(403).end();

    Survey.findOne({ name: 'psychologic_test' }).then(survey => {
      Response.find({ survey: survey._id }).then(responses => {
        // return res.json(responses);

        const data = initialChartValues();

        responses.map(response => {
          response.results.map(result => {
            const currentValue = data.get(result.value).get(result.item);
            data.get(result.value).set(result.item, currentValue + 1);
          });
        });

        const data2Array = [];

        data.forEach((value, key) => {
          data2Array.push([key, [...value]]);
        });

        return res.json(data2Array);
      });
    });
  },
);

module.exports = router;
