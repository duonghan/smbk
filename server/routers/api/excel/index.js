/* eslint-disable consistent-return,no-shadow */

const express = require('express');
const router = express.Router();
const passport = require('passport');
const XLSXChart = require('xlsx-chart');

const {
  exportPsychologicalExcel,
} = require('../../../utils/calculate/response/psychological');

const {
  exportRiasecExcel,
} = require('../../../utils/calculate/response/psychological');

router.post(
  '/psychological/response',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    if (req.user.role !== 'ADMIN') return res.status(403).end();

    const wb = exportPsychologicalExcel(req.body.data);

    return wb.write('ExcelFile.xlsx', res);
  },
);

router.post(
  '/riasec/response',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    if (req.user.role !== 'ADMIN') return res.status(403).end();

    console.log(req.body.data);
    // const wb = exportRiasecExcel(req.body.data);

    // return wb.write('ExcelFile.xlsx', res);
  },
);

router.post(
  '/psychological/chart',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    if (req.user.role !== 'ADMIN') return res.status(403).end();

    const xlsxChart = new XLSXChart();

    const opts = {
      chart: 'bar',
      titles: req.body.data.datasets.map(item => item.label),
      fields: req.body.data.labels,
      data: {},
      chartTitle: 'Biểu đồ khảo sát trắc nghiệm tâm lý học sinh trung học',
    };

    req.body.data.datasets.map(item => {
      opts.data[item.label] = {};
      item.data.map((it, index) => {
        opts.data[item.label][req.body.data.labels[index]] = it;
      });
    });

    xlsxChart.generate(opts, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        res.set({
          'Content-Type': 'application/vnd.ms-excel',
          'Content-Disposition': 'attachment; filename=chart.xlsx',
          'Content-Length': data.length,
        });

        return res.status(200).send(data);
      }
    });
  },
);

module.exports = router;
