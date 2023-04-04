const express=require("express")

const app=express();


app.get("/",(req,res)=>{
    res.send({msg:"base api"})
})

app.listen(8080,()=>{
    console.log("listining at 8080");
})