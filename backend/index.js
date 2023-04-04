const express=require("express")
const app=express();


const {connection}=require("./config/db")

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