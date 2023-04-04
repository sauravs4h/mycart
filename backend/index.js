const express=require("express");
var cors = require('cors')
const app=express();


const {connection}=require("./config/db");
const {users}=require("./routes/user.routes")


app.use(cors())
app.use(express.json());
app.use("/user",users)





app.get("/",(req,res)=>{
    res.send({msg:"base api"})
})




app.listen(8080,async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log("not connected to db")
    }
    console.log("listining at 8080");
})