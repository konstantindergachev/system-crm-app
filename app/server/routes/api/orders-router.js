const express = require('express');
const passport = require('passport');
const router = express.Router();
const { getAllOrders, createOrder } = require('../../controllers/orders-controller');

router.get('/order', passport.authenticate('jwt', { session: false }), getAllOrders);
router.post('/order', passport.authenticate('jwt', { session: false }), createOrder);

module.exports = router;
