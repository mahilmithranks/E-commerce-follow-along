const express= require("express")
const cors =require('cors')
const app=express()
app.use(express.json())

app.use(cors({
    origin:"*",
    credentials:true,
    allowedHeaders:["Content-Type","Authorization"]
}))


const{catchAsyncError} =require("./middleware/catchAsyncError")
const {ErrorHandler} =require("./utils/errorHandler")
const errMiddleware =require("./middleware/error")
const userRoute = require("./controllers/userRoute"); 



app.use("/user",userRoute)






app.use(errMiddleware)

module.exports={app}