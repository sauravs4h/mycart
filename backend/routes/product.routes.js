const express = require("express");

const {Productmodel}=require("../model/product.model")

const prodr= express.Router();


prodr.use(express.json());

//route Get all products
prodr.get("/allproduct",async(req,res)=>{
    try {
        const products= await Productmodel.find().populate("category");
        res.status(201).json({products:products,status:"success"})
        
    } catch (error) {
        res.status(500).json({msg:"went wrong",status:"failed"})
    }
})



// route products by category
prodr.get("/prodcategory/:category",async(req,res)=>{
    let category=req.params.category
    try {
        const products= await Productmodel.find().populate({path:"category",match:{title:category},select: 'title'});
        
        const filteredProducts = products.filter(product => product.category !== null);
        //.populate({path:"category",match:{title:category},select: 'title'});
        res.status(201).json({products:filteredProducts,status:"success"})
        
    } catch (error) {
        res.status(500).json({msg:"went wrong",status:"failed"})
    }
})


// route for get a specific product by id
prodr.get("/getoneproduct/:id",async(req,res)=>{
    let productid=req.params.id;
    try {
        let product=await Productmodel.find({_id:productid});
        res.status(201).json({products:product,status:"success"})
    } catch (error) {
        res.status(500).json({msg:"went wrong",status:"failed"})
    }
})


// route for get famous product based on category

prodr.get("/getfamousproduct/:category",async(req,res)=>{
    let category=req.params.category;

    try {
        let products=await Productmodel.find().populate({path:"category",match:{title:category},select: 'title'});
        const filteredProducts = products.filter(product => product.category !== null);

        filteredProducts.sort(()=>0.5-Math.random());

        let sendproducts=filteredProducts.slice(0,5);

        res.status(201).json({products:sendproducts,status:"success"});
        
    } catch (error) {
        res.status(500).json({msg:"went wrong",status:"failed"})
        
    }
})

// route for addproduct
prodr.post("/addproduct",async(req,res)=>{
    const payload=req.body;

    try {
        const product= new Productmodel(payload);
        await product.save();
        res.status(201).json({msg:"Add product successfully",status:"success"});
    } catch (error) {
        res.status(500).json({msg:"something went wrong",status:"failed"})
    }
    
})


// route for update the product
prodr.patch("/updateproduct/:id",async(req,res)=>{
    const payload=req.body;
    const product_id=req.params.id;

    const product_avalable=await Productmodel.findOne({_id:product_id})

    if(product_id){

        try {

            await Productmodel.findByIdAndUpdate({_id:product_id},payload)

            res.status(201).json({msg:"prduct is updated",status:"success"})
            
        } catch (error) {
            res.status(500).json({msg:"product not updated",status:"failed"})
        }

    }else{
        res.status(401).json({msg:"Product is not available",status:"failed"})
    }
})


// route for delete product
prodr.delete("/deleteproduct/:id",async(req,res)=>{
    const product_id=req.params.id
    const product_avalable=await Productmodel.findOne({_id:product_id});

    if(product_avalable){
        try {
             await Productmodel.findByIdAndDelete({_id:product_id});
             res.status(201).json({msg:"deleted product successfully",status:"success"})
            
        } catch (error) {
            res.status(500).json({msg:"product not deleted",status:"error"})
        }
    }else{
        res.status(401).json({msg:"product is not available",status:"error"})
    }
})

module.exports={prodr}