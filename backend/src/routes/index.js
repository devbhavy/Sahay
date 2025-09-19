const express = require("express");
const { userRouter } = require("./user");
const { chatRouter } = require("./chat");
const { apiRouter } = require("./phq9");
const rootRouter = express.Router();


rootRouter.use("/user",userRouter)

rootRouter.use("/chat",chatRouter)

rootRouter.use("/api",apiRouter)





module.exports = {rootRouter}