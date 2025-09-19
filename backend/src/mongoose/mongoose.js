require("dotenv").config()
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOOSE_URL);



const systemPrompt = `
      You are a supportive digital mental health assistant for students.
      Provide coping tips, relaxation guidance, encouragement, and suggest
      professional help when needed. Never diagnose or prescribe medication.
      keep your answers crisp.
`;



const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "admin","volunteer"], default: "student" },
    createdAt: { type: Date, default: Date.now }

});




const user = mongoose.model("user",UserSchema);


const partSchema = new mongoose.Schema({
    text: { type: String, required: true }
}, { _id: false });

const messageSchema = new mongoose.Schema({
    role: { type: String, enum: ["user", "model"], required: true },  
    parts: [partSchema],
    timestamp: { type: Date, default: Date.now }
    
  
});
  
const ChatSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    messages : {type : [messageSchema],default : [{role : "user",parts : [{text : systemPrompt}],timestamp : Date.now()}] }
    
  
});

const chat = mongoose.model("chat",ChatSchema);


const PHQ9Schema = new mongoose.Schema({
    userId : {type  : mongoose.Schema.Types.ObjectId , ref : "user",required : true},
    answers : {type : [Number],required :true},
    score : {type : Number,required : true},
    createdAt: { type: Date, default: Date.now }

})


const phq9 = mongoose.model("phq9",PHQ9Schema)


module.exports = {user,chat,phq9};