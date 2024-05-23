const ProductModel = require('../models/productModel');

function productController()
{
    return {
       async getAllProducts(req,res)
        {
            allProducts = await ProductModel.find({})
            res.render('product', {
                allProducts:allProducts
            })
        }
    }
}

module.exports = productController