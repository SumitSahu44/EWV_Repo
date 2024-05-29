const ProductModel = require('../models/productModel');
const CartModel = require('../models/cartModel')
function productController()
{
    return {
       async getAllProducts(req,res)
        {
           
            allProducts = await ProductModel.find({})
            if(req.cookies.cartquantity == 0)
                {
                       cartquantity = ''
                }else{
                    cartquantity = req.cookies.cartquantity
                }
            res.render('product', {
                allProducts:allProducts,
                cartquantity: cartquantity
            })
        }
    }
}

module.exports = productController