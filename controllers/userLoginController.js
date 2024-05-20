const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken')
const secretKey = "4545s";
async function  userLoginControllers(req,res)
{
  
     const email = req.body.email;
     const password = req.body.password;
   
     try {
        // Find the user in the database
        const user = await userModel.findOne({ email: email, password: password });
        
        if (user) {
          //generate jwt token 
          const token =  jwt.sign({userId:user._id},secretKey,{expiresIn:'1min'})
         res.cookie("uid", token)
          // res.status(400).send({"status": "success", "token": token, "_id" : user._id});
          res.redirect("/product")
          
          // res.send('Successfully logged in');
        } else {
          res.render('sign-up', { message: 'User not found' });
        }
      } catch (error) {
        console.error('Error during login', error);
        res.status(500).send('Internal Server Error');
      }
     
}

module.exports = userLoginControllers;