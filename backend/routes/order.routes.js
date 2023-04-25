const express=require("express");

const {cartModel}=require("../model/cart.model");
const {Productmodel}=require("../model/product.model")
const {Usermodel}=require("../model/user.model");

const {Ordermodel}=require("../model/order.model")

const orderR=express.Router();



orderR.get("/order",(req,res)=>{
    res.send("kkk")
})

orderR.post("/placeorder",async(req,res)=>{

    const payload=req.body;
    const userID=payload.userID;
    const address=payload.address;
    const mobile_no=payload.mobile_no;

    try {

        let products=await cartModel.find({userID})

        products.forEach(async(el)=>{

            let {quantity,total_price,productID,userID}=el;

            let orderitam= new Ordermodel({
                quantity,
                total_price,
                productID,
                userID,
                orderstatus:true
            })

            await orderitam.save();


            //await Usermodel.findByIdAndUpdate({_id:userID},{$push:{cart:newcart}})
            await Usermodel.findByIdAndUpdate({_id:userID},{$push: {orders: orderitam}})
        })

        await cartModel.deleteMany({userID});


       

        console.log(products)

        res.send("okk")
        
    } catch (error) {
        console.log(error)
        res.send("not okk")
    }



})





module.exports={orderR}