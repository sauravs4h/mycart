const express=require("express");

const {Wishlistmodel}=require("../model/wishlist.model")
const {Usermodel}=require("../model/user.model")

const wishR=express.Router();

wishR.get("/get",(req,res)=>{
    res.send("wishlist")
})

wishR.post("/addtowish",async(req,res)=>{

    const payload=req.body
    let productID=payload.productID
    let userID=payload.userID

    let availavle=await Wishlistmodel.findone({productID,userID});

    if(availavle){
        res.send({msg:"product is already in wishlist",status:"error"})
    }else{
        try {
            
        } catch (error) {
            
        }
    }
})


module.exports={wishR}