const CartModel = require('../models/cartModel')
const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken')

async function  userLoginControllers(req,res)
{
  
     const email = req.body.email;
     const password = req.body.password;
   
     try {
        // Find the user in the database
        const user = await userModel.findOne({ email: email, password: password });
        
        if (user) {
          //generate jwt token 
          const token =  jwt.sign({userId:user._id},process.env.json_secret_key,{expiresIn:'5d'})
          res.cookie('Token', token, { maxAge: 9000000, httpOnly: true });
        // res.status(400).send({"status": "success", "token": token, "_id" : user._id});
        const customerId = user._id
        let cart = await CartModel.findOne({ customerId });

        res.cookie("cartquantity",cart.products.length, { maxAge: 9000000, httpOnly: true })
                    
    
       
        res.redirect("/product")
          
          // res.send('Successfully logged in');
        } else {
          res.render('sign-up', { 
            message: 'User not found',
            });
        }
      } catch (error) {
        console.error('Error during login', error);
        res.status(500).send('Internal Server Error');
      }
     
}

module.exports = userLoginControllers;