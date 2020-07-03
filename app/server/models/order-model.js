const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  order: {
    type: Number,
    required: true,
  },
  list: [
    {
      name: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      cost: {
        type: Number,
      },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Order = mongoose.model('orders', OrderSchema);
