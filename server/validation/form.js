/* eslint-disable no-param-reassign */
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateFormInput(data) {
  const errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.content = !isEmpty(data.content) ? data.content : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Field name is required';
  }
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Field name must be betwwen 2 and 30';
  }
  if (Validator.isEmpty(data.content)) {
    errors.content = 'Field content is required';
  }

  return { errors, isValid: isEmpty(errors) };
};
