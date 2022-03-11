const express= require ("express")
const app=express()
const cors=require("cors")
const connectDB=require("./config/connectDb")
require("dotenv").config()
connectDB()
app.use (express.json())
app.use(cors())
app.use("/user",require("./routes/userRoute"))
app.use("/posts",require("./routes/postRoute"))

const port= process.env.port||4000
app.listen(port,(error)=>{ error?console.log(error):console.log(`server is runnig at ${port}`)
})