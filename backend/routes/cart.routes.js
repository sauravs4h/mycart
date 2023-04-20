const express=require("express");
const {cartModel}=require("../model/cart.model");
const {Productmodel}=require("../model/product.model")
const {Usermodel}=require("../model/user.model")

const cartr=express.Router();

cartr.use(express.json())

cartr.get("/get",(req,res)=>{
    console.log(req.body)
    res.send("hello cart")
})

cartr.post("/addtocart",async(req,res)=>{

    let payload=req.body;
    let productID=payload.productID
    let userID=payload.userID;
    let quantity=payload.quantity

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

module.exports={cartr}