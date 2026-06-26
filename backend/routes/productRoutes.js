const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct
} = require('../controllers/productController');

// Sab products
router.get('/', getProducts);

// Ek product
router.get('/:id', getProductById);

// Naya product add karo
router.post('/', createProduct);

module.exports = router;