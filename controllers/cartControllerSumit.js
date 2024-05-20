const cartModel = require("../models/cartModel")
function cartController() {
  return {
    async addProduct(req, res) {
      let pid = req.params.pid;
      let customerId = "6644b7f07fb5fd54bf125796";
      //  find customer ada to cart first time or not
      let user = await cartModel.findOne({ customerId: customerId })
      if (user) {
        // check this product is already added or not
        if (user.products.productId === pid) {
          
           res.send(user)
          // if (cartUpdate) {
          //   res.status(200).send("Congratulation product added");
          // } else {
          //   res.status(400).send("Error");
          // }
          // res.status(200).send("update dddresu;lt")


        } else {
          res.send(`diff pid`)


        }
      } else {
        let product = {
             pid: {
                  qty:1,
                  totalPrice:900
             }

        }
        let cartUpdate = await cartModel.create({
                customerId: customerId,
                products: product
           })
        res.status(200).send("200");
      }



    }
  }
}

module.exports = cartController