const express=require("express");
const categoryroute=express.Router();

const {Categorymodel}=require("../model/category.model");
const {authorise}=require("../middleware/authorise");
const {authentication}=require("../middleware/authentication")

categoryroute.get("/allcategory",async(req,res)=>{

    try {
        let allcategory= await Categorymodel.find();

        res.status(201).json({allcategory:allcategory,status:"success"})
    } catch (error) {
        res.status(401).json({msg:error.message,status:"failed"});
    }
});


categoryroute.post("/addcategory",authentication,authorise(["Seller","Admin"]),async(req,res)=>{
    const {title}=req.body;

    try {
        let category_available=await Categorymodel.findOne({title});
       // console.log(category_available)
        
        if(category_available){
            res.status(401).json({msg:"category is already gg available",status:"failed"});
        }else{
            let newcategory=new Categorymodel({title});
            await newcategory.save();
            res.status(201).json({msg:"category is added",status:"success"});
        }
        
    } catch (error) {
        res.status(401).json({msg:error.message,status:"failed"});
        
    }
})



module.exports={categoryroute};


