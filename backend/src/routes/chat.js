const express = require("express");
const { authMiddleware } = require("../middlewares/middleware");
const { chat } = require("../mongoose/mongoose");
const { generateResponse } = require("../services/gemini.services");

const chatRouter = express.Router();




chatRouter.post("/new",authMiddleware,async function(req,res){
    const query = req.body.query;
    if(query==null){
        return res.status(400).json({
            msg : "enter a valid query"
        })
    }

    const id = req.id;

    const inputMessage = {role : "user",parts : [{text : query}],timestamp : Date.now()};
    console.log(inputMessage)
    try{
        const updatedChat = await chat.findOneAndUpdate(
            { userId: id },
            { $push: { messages: inputMessage } },
            { new: true, upsert: true }
        );

        const messages = updatedChat.messages;
        console.log(id)
        const responseText = await generateResponse(messages,id);
        console.log("hi there")
        if(!responseText || typeof responseText !== "string"){
            return res.status(502).json({ msg: "model returned empty response" });
        }

        const modelMessage = responseText;
        console.log(modelMessage)
        const modelOutput = {role : "model" , parts : [{text : modelMessage}],timestamp : Date.now()};

        await chat.findOneAndUpdate(
            { userId: id },
            { $push: { messages: modelOutput } },
            { new: true, upsert: true }
        );

        res.status(200).json({
            response : modelMessage
        })

    }catch(err){
        res.status(400).json({
            msg : "some error occurred while generating response"
        })
    }

})



chatRouter.get("/",authMiddleware,async function(req,res){
    const id = req.id;

    try{
        const response = await chat.findOne({userId : id});
        if(response==null){
            return res.status(200).json({
                msg : "no chats found!!"
            })
        }else{
            const messages = response.messages;
            res.status(200).json({
                messages
            })
        }
    }catch(err){
        res.status(400).json({
            msg : "some error occurred while fetching your chats!!"
        })
    }
})


module.exports = {chatRouter}