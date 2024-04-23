const express=require("express");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const {client}=require("../services/redis")


const {Usermodel}=require("../model/user.model");
const users=express.Router();

users.use(express.json());


// get all users
// users.get("/allusers",async(req,res)=>{

//     try {

//         let users=await Usermodel.find();
//         res.send({users:users,status:"success"})
        
//     } catch (error) {
//         res.send({msg:"not get users",status:"error"})
//     }
//     res.send({msg:"not get users",status:"error"})
// })




 // route for signup
users.post("/signup",async(req,res)=>{

    const payload=req.body;
    const email=payload.email;
    const password=payload.password

    const user_available=await Usermodel.findOne({email:email});

    if(user_available){
        res.status(401).json({msg:"User is already available",status:"error"});
    }else{

        bcrypt.hash(password, 5, async function(err, hash) {
            if(err){
                res.status(500).json({msg:"something went wrong",status:"error"});
            }else{
                payload.password=hash;
                const user= new Usermodel(payload);
                await user.save();

                res.status(201).json({msg:"signup successfull",status:"success"});
            }
        });
    }

})

//route for login

users.post("/login",async(req,res)=>{

    const payload=req.body;
    const email=payload.email;
    const password=payload.password;

    const user_available= await Usermodel.findOne({email});
    const hashpassword=user_available?.password;
    const userid=user_available?._id
    const user_role=user_available?.role
    if(user_available){

        
        bcrypt.compare(password, hashpassword, function(err, result) {
            if(err){
                res.status(500).json({msg:"something went wrong",status:"error"});

            }
            if(result){
                var token = jwt.sign({ userid: userid,role:user_role}, 'hush');

                res.status(201).json({msg:"Login Successfull ", token:token,status:"success"});

            }else{
                res.status(401).json({msg:"Wrong craditionals",status:"error"})
            }
        });
    }else{
        res.status(401).json({msg:"Please Signup First",status:"error"});
    }
    
})

//route for logout

users.get("/logout",async(req,res)=>{

    
    const token=req.headers.authorization?.split(" ")[1];

    try {

       if(token){
        //console.log(token)
        // await client.SADD("blacklisttoken",token);
        res.status(201).json({msg:"logout successsfull", status:"success"})
       }else{
        res.status(401).json({msg:"logout not successsfull", status:"error"})
       }
      
        
    } catch (error) {
        res.status(500).json({msg:"logout unsuccessfull",status:"error"});
    }

})





module.exports={users}