const express = require('express');
const passport = require('passport');
const router = express.Router();
const fileUpload = require('express-fileupload');

const {
  getAllCategories,
  getCategory,
  saveImage,
  removeImage,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../../controllers/categories-controller');

router.get('/', passport.authenticate('jwt', { session: false }), getAllCategories);
router.get('/category/:id', passport.authenticate('jwt', { session: false }), getCategory);
router.use(fileUpload());
router.post('/category/upload', passport.authenticate('jwt', { session: false }), saveImage);
router.post('/category/removeimage', passport.authenticate('jwt', { session: false }), removeImage);
router.post('/category/', passport.authenticate('jwt', { session: false }), createCategory);
router.patch('/category/:id', passport.authenticate('jwt', { session: false }), updateCategory);
router.delete('/category/:id', passport.authenticate('jwt', { session: false }), deleteCategory);

module.exports = router;
