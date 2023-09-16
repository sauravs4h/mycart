const express = require("express");

const {Productmodel}=require("../model/product.model")

const prodr= express.Router();


prodr.use(express.json());

prodr.get("/allproduct",async(req,res)=>{
    try {
        const products= await Productmodel.find().populate("category");
        res.send({products:products,status:"success"})
        
    } catch (error) {
        res.send({msg:"went wrong"})
        console.log(error)
    }
})

// products by category

prodr.get("/prodcategory/:category",async(req,res)=>{
    let category=req.params.category
    try {
        const products= await Productmodel.find().populate({path:"category",match:{title:category},select: 'title'});
        
        const filteredProducts = products.filter(product => product.category !== null);
        //.populate({path:"category",match:{title:category},select: 'title'});
        res.send({products:filteredProducts,status:"success"})
        
    } catch (error) {
        res.send({msg:"went wrong"})
        console.log(error)
    }
})

// get product by id (add this route also);

prodr.post("/addproduct",async(req,res)=>{
    const payload=req.body;

    try {
        const product= new Productmodel(payload);
        await product.save();
        res.send({msg:"Add product successfully",status:"success"});
    } catch (error) {
        console.log(error)
        res.send({msg:"something went wrong",status:"error"})
    }
    
})

prodr.patch("/updateproduct/:id",async(req,res)=>{
    const payload=req.body;
    const product_id=req.params.id;

    const product_avalable=await Productmodel.findOne({_id:product_id})

    if(product_id){

        try {

            await Productmodel.findByIdAndUpdate({_id:product_id},payload)

            res.send({msg:"prduct is updated",status:"success"})
            
        } catch (error) {
            res.send({msg:"product not updated",status:"error"})
        }

    }else{
        res.send({msg:"Product is not available",status:"error"})
    }
})

prodr.delete("/deleteproduct/:id",async(req,res)=>{
    const product_id=req.params.id
    const product_avalable=await Productmodel.findOne({_id:product_id})
    console.log("hello")

    if(product_avalable){
        try {
             await Productmodel.findByIdAndDelete({_id:product_id});
             res.send({msg:"deleted product successfully",status:"success"})
            
        } catch (error) {
            res.send({msg:"product not deleted",status:"error"})
        }
    }else{
        res.send({msg:"product is not available",status:"error"})
    }
})

module.exports={prodr}