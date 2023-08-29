const validatorPositionInput = require('../validation/position');
const Position = require('../models/position-model');
const { errorHandler } = require('../../../handlers/errorHandlers');
const { POSITION_DELETE_SUCCESSFUL } = require('../validation/constants');

module.exports = {
  //@route GET api/positions/position/:categoryId
  //@desc Get the position
  //@access Private
  async getPositionOfCategory(req, res) {
    try {
      const positions = await Position.find({
        category: req.params.categoryId,
        user: req.user._id,
      });
      return await res.status(200).json(positions);
    } catch (err) {
      errorHandler(res, err);
    }
  },
  //@route POST api/positions/position
  //@desc Create the position
  //@access Public
  async createPosition(req, res) {
    const { errors, isValid } = validatorPositionInput(req.body);
    if (!isValid) return res.status(400).json(errors);
    try {
      const positions = await Position.find();
      const position = await new Position({
        name: req.body.name,
        cost: Number(req.body.cost),
        category: req.body.category,
        user: req.user._id,
      }).save();
      const [positionsForClient, positionForClient] = await Promise.all([positions, position]);
      res.status(201).json({
        positions: [positionForClient, ...positionsForClient],
      });
    } catch (err) {
      errorHandler(res, err);
    }
  },

  //@route PATCH api/positions/position/:id
  //@desc Update the position
  //@access Public
  async updatePosition(req, res) {
    const { errors, isValid } = validatorPositionInput(req.body);
    if (!isValid) return res.status(400).json(errors);
    try {
      const updPosition = await Position.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updPosition);
    } catch (err) {
      errorHandler(res, err);
    }
  },
  //@route DELETE api/positions/position/:id
  //@desc DELETE the position
  //@access Public
  async deletePosition(req, res) {
    try {
      await Position.deleteOne({ _id: req.params.id });
      const deletedPositionId = req.params.id;
      res.status(200).json({
        msg: POSITION_DELETE_SUCCESSFUL,
        deletedPositionId: deletedPositionId,
      });
    } catch (err) {
      errorHandler(res, err);
    }
  },
};
