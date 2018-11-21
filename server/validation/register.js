/* eslint-disable no-param-reassign */
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  const errors = {};

  // Validator package only validate string
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (
    !Validator.isLength(data.name.trim(), {
      min: 2,
      max: 30,
    })
  ) {
    errors.name = 'validateName';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'requiredName';
  }

  if (!Validator.isEmail(data.email.trim())) {
    errors.email = 'validateEmail';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'requiredEmail';
  }

  if (
    !Validator.isLength(data.password, {
      min: 6,
      max: 30,
    })
  ) {
    errors.password = 'validatePassword';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'requiredPassword';
  }

  if (!Validator.equals(data.password2, data.password)) {
    errors.password2 = 'validatePassword2';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'requiredPassword2';
  }

  return { errors, isValid: isEmpty(errors) };
};
