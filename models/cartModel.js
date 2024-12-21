const mongoose = require("mongoose");

// mongodb connectivit 
mongoose.connect("mongodb+srv://EWV:ewvtestmongodb@cluster0.rtzboh6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});



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
