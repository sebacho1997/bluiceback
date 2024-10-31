// controllers/orderController.js
const Order = require('../models/Order');

const orderController = {
  async createOrder(req, res) {
    const orderData = req.body;
    const order = await Order.create(orderData);
    res.status(201).json(order);
  },
  // Agrega más métodos según lo necesites
};

module.exports = orderController;
