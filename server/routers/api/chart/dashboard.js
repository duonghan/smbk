/* eslint-disable consistent-return,no-shadow */
const express = require('express');
const router = express.Router();
const passport = require('passport');

const Response = require('../../../models/Response');
const User = require('../../../models/User');

router.get(
  '/user',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    if (req.user.role !== 'ADMIN') return res.status(403).end();

    User.aggregate(
      [
        {
          $group: {
            _id: {
              year: { $year: '$date' },
              month: { $month: '$date' },
              day: { $dayOfMonth: '$date' },
            },
            count: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: { year: '$_id.year', month: '$_id.month' },
            count: { $sum: '$count' },
          },
        },
        {
          $group: {
            _id: { year: '$_id.year' },
            monthlyusage: {
              $push: {
                month: '$_id.month',
                count: '$count',
              },
            },
          },
        },
      ],
      (err, result) => {
        if (err); // TODO handle error
        return res.json(result);
      },
    );
  },
);

router.get(
  '/response',
  passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    if (req.user.role !== 'ADMIN') return res.status(403).end();

    Response.aggregate(
      [
        {
          $group: {
            _id: {
              year: { $year: '$date' },
              month: { $month: '$date' },
              day: { $dayOfMonth: '$date' },
            },
            count: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: { year: '$_id.year', month: '$_id.month' },
            count: { $sum: '$count' },
          },
        },
        {
          $group: {
            _id: { year: '$_id.year' },
            monthlyusage: {
              $push: {
                month: '$_id.month',
                count: '$count',
              },
            },
          },
        },
      ],
      (err, result) => {
        if (err); // TODO handle error
        return res.json(result);
      },
    );
  },
);

module.exports = router;
