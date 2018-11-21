/* eslint-disable no-param-reassign */
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'invalidEmail';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'requiredEmail';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'requiredPassword';
  }

  return { errors, isValid: isEmpty(errors) };
};
