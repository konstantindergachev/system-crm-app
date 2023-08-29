const Validator = require('validator');
const isEmpty = require('./is-empty');
const { LOGIN_EMAIL_ERROR, LOGIN_EMAIL_EMPTY, LOGIN_PASSWORD_EMPTY } = require('./constants');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = LOGIN_EMAIL_ERROR;
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = LOGIN_EMAIL_EMPTY;
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = LOGIN_PASSWORD_EMPTY;
  }
  return { errors, isValid: isEmpty(errors) };
};
