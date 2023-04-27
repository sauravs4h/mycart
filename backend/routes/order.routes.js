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
                orderstatus:"Placed"
            })

            await orderitam.save();


            
            await Usermodel.findByIdAndUpdate({_id:userID},{$push: {orders: orderitam},$set:{address:address,mobile_no:mobile_no}})
        })

        await cartModel.deleteMany({userID});


       

       

        res.send({msg:"order successfull ",status:"success"})
        
    } catch (error) {
        console.log(error)
        res.send({msg:"order unsuccessfull ",status:"error"})
    }



})


orderR.get("/allorders",async(req,res)=>{

    let userID=req.body.userID

    try {

        let products=await Ordermodel.find({userID}).populate("productID")

        res.send({data:products,status:"success"})
        
    } catch (error) {
        res.send({msg:"something went wrong",status:"error"})
    }
})


orderR.patch("/updatestatus/:id",async(req,res)=>{

    let orderid=req.params.id

    let order=await Ordermodel.findOne({_id:orderid});

    if(order){

        try {
            await Ordermodel.findByIdAndUpdate({_id:orderid},{orderstatus:"Return"})
            res.send({"msg":"return success",status:"success"})
        } catch (error) {
            res.send({"msg":"something went wrong",status:"error"})
        }

    }else{
        res.send({"msg":"invalid request",status:"error"})
    }

})


orderR.delete("/deleteorder/:id",async(req,res)=>{

    let orderid=req.params.id

    let order=await Ordermodel.findOne({_id:orderid});

    if(order){

        try {
            await Ordermodel.findByIdAndDelete({_id:orderid})
            res.send({"msg":"Delete success",status:"success"})
        } catch (error) {
            res.send({"msg":"something went wrong",status:"error"})
        }

    }else{
        res.send({"msg":"invalid request",status:"error"})
    }

})


module.exports={orderR}