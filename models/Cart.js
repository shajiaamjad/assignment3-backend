const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Change to ObjectId reference
        quantity: { type: Number, required: true }
    }]
});

module.exports = mongoose.model('Cart', cartSchema);
