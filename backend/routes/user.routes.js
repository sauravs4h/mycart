const express=require("express");

const users=express.Router();

users.use(express.json());

users.get("/",(req,res)=>{
    res.send({msg:"this is user route"})
})

users.post("/signup",(req,res)=>{

})



module.exports={users}