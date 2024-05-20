const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken");
const secretKey = "4545s";
async function  userRegisterControllers(req,res)
{
     const name = req.body.name;

     const email = req.body.email;
     const password = req.body.password;
   
    
    try {
       console.log(req)
        const registered = await userModel.create({
            name:name,
            email:email,
            password:password
        })

        const saved_user = await userModel.findOne({email:email})
        const token =  jwt.sign({userId:saved_user._id},secretKey,{expiresIn:'1min'})
        res.cookie("uid", token)
        // res.status(400).send({"status": "success", "token": token});
        res.redirect("/product")
          
    } catch (error) {
        res.send("id more than 1 time->")
        
    }
  
   // generate JWT Token
  
}

module.exports = userRegisterControllers;