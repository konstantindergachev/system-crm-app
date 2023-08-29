const Validator = require('validator');
const isEmpty = require('./is-empty');
const {
  REGISTER_NAME_LENGTH_ERROR,
  REGISTER_NAME_ERROR,
  REGISTER_EMAIL_EMPTY,
  REGISTER_EMAIL_ERROR,
  REGISTER_PASSWORD_EMPTY,
  REGISTER_PASSWORD_LENGTH_ERROR,
  REGISTER_PASSWORD_CONFIRM_ERROR,
  REGISTER_PASSWORD_MISMATCH_ERROR,
} = require('./constants');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.passwordConfirmation = !isEmpty(data.passwordConfirmation) ? data.passwordConfirmation : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = REGISTER_NAME_LENGTH_ERROR;
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = REGISTER_NAME_ERROR;
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = REGISTER_EMAIL_EMPTY;
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = REGISTER_EMAIL_ERROR;
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = REGISTER_PASSWORD_EMPTY;
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = REGISTER_PASSWORD_LENGTH_ERROR;
  }
  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = REGISTER_PASSWORD_CONFIRM_ERROR;
  }
  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = REGISTER_PASSWORD_MISMATCH_ERROR;
  }
  return { errors, isValid: isEmpty(errors) };
};
