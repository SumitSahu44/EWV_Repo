const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken");

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
        const token =  jwt.sign({userId:saved_user._id},process.env.json_secret_key,{expiresIn:'5d'})
        res.cookie('Token', token, { maxAge: 9000000, httpOnly: true });
        // res.status(400).send({"status": "success", "token": token});
        res.redirect("/product")
          
    } catch (error) {
        res.send("Email Id is already Register")
        
    }
  
   // generate JWT Token
  
}

module.exports = userRegisterControllers;