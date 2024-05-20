const CartModel = require('../models/cartModel');
function cartController() {
    return {
        async addProduct(req, res) {
          let productId = req.params.pid;
          let customerId = "6644b7f07fb5fd54bf125796";
          //  find customer ada to cart first time or not
          try {
            // Find the cart for the customer
            let cart = await CartModel.findOne({ customerId });
                
            if (!cart) {
                // If no cart exists, create a new one
                cart = new CartModel({ customerId, products: [{ productId, quantity: 1 }] });
                res.send("first time cart added by a usr")
            } else {
                // Check if the product already exists in the cart
                const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
    
                if (productIndex > -1) {
                    // If the product exists, increment the quantity
                    cart.products[productIndex].quantity += 1;
                    res.send("product is already update qty by 1")
                } else {
                    // If the product does not exist, add it with quantity 1
                    cart.products.push({ productId, quantity: 1 });
                    res.send("Product added with a user")
                }
            }
    
            // Save the cart
            await cart.save();
    
            return cart;
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    
    
        }
      }

}


module.exports = cartController