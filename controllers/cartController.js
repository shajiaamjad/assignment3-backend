const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add a product to the cart
const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }

        // Use `.equals()` for ObjectId comparison
        const productIndex = cart.products.findIndex(p => p.productId.equals(productId));
        console.log(productIndex);

        if (productIndex > -1) {
            // If the product is already in the cart, update the quantity
            cart.products[productIndex].quantity += quantity;
        } else {
            // Otherwise, add a new product to the cart
            cart.products.push({ productId, quantity });
        }

        await cart.save();
        res.json(cart);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};


const updateCart = async (req, res) => {
    const { userId, quantity } = req.body;
    const { productId } = req.params;

    console.log(productId, userId, quantity);
    try {
        const cart = await Cart.findOne({ userId });
        console.log(cart);
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        // Convert the productId from the frontend to an ObjectId
        const objectId = new mongoose.Types.ObjectId(productId); // Using `new` here
        console.log(objectId);

        const productIndex = cart.products.findIndex(p => p.productId.equals(objectId)); // Use `.equals()` for ObjectId comparison

        console.log(productIndex);
        if (productIndex > -1) {
            cart.products[productIndex].quantity = quantity;
            await cart.save();
            console.log(cart);
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

const removeFromCart = async (req, res) => {
    const { userId } = req.body;
    const { productId } = req.params;

    try {
        // Convert productId from string to ObjectId
        const productObjectId = new mongoose.Types.ObjectId(productId);

        // Find the cart for the user
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        // Filter out the product to be removed
        cart.products = cart.products.filter(p => !p.productId.equals(productObjectId));

        // Save the updated cart
        await cart.save();

        // Return the updated cart
        res.json(cart);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

// Get the user's cart
const getCart = async (req, res) => {
    const { userId } = req.query;
    try {
        // Populate 'productId' field with product details (including price)
        const cart = await Cart.findOne({ userId })
        .populate('products.productId'); 
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        let totalPrice = 0;
        cart.products.forEach(item => {
            // Access the populated product price
            totalPrice += item.productId.price * item.quantity;
        });

        res.json({ cart, totalPrice });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};



module.exports = {
    addToCart,
    updateCart,
    removeFromCart,
    getCart
};