const express = require('express');
const { addToCart, updateCart, removeFromCart, getCart } = require('../controllers/cartController');
const router = express.Router();

// POST /cart
router.post('/', addToCart);

// PUT /cart/:productId
router.put('/:productId', updateCart);

// DELETE /cart/:productId
router.delete('/:productId', removeFromCart);

// GET /cart
router.get('/', getCart);

module.exports = router;