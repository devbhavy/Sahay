const express = require("express");
const { authMiddleware, Phq9InputCheck} = require("../middlewares/middleware");
const { phq9 } = require("../mongoose/mongoose");
const { generateAiInsight } = require("../services/gemini.services");
const apiRouter = express.Router();


apiRouter.post("/phq9/new",authMiddleware,Phq9InputCheck,async function(req,res){
    const answers = req.answers;
    const userId = req.id;

    console.log(answers)
    
    if (answers.length !== 9) {
        return res.status(400).json({ error: "Answers must be an array of 9 numbers (0-3)" });
    }

    try{
        const score = answers.reduce((sum, val) => sum + Number(val), 0);
        const response = await phq9.create({userId,answers,score});

        console.log(response);
        let suggestion;
        if (score <= 4) suggestion = "Great! Keep self-care routines.";
        else if (score <= 9) suggestion = "Mild symptoms. Try chatbot or relaxation audios.";
        else if (score <= 14) suggestion = "Moderate symptoms. Consider talking to a counselor.";
        else if (score <= 19) suggestion = "Moderately severe. Schedule a session with a mental health professional.";
        else suggestion = "Severe. Contact a psychiatrist or helpline immediately.";
    
        return res.status(200).json({score,suggestion});
    }catch(err){
        return res.status(400).json({
            msg : "some error occurred while processing your assessment"
        })
    }



})


apiRouter.get("/phq9/history",authMiddleware,async function(req,res){
    const userId = req.id;

    try{
        const response = await phq9.find({userId});
        if(response.length==0){
            return res.status(200).json({
                msg : "no previous data found"
            })
        }else{
            return res.status(200).json({
                history : response
            })
        }
    }catch(err){
        return res.status(400).json({
            msg : "some error occurred while fetching user history"
        })
    }

})



apiRouter.get("/phq9/assesment",authMiddleware,async function(req,res){
    const userId = req.id

    try{
        const history = await phq9.find({userId});

        const response = await generateAiInsight(history);
        res.status(200).json({
            AiInsight : response
        })

    }catch(err){
        return res.status(400).json({
            msg : "some error occurred while generating your Ai insight"
        })
    }

})





module.exports = {apiRouter}