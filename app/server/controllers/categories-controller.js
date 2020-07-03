const cloudinary = require('cloudinary');
const fs = require('fs');
const path = require('path');
const Category = require('../models/category-model');
const Position = require('../models/position-model');
const { errorHandler } = require('../../../handlers/errorHandlers');
const { imageUrl, cloud_name, api_key, api_secret } = require('../../../config/keys');
cloudinary.config({ cloud_name, api_key, api_secret });

const ObjectId = require('mongodb').ObjectID;
let result = {};
module.exports = {
  //@route GET api/categories/register
  //@desc Create the categories route
  //@access Private
  async getAllCategories(req, res) {
    try {
      const categories = await Category.find({
        user: req.user._id,
      }).sort({ name: -1 });
      res.status(200).json(categories);
      // res.status(200).json([]);
    } catch (err) {
      errorHandler(res, err);
    }
  },
  //@route GET api/categories/category/:id
  //@desc Create the category route
  //@access Private
  async getCategory(req, res) {
    try {
      const category = await Category.findById(req.params.id);
      res.status(200).json(category);
    } catch (err) {
      errorHandler(res, err);
    }
  },
  //@route PUT api/categories/category/upload
  //@description Save category image to the data base
  //access Private
  async saveImage(req, res) {
    if (Object.keys(req.files).length === 0) {
      res.status(400).send('Файл небыл опубликован');
    }
    const uploadFile = req.files.file;
    const fileName = req.files.file.name;
    try {
      await uploadFile.mv(`${imageUrl}${fileName}`);
      result = await cloudinary.uploader.upload(`${imageUrl}${fileName}`);
      if (result.hasOwnProperty('public_id')) {
        fs.readdir(imageUrl, (err, files) => {
          if (err) throw err;
          for (const file of files) {
            fs.unlink(path.join(imageUrl, file), (err) => {
              if (err) throw err;
            });
          }
        });
      }
      res.status(201).send({ msg: 'Файл успешно сохранен!', imageId: result.public_id });
    } catch (err) {
      errorHandler(res, err);
    }
  },

  //@route POST api/categories/category/removeimage
  //@desc POST admin remove image
  //@access Private
  async removeImage(req, res) {
    const imageId = req.body.imageId;
    try {
      await cloudinary.uploader.destroy(imageId);
      res.status(200).send({ msg: 'Файл успешно удален' });
    } catch (err) {
      errorHandler(res, err);
    }
  },

  //@route POST api/categories/category
  //@desc Create the category route
  //@access Private
  async createCategory(req, res) {
    try {
      const newCategory = new Category({
        name: req.body.name,
        imageSrc: result.secure_url,
        imageId: result.public_id,
        user: req.user.id,
      });

      const savedCategory = await newCategory.save();
      res.status(201).json(savedCategory);
    } catch (err) {
      errorHandler(res, err);
    }
  },
  //@route PATCH api/categories/category/:id
  //@desc Update the category
  //@access Private
  async updateCategory(req, res) {
    const updated = {
      name: req.body.name,
      imageSrc: result.secure_url,
      imageId: result.public_id,
    };
    const _id = ObjectId(req.params.id);
    try {
      const updCategory = await Category.findByIdAndUpdate(_id, { $set: updated }, { new: true });
      const changedCategory = await updCategory.save();
      res.status(200).json(changedCategory);
    } catch (err) {
      errorHandler(res, err);
    }
  },
  //@route DELETE api/categories/category/:id
  //@desc Delete the category
  //@access Private
  async deleteCategory(req, res) {
    const imageId = req.body.imageId;
    try {
      await Category.deleteOne({ _id: req.params.id });
      await Position.deleteMany({ category: req.params.id });
      await cloudinary.uploader.destroy(imageId);
      res.status(200).json({ msg: 'Категория удалена.' });
    } catch (err) {
      errorHandler(res, err);
    }
  },
};
