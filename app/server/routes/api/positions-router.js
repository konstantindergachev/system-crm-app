const express = require('express');
const passport = require('passport');
const router = express.Router();
const { getPositionOfCategory, createPosition, updatePosition, deletePosition } = require('../../controllers/positions-controller');

router.get('/position/:categoryId', passport.authenticate('jwt', { session: false }), getPositionOfCategory);
router.post('/position/', passport.authenticate('jwt', { session: false }), createPosition);
router.patch('/position/:id', passport.authenticate('jwt', { session: false }), updatePosition);
router.delete('/position/:id', passport.authenticate('jwt', { session: false }), deletePosition);

module.exports = router;
