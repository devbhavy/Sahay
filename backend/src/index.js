require("dotenv").config();
const express = require("express");
const { rootRouter } = require("./routes");
const cors = require("cors");
const app = express();


app.use(express.json())
app.use(cors());



app.use("/app",rootRouter)




app.use("/",function(err,req,res,next){
    if(err){
        return res.status(400).json({
            msg : "Global catch triggerred!!"
        })
    }

    
})

app.listen(process.env.PORT,()=>{
    console.log(`server started on port ${process.env.PORT}`)
})