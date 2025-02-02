const Product = require('../models/Product');

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Create a new product
const createProduct = async (req, res) => {
    const { name, price, description,picture } = req.body;

    try {
        const newProduct = new Product({ name, price, description,picture });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};


module.exports = {
    getProducts,
    createProduct
};