const express = require('express');
const router = express.Router();
const { createOrder, getOrders } = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// Order place karo (login zaroori hai)
router.post('/', authMiddleware, createOrder);

// Apne orders dekho (login zaroori hai)
router.get('/', authMiddleware, getOrders);

module.exports = router;