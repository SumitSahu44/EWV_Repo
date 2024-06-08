const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken");
const CartModel = require('../models/cartModel')
async function  userRegisterControllers(req,res)
{
     const name = req.body.name;

     const email = req.body.email;
     const password = req.body.password;
   
    
    try {
       
        const registered = await userModel.create({
            name:name,
            email:email,
            password:password
        })
      
     if(registered){
      
        const saved_user = await userModel.findOne({email:email})
        const token =  jwt.sign({userId:saved_user._id},process.env.json_secret_key,{expiresIn:'5d'})
        res.cookie('Token', token, { maxAge: 9000000, httpOnly: true });
        // res.status(400).send({"status": "success", "token": token});
        const customerId = saved_user._id
        let cart = await CartModel.findOne({ customerId });

        res.cookie("cartquantity",0, { maxAge: 9000000, httpOnly: true })
          res.redirect("/product")
     }else{
      res.render('sign-up', { 
         message: 'Email id is already exists, Login HERE!',
         });
     }
        
          
    } catch (error) {
      res.send(error.message)
      res.render('sign-up', { 
         message: 'Email id is already exists,nnb Login HERE!',
         });
    }
  
   // generate JWT Token
  
}

module.exports = userRegisterControllers;