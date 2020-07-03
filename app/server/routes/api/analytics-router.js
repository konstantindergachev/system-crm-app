const express = require('express');
const passport = require('passport');
const router = express.Router();
const { getOverview, getAnalytics } = require('../../controllers/analytics-controller');

router.get('/overview', passport.authenticate('jwt', { session: false }), getOverview);
router.get('/analytics', passport.authenticate('jwt', { session: false }), getAnalytics);

module.exports = router;
