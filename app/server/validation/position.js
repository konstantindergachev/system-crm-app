const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePositionInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.cost = !isEmpty(data.cost) ? data.cost : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Название должно быть между 2 и 30 символов';
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Необходимо указать название';
  }
  if (Validator.isEmpty(data.cost)) {
    errors.cost = 'Необходимо указать цену';
  }
  return { errors, isValid: isEmpty(errors) };
};
