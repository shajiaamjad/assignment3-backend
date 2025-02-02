const express = require('express');
const { getProducts,createProduct } = require('../controllers/productController');
const router = express.Router();

// GET /products
router.get('/getproducts', getProducts);

// POST /products
router.post('/createProduct', createProduct);

module.exports = router;