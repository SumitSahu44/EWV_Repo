const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/EWV");

const productSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    quantity: { type: Number, required: true, default: 1 },
});

const cartSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [productSchema],
}, { timestamps: true });

const CartModel = mongoose.model("Cart", cartSchema);
module.exports = CartModel;
