const Validator = require('validator');
const isEmpty = require('./is-empty');
const { POSITION_LENGTH_ERROR, POSITION_NAME_ERROR, POSITION_PRICE_ERROR } = require('./constants');

module.exports = function validatePositionInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.cost = !isEmpty(data.cost) ? data.cost : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = POSITION_LENGTH_ERROR;
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = POSITION_NAME_ERROR;
  }
  if (Validator.isEmpty(data.cost)) {
    errors.cost = POSITION_PRICE_ERROR;
  }
  return { errors, isValid: isEmpty(errors) };
};
