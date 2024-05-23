const mongoose = require('mongoose');

// Define the schema
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productImg: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    }
});

// Create the model
const Product = mongoose.model('product', productSchema);

module.exports = Product;
