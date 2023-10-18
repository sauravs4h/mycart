const express=require("express");

const {Wishlistmodel}=require("../model/wishlist.model")
const {Usermodel}=require("../model/user.model")

const wishR=express.Router();


// route for addwishlist

wishR.post("/addtowish",async(req,res)=>{

    const payload=req.body
    let productID=payload.productID
    let userID=payload.userID

    let availavle=await Wishlistmodel.findOne({productID,userID});

    if(availavle){
        res.status(401).json({msg:"product is already in wishlist",status:"error"})
    }else{
        try {

            let wish= new Wishlistmodel({
                productID:productID,
                userID:userID
            });

            await wish.save();

            await Usermodel.findByIdAndUpdate({_id:userID},{$push:{wishlist:wish}})

            res.status(201).json({msg:"wishlist added successfully",status:"success"})
            
        } catch (error) {
            res.status(500).json({msg:"wishlist not added ,somethiing went wrong",status:"error"})
        }
    }
})

//route for get all the wishlist

wishR.get("/allwishlist",async(req,res)=>{

    let payload=req.body;
    let userID=payload.userID

    try {

        let wishlist=await Wishlistmodel.find({userID}).populate("productID");

        res.status(201).json({wishlist:wishlist,status:"success"})
        
    } catch (error) {
        res.status(500).json({mag:"something went wrong",status:"success"})
    }
})

wishR.delete("/deletewish/:id",async(req,res)=>{

    let wishid=req.params.id;
    let userID=req.body.userID;

    let available=await Wishlistmodel.findOne({_id:wishid,userID});

    if(available){

        try {

            await Wishlistmodel.findByIdAndDelete({_id:wishid});
            res.status(201).json({msg:"wish deleted successfully",status:"success"})
            
        } catch (error) {
            res.status(500).json({msg:"something went wrong",status:"error"})
        }

    }
    else{
        res.status(401).json({msg:"invalid opration",status:"error"})
    }

    
})


module.exports={wishR}