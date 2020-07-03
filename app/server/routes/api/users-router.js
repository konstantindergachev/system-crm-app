const express = require('express');
const router = express.Router();
const { makeARegister, getLogin, getCurrentUser } = require('../../controllers/users-controller');

router.post('/register', makeARegister);
router.post('/login', getLogin);
router.get('/current', getCurrentUser);

module.exports = router;
