const express=require("express");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


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


users.post("/login",async(req,res)=>{

    const payload=req.body;
    const email=payload.email;
    const password=payload.password;

    const user_available= await Usermodel.findOne({email});
    const hashpassword=user_available?.password;

    if(user_available){

        bcrypt.compare(password, hashpassword, function(err, result) {
            if(result){
                var token = jwt.sign({ foo: 'bar' }, 'hush');

                res.send({msg:"Login Successfull ", token:token,status:"success"});

            }else{
                res.send({msg:"Wrong craditionals",status:"error"})
            }
        });

    }else{
        res.send({msg:"Please Signup First",status:"error"});
    }
    
})



module.exports={users}