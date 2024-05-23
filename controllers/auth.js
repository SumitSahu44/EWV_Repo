const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken')

async function auth(req,res,next)
{
    
    if(req.cookies.Token){
        try {
            let token = req.cookies.Token;
            const userId = jwt.verify(token, process.env.json_secret_key).userId
        
            let user = await userModel.findById(userId).select("-password");
            req.user =  user
        
            next()
       
        } catch (error) {
            res.redirect('../sign-up')
        }

    }else{
       res.redirect('../sign-up')
    }
}

module.exports = auth;