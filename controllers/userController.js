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
            res.render("product")
        },
        cart(req,res)
        {
            res.render("cart");
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