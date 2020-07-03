const Order = require('../models/order-model');
const { errorHandler } = require('../../../handlers/errorHandlers');

module.exports = {
  //@route POST api/orders/order
  //@desc Create the order route
  //@access Private
  async createOrder(req, res) {
    try {
      const lastOrder = await Order.findOne({ user: req.user.id }).sort({
        createdAt: -1,
      });
      const maxOrder = lastOrder ? lastOrder.order : 0;
      const newOrder = await new Order({
        order: maxOrder + 1,
        list: req.body,
        user: req.user.id,
      });
      await newOrder.save();
      res.status(201).json({ msg: 'Заказ успешно создан' });
    } catch (err) {
      errorHandler(res, err);
    }
  },
  //@route GET api/orders/order?offset=2&limit=5
  //@desc Create the order route
  //@access Private
  async getAllOrders(req, res) {
    const query = {
      user: req.user.id,
    };

    //for paginations -> localhost:5000/api/orders/order?offset=2&limit=5
    //Date of start
    if (req.query.start) {
      query.createdAt = {
        $gte: req.query.start,
      };
    }
    //Date of end
    if (req.query.end) {
      if (!query.createdAt) {
        query.createdAt = {};
      }
      query.createdAt['$lte'] = req.query.end;
    }

    if (req.query.order) {
      query.order = Number(req.query.order);
    }

    try {
      const orders = await Order.find(query).sort({ createdAt: -1 }).skip(Number(req.query.offset)).limit(Number(req.query.limit));

      res.status(200).json(orders);
    } catch (err) {
      errorHandler(res, err);
    }
  },
};
