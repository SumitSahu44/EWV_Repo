const mongoose = require("mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/EWV");
const cartSchema = mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: { type: Object, required: true},
    
},{timestamps: true})

const CartModel = mongoose.model("Cart", cartSchema);
module.exports = CartModel