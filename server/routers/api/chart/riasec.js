/* eslint-disable consistent-return,no-shadow */
const express = require('express');
const router = express.Router();
const passport = require('passport');

const Response = require('../../../models/Response');
const Survey = require('../../../models/Survey');

const {
  initialChartValues,
} = require('../../../utils/calculate/response/riasec');

router.get(
  '/',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    if (req.user.role !== 'ADMIN') return res.status(403).end();

    Survey.findOne({ name: 'riasec' }).then(survey => {
      Response.find({ survey: survey._id }).then(responses => {
        const data = initialChartValues();

        responses.map(response => {
          response.results.map(result => {
            if (data.get(result.value)) {
              const currentValue = data.get(result.value).get(result.item);
              data.get(result.value).set(result.item, currentValue + 1);
            }
          });
        });

        const data2Array = [];

        data.forEach((value, key) => {
          data2Array.push([key, [...value]]);
        });

        const fetchedData = { labels: [], datasets: [] };

        fetchedData.labels = data2Array[0][1].map(item => item[0]);

        data2Array.map((item, index) => {
          fetchedData.datasets[index] = { label: '', data: [] };

          fetchedData.datasets[index].label = item[0];
          fetchedData.datasets[index].data = item[1].map(_ => _[1]);
        });
        return res.json(fetchedData);
      });
    });
  },
);

module.exports = router;
