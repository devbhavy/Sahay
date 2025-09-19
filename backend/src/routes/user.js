const express = require("express");
const { signUpInputCheck, signInInputCheck } = require("../middlewares/middleware");
const { user} = require("../mongoose/mongoose");
const userRouter = express.Router();
const jwt = require("jsonwebtoken")


userRouter.post("/signup",signUpInputCheck,async function(req,res){
    const input = req.body;
    
    try{
        const response = await user.create(input);
        const token = jwt.sign({_id : response._id},process.env.JWT_SECRET);
        console.log(response)
        return res.status(200).json({
            token
        })
    }catch(err){
        return res.status(300).json({
            msg : "an error occurred while creating the account!!"
        })
    }

})

userRouter.post("/signin",signInInputCheck,async function(req,res){
    const input = req.body;
    
    try{
        const response = await user.findOne(input);
        
        if(response == null){
            return res.status(400).json({
                msg : "invalid email or password"
            })
        }else{
            const token = jwt.sign({_id : response._id},process.env.JWT_SECRET);
            res.status(200).json({
                token
            })

        }
    }catch(err){
        return res.status(400).json({
            msg : "some error occurred while signing you in"
        })
    }
})




module.exports  = {userRouter}