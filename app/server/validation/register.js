const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.passwordConfirmation = !isEmpty(data.passwordConfirmation)
    ? data.passwordConfirmation
    : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Имя должно быть между 2 и 30 символов';
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Необходимо указать имя';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Необходимо указать емайл';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Неверный емайл';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Необходимо указать пароль';
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Пароль должен быть как минимум из 6 символов';
  }
  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Необходимо указать Подтверждение Пароля';
  }
  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Пароли не совпадают';
  }
  return { errors, isValid: isEmpty(errors) };
};
