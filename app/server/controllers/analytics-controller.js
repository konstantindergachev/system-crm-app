const Order = require('../models/order-model');
const { errorHandler } = require('../../../handlers/errorHandlers');
const { getOrdersMap } = require('../helpers/getOrdersMap');
const { calculatePrice } = require('../helpers/calculatePrice');
const { dateFormat } = require('../helpers/dateFormat');

module.exports = {
  //@route GET api/analytics/overview
  //@desc Get the overview
  //@access Private
  async getOverview(req, res) {
    try {
      const allOrders = await Order.find({
        user: req.user._id,
      }).sort({ createdAt: 1 });

      //calculate days; analytics does not include the current day
      const ordersMap = getOrdersMap(allOrders);
      const timeOfYesterday = new Date().getTime() - 1000 * 3600 * 24 * 1 + 1000;
      const yesterday = dateFormat(timeOfYesterday);
      const yesterdayOrders = ordersMap[yesterday] || [];

      //order numbers of yesterday
      const yesterdayOrdersNumber = yesterdayOrders.length;
      //order numbers
      const totalOrdersNumber = allOrders.length;
      //total days number
      const daysNumber = Object.keys(ordersMap).length;
      //orders per day
      const ordersPerDay = totalOrdersNumber / daysNumber.toFixed(0);
      //((number of orders yesterday / orders per day) - 1) * 100
      //the percentage for the number of orders
      const ordersPercent = ((yesterdayOrdersNumber / ordersPerDay - 1) * 100).toFixed(2);

      //total profit
      const totalGain = calculatePrice(allOrders);
      //profit per day
      const gainPerDay = totalGain / daysNumber;
      //profit for yesterday
      const yesterdayGain = calculatePrice(yesterdayOrders);
      //profit percentage
      const gainPercent = ((yesterdayGain / gainPerDay - 1) * 100).toFixed(2);
      //profit comparison
      const compareGain = (yesterdayGain - gainPerDay).toFixed(2);
      //comparison of orders number
      const compareNumber = (yesterdayOrdersNumber - ordersPerDay).toFixed(2);

      res.status(200).json({
        yesterday,
        gain: {
          percent: Math.abs(Number(gainPercent)),
          compare: Math.abs(Number(compareGain)),
          yesterday: Number(yesterdayGain),
          isHigher: Number(gainPercent) > 0,
        },
        orders: {
          percent: Math.abs(Number(ordersPercent)),
          compare: Math.abs(Number(compareNumber)),
          yesterday: Number(yesterdayOrdersNumber),
          isHigher: Number(ordersPercent) > 0,
        },
      });
    } catch (err) {
      errorHandler(res, err);
    }
  },
  //@route GET api/analytics/analytics
  //@desc get the analytics
  //@access Private
  async getAnalytics(req, res) {
    try {
      const allOrders = await Order.find({
        user: req.user._id,
      }).sort({ createdAt: 1 });
      const ordersMap = getOrdersMap(allOrders);

      //calc average check
      const average = Number((calculatePrice(allOrders) / Object.keys(ordersMap).length).toFixed(2));
      //chart data
      const chart = Object.keys(ordersMap).map((label) => {
        //label === 15.11.2019
        //profit for a specific day
        const gain = calculatePrice(ordersMap[label]);
        //order numbers per day
        const order = ordersMap[label].length;
        return { label, order, gain };
      });

      res.status(200).json({ average, chart });
    } catch (err) {
      errorHandler(res, err);
    }
  },
};
