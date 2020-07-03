const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PositionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'categories',
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

module.exports = Position = mongoose.model('positions', PositionSchema);
