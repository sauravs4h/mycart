const express=require("express");
const {cartModel}=require("../model/cart.model");
const {Productmodel}=require("../model/product.model")
const {Usermodel}=require("../model/user.model")

const cartr=express.Router();

cartr.use(express.json())

cartr.get("/totalprice",async(req,res)=>{
    
    const userID=req.body.userID;

    try {
        const products= await cartModel.find({userID});

        //console.log(products);
        let tl=0

        products.map((el)=>{
            tl+=tl+el.total_price
        })

        //console.log(tl)

        res.send({total_price:tl,status:"success"})
        
    } catch (error) {
        res.send({msg:"something is wrong",status:"error"})
    }
})

cartr.post("/addtocart",async(req,res)=>{

    let payload=req.body;
    let productID=payload.productID
    let userID=payload.userID;
    let quantity=payload.quantity

    let cart_available=await cartModel.findOne({productID,userID});

    if(cart_available){
        res.send({msg:"allready in the cart",status:"error"})
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

                res.send({msg:"add to cart successfull",status:"success"})
                


            }else{
                res.send({msg:"product is not available",status:"error"})
            }
            
        } catch (error) {

            res.send({msg:error,status:"error"})
            
        }


    }

    
    // console.log(product)
    // res.send("prodict");



})

cartr.get("/allcart",async(req,res)=>{

    const payload=req.body;
    const userID=payload.userID;

    try {
       let cart=await cartModel.find({userID}).populate("productID");

       res.send({data:cart,status:"success"})

    } catch (error) {
        res.send({msg:"error while fetching data",status:"error"})
    }

})


// update the quantity 

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

            res.send({msg:"update sucessfull",status:"sucess"})

        }else{
            res.send({msg:"invalid operation",status:"error"})
        }
        
    } catch (error) {
        res.send({msg:"something went wrong",status:"error"})
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

            res.send({msg:"delete successfull",status:"success"})

        }else{
            res.send({msg:"invalid opration",status:"error"})
        }
        
    } catch (error) {
        res.send({msg:"somehing went wrong",status:"error"})
    }

})

module.exports={cartr}