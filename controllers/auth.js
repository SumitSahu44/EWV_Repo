const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken')

async function auth(req,res,next)
{
    
    if(req.cookies.Token){
        try {
            let token = req.cookies.Token;
            const userId = jwt.verify(token, process.env.json_secret_key).userId
          
            let user = await userModel.findById(userId).select("-password");
            // res.json(user)
            req.user =  user
            // res.cookie("cartquantity",user.products.length, { maxAge: 9000000, httpOnly: true })
                    
            next()
       
        } catch (error) {
            res.redirect('../sssign-up')
        }

    }else{
       res.redirect('../sign-up')
    }
}

module.exports = auth;