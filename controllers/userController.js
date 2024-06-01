function userControllers()
{
   return {
       
        index(req,res)
        {
            res.render("index");
        },
        about(req,res)
        {
            res.render("about");
        },
        contact(req,res)
        {
            res.render("contact")
        },
        product(req,res)
        {
            res.render("product",{
                alertMsg : null
            })
        },
        orderForm(req,res)
        {
            let productQuantity = req.body.productQuantity;
            let productPrice = req.body.productPrice;
            const completeCart = JSON.parse(req.body.completeCart);
            //  res.send(completeCart[0])
            res.render("order-form",{
                productQuantity,
                productPrice,
                completeCart
            });
        },
        registerLogin(req,res)
        {
            res.render("sign-up",{
                message : null
            })
        }
    
   }




}

module.exports = userControllers;