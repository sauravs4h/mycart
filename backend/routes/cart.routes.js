const express=require("express");
const {cartModel}=require("../model/cart.model");
const {Productmodel}=require("../model/product.model")
const {Usermodel}=require("../model/user.model")

const cartr=express.Router();

cartr.use(express.json())

// route for total price
cartr.get("/totalprice",async(req,res)=>{
    
    const userID=req.body.userID;

    try {
        const products= await cartModel.find({userID});
        let tl=0

        products.forEach((el)=>{
            tl+=el.total_price
        })


        res.status(201).json({total_price:tl,status:"success"})
        
    } catch (error) {
        res.status(500).json({msg:"something is wrong",status:"error"})
    }
})


//route for add product to the cart
cartr.post("/addtocart",async(req,res)=>{

    let payload=req.body;
    let productID=payload.productID
    let userID=payload.userID;
    let quantity=payload.quantity

    let cart_available=await cartModel.findOne({productID,userID});

    if(cart_available){
        res.status(401).json({msg:"allready in the cart",status:"error"})
    }else{

        let product=await Productmodel.findOne({_id:productID});
        let price=product?.price

        try {

            if(product){

                let total_price=quantity*price;

                let newcart= new cartModel({
                    quantity:quantity,
                    total_price:total_price,
                    productID:productID,
                    userID:userID
                })

                await newcart.save();

                await Usermodel.findByIdAndUpdate({_id:userID},{$push:{cart:newcart}})

                res.status(201).json({msg:"add to cart successfull",status:"success"})
                


            }else{
                res.status(401).json({msg:"product is not available",status:"error"})
            }
            
        } catch (error) {

            res.status(500).json({msg:error,status:"error"})
            
        }


    }

})

// route for Get all cart

cartr.get("/allcart",async(req,res)=>{

    const payload=req.body;
    const userID=payload.userID;

    try {
       let cart=await cartModel.find({userID}).populate("productID");

       res.status(201).json({data:cart,status:"success"})

    } catch (error) {
        res.status(500).json({msg:"error while fetching data",status:"error"})
    }

})


//route for total items

cartr.get("/totalitems",async(req,res)=>{

    const payload=req.body;
    const userID=payload.userID;

    try {
       let count=await cartModel.find({userID}).count();

       res.status(201).json({count:count,status:"success"})

    } catch (error) {
        res.status(500).json({msg:"error while fetching data",status:"error"})
    }

})


// route for update the quantity 

cartr.patch("/update/:id",async(req,res)=>{

    let cartID=req.params.id
    let payload=req.body;
    let quantity=payload.quantity;
    let userID=payload.userID;

    try {

        let itam=await cartModel.findOne({_id:cartID,userID});

        if(itam){

            let total_price= (itam.total_price/itam.quantity)*quantity;

            await cartModel.findByIdAndUpdate({_id:cartID},{total_price,quantity});

            res.status(201).json({msg:"update sucessfull",status:"sucess"})

        }else{
            res.status(401).json({msg:"invalid operation",status:"error"})
        }
        
    } catch (error) {
        res.status(500).json({msg:"something went wrong",status:"error"})
    }

    
})

// delete the cart

cartr.delete("/deletecart/:id",async(req,res)=>{

    let cartID=req.params.id
    let userID=req.body.userID

    let itam= await cartModel.findOne({_id:cartID,userID});

    try {
        if(itam){

            await cartModel.findByIdAndDelete({_id:cartID});

            res.status(201).json({msg:"delete successfull",status:"success"})

        }else{
            res.status(401).json({msg:"invalid opration",status:"error"})
        }
        
    } catch (error) {
        res.status(500).json({msg:"somehing went wrong",status:"error"})
    }

})

module.exports={cartr}