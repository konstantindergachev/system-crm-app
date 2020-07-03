const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    required: true,
    trim: true,
    default:
      'https://res.cloudinary.com/dtuupbrw4/image/upload/v1571925917/sample.jpg',
  },
  imageId: {
    type: String,
    trim: true,
    default: 'liykshlziz1hucwrim3c',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Category = mongoose.model('categories', CategorySchema);
