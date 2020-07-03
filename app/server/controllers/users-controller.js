const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');
const validatorRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const User = require('../models/user-model');
const { errorHandler } = require('../../../handlers/errorHandlers');

module.exports = {
  //@route POST api/users/register
  //@desc Register users route
  //@access Public
  async makeARegister(req, res) {
    const { errors, isValid } = validatorRegisterInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      errors.email = 'Емайл уже занят';
      return res.status(409).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newUser.password, salt);
        newUser.password = hash;
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
      } catch (err) {
        errorHandler(res, err);
      }
    }
  },
  //@route POST api/users/login
  //@desc Login users route
  //@access Public
  async getLogin(req, res) {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });

    if (!user) {
      errors.email = 'Пользователь с таким емайл не найден';
      return res.status(404).json(errors);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const jwtPayload = { id: user.id, name: user.name };
      const token = await jwt.sign(jwtPayload, keys.secretOrKey, {
        expiresIn: 3600,
      });
      res.status(200).json({ success: true, token: `Bearer ${token}`, user });
    } else {
      errors.password = 'Неправильный пароль. Попробуйте снова.';
      return res.status(401).json(errors);
    }
  },
  //@route GET api/users/current
  //@desc Get info about current user
  //@access Public
  async getCurrentUser(req, res) {
    return await res.json({ msg: 'getCurrentUser' });
  },
};
