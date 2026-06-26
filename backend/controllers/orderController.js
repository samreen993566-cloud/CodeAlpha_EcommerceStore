const Order = require('../models/Order');

// Order place karo
exports.createOrder = async (req, res) => {
  try {
    const { items, totalPrice } = req.body;
    const order = await Order.create({
      user: req.user.userId,
      items,
      totalPrice
    });
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Apne orders dekho
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).populate('items.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};