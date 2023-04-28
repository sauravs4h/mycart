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

    let availavle=await Wishlistmodel.findOne({productID,userID});

    if(availavle){
        res.send({msg:"product is already in wishlist",status:"error"})
    }else{
        try {

            let wish= new Wishlistmodel({
                productID:productID,
                userID:userID
            });

            await wish.save();

            await Usermodel.findByIdAndUpdate({_id:userID},{$push:{wishlist:wish}})

            res.send({msg:"wishlist added successfully",status:"success"})
            
        } catch (error) {
            res.send({msg:"wishlist not added ,somethiing went wrong",status:"error"})
        }
    }
})

wishR.get("/allwishlist",async(req,res)=>{

    let payload=req.body;
    let userID=payload.userID

    try {

        let wishlist=await Wishlistmodel.find({userID}).populate("productID");

        res.send({wishlist:wishlist,status:"success"})
        
    } catch (error) {
        res.send({mag:"something went wrong",status:"success"})
    }
})

wishR.delete("/deletewish/:id",async(req,res)=>{

    let wishid=req.params.id;
    let userID=req.body.userID;

    let available=await Wishlistmodel.findOne({_id:wishid,userID});

    if(available){

        try {

            await Wishlistmodel.findByIdAndDelete({_id:wishid});
            res.send({msg:"wish deleted successfully",status:"success"})
            
        } catch (error) {
            res.send({msg:"something went wrong",status:"error"})
        }

    }
    else{
        res.send({msg:"invalid opration",status:"error"})
    }

    
})


module.exports={wishR}