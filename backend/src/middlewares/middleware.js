const zod = require("zod");
const jwt = require("jsonwebtoken")


const signUpInputSchema = zod.object({ 
    name : zod.string(),
    email : zod.string().email(),
    password : zod.string(),
    role : zod.string().optional(),
    date : zod.string().optional(),
}).strict();

const signInInputSchema = zod.object({
    email : zod.string().email(),
    password : zod.string()
})

const phq9InputSchema = zod.object({
    answers : zod.array(zod.number().min(0).max(3)).length(9)

})


function signUpInputCheck(req,res,next){
    const input = req.body;
    const check = signUpInputSchema.safeParse(input);

    if(input==null||!check.success){
        return res.status(400).json({
            msg : "invalid inputs !!"
        })
    }else{
        return next()
    }
}

function signInInputCheck(req,res,next){
    const input = req.body;
    const check = signInInputSchema.safeParse(input);

    if(input==null||!check.success){
        return res.status(400).json({
            msg : "invalid inputs !!"
        })
    }else{
        return next()
    }
}

function Phq9InputCheck(req,res,next){
    const input = req.body;
    const check = phq9InputSchema.safeParse(input);
    console.log("hi there")
    if(!check.success||input==null){
        return res.status(400).json({
            msg : "invalid input"
        })
    }else{
        req.answers = input.answers;
        next();
    }

}


function authMiddleware(req,res,next){
    const auth = req.headers.authorization;
    
    if(auth==null||!auth.startsWith("Bearer ")){
        return res.status(400).json({
            msg : "Invalid token"
        })
    }

    const token = auth.split(" ")[1];
    
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);


        req.id = decoded._id;

        next();
    }catch(err){
        res.status(400).json({
            msg : "an error occurred while validating token!"
        })
    }

    
}



module.exports = {signUpInputCheck,signInInputCheck,authMiddleware,Phq9InputCheck}
