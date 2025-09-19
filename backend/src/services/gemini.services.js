
const {GoogleGenAI} = require("@google/genai");
const { user, phq9 } = require("../mongoose/mongoose");

const ai = new GoogleGenAI({
    apiKey : process.env.GOOGLE_API_KEY
})



async function generateResponse(input,userId){
    console.log(userId)
    const latestPHQ = await phq9.findOne({ userId : userId })
    console.log(latestPHQ)
    const score = latestPHQ ? latestPHQ.score : "unknown"; 

    const systemPrompt = `
  You are a supportive digital mental health assistant for students.
  The student has a recent PHQ-9 assessment score of ${score}.
  Based on the score, provide tailored coping tips, encouragement, and relaxation techniques.
  Suggest professional help when the score indicates moderate or severe distress.
  Never diagnose or prescribe medication.  
  Keep your answers concise and empathetic.
`;  
    
    console.log(systemPrompt);
    const temp = (input.map((data)=>{
        return {role :data.role,parts : data.parts}
    })).splice(-10);

    const contents = [{role : "user",parts : [{text : systemPrompt}]},...(temp)];
    console.log(JSON.stringify(contents))

    const response = await ai.models.generateContent({
        model : "gemini-2.5-flash",
        contents : contents

    })

    let text = response.text;
    

    console.log(text)
    return text || "";

}



async function generateAiInsight(history){
    if(history.length==0){
        return 'Take your first PHQ9 assesment to get personalised Ai insights'
    }

    const formattedHistory = history.map(entry => ({
        score: entry.score,
        date: entry.createdAt
    }));

    const prompt = `
You are an expert mental health assistant. A user has been tracking their mood using PHQ-9 assessments over time. 
Here is their assessment history in chronological order:
${formattedHistory.map(h => `- On ${h.date}, score: ${h.score}`).join('\n')}

Based on this data, generate a helpful and empathetic insight about their mood trends. Keep the tone friendly and supportive.Keep the insight limited to 100 words.
    `;

    try{
        const response = await ai.models.generateContent({
            model : "gemini-2.5-flash",
            contents : prompt
        })

        return response.text


    }catch(err){
        return "Some error occurred while generating response"
    }

}





module.exports = {generateResponse,generateAiInsight}