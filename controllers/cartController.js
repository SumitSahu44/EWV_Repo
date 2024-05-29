const CartModel = require('../models/cartModel');
const ProductModel = require('../models/productModel');

function cartController() {
    return {
        
        async addProduct(req, res) {
          let productId = req.params.pid;
          let customerId = req.user._id;
          
          //  find customer ada to cart first time or not
          try {
            // Find the cart for the customer
            let cart = await CartModel.findOne({ customerId });
                
            if (!cart) {
                // If no cart exists, create a new one
                cart = new CartModel({ customerId, products: [{ productId, quantity: 1 }] });
                req.flash('alertMsg', 'Prouct added')
                res.cookie("cartquantity",cart.products.length, { maxAge: 9000000, httpOnly: true })
                res.redirect('../product')
            } else {
               
                // Check if the product already exists in the cart
                const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
             
                if (productIndex > -1) {
                    // If the product exists, increment the quantity
                    cart.products[productIndex].quantity += 1;
                    req.flash('alertMsg', 'Prouct added');
                    res.cookie("cartquantity",cart.products.length, { maxAge: 9000000, httpOnly: true })
                    res.redirect('../product')
                } else {
                    // If the product does not exist, add it with quantity 1
                    cart.products.push({ productId, quantity: 1 });
                    req.flash('alertMsg', 'Prouct added');
                    res.cookie("cartquantity",cart.products.length, { maxAge: 9000000, httpOnly: true })
                    res.redirect('../product')
                }
            }
    
            // Save the cart
            await cart.save();
    
            return cart;
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    
    
        },
        async getAllProducts(req,res)
        {
            try {
                let customerId = req.user._id;
                carts = await CartModel.find({customerId}).select("-password")
              
               let productsId = []
               let productsQty = []
            //  res.send(carts[0].products) 
                carts[0].products.forEach(product => {
                        productsId.push(product.productId)
                        productsQty.push(product.quantity)
              });
    
        //    res.cookie("cartProducts",carts[0].products, { maxAge: 9000000, httpOnly: true })
               res.cookie("cartquantity",carts[0].products.length, { maxAge: 9000000, httpOnly: true })
    
             ProductModel.find({ _id : { $in: productsId } })
              .then(products => res.render('cart',{
                productDetails : products,
                CartProducts:  carts[0].products,
                cartquantity: req.cookies.cartquantity
             }))
              .catch(err => res.status(500).json({ error: err.message }));
         
    
            } catch (error) {
                req.flash('cartMessage', 'No any Items');
                 res.render('./cart')
            }
      
        },
        async deleteProductFromCart(req,res)
        {
            const customerId = req.user._id
            const productId = req.params.cpid
          
            const result = await CartModel.updateOne(
                { customerId: customerId },
                { $pull: { products: { _id: productId } } }
            );
            carts = await CartModel.find({customerId}).select("-password") 
           if(carts[0].products.length == 0){
               cartquantity = ''
           }else{
              cartquantity = carts[0].products.length
           }
            res.cookie("cartquantity",cartquantity, { maxAge: 9000000, httpOnly: true })
    
           res.redirect('../../cart')

        }

      }
 
}


module.exports = cartController