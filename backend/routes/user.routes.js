const express=require("express");
const bcrypt = require('bcrypt');
const {Usermodel}=require("../model/user.model");
const users=express.Router();

users.use(express.json());

users.get("/",(req,res)=>{
    res.send({msg:"this is user route"})
})

users.post("/signup",async(req,res)=>{

    const payload=req.body;
    const email=payload.email;
    const password=payload.password

    const user_available=await Usermodel.findOne({email:email});

    if(user_available){
        res.send({msg:"User is already available",status:"error"});
    }else{

        bcrypt.hash(password, 5, async function(err, hash) {
            if(err){
                res.send({msg:"something went wrong",status:"error"});
            }else{
                payload.password=hash;
                const user= new Usermodel(payload);
                await user.save();

                res.send({msg:"signup successfull",status:"success"});
            }
        });
    }

})


users.post("/login",(req,res)=>{

    const payload=req.body;
    
})



module.exports={users}