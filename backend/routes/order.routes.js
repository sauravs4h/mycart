const express=require("express");

const {cartModel}=require("../model/cart.model");
const {Productmodel}=require("../model/product.model")
const {Usermodel}=require("../model/user.model");

const {Ordermodel}=require("../model/order.model")

const orderR=express.Router();


//route for placeorder

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

        res.status(201).json({msg:"order successfull ",status:"success"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"order unsuccessfull ",status:"error"})
    }
})


// route for get all order

orderR.get("/allorders",async(req,res)=>{

    let userID=req.body.userID

    try {

        let products=await Ordermodel.find({userID}).populate("productID")

        res.status(201).json({data:products,status:"success"})
        
    } catch (error) {
        res.status(500).json({msg:"something went wrong",status:"error"})
    }
})


// route for update the status of order
orderR.patch("/updatestatus/:id",async(req,res)=>{

    let orderid=req.params.id

    let order=await Ordermodel.findOne({_id:orderid});

    if(order){

        try {
            await Ordermodel.findByIdAndUpdate({_id:orderid},{orderstatus:"Return"})
            res.status(201).json({"msg":"return success",status:"success"})
        } catch (error) {
            res.status(500).json({"msg":"something went wrong",status:"error"})
        }

    }else{
        res.status(401).json({"msg":"invalid request",status:"error"})
    }

})

// route for delete the order
orderR.delete("/deleteorder/:id",async(req,res)=>{

    let orderid=req.params.id

    let order=await Ordermodel.findOne({_id:orderid});

    if(order){

        try {
            await Ordermodel.findByIdAndDelete({_id:orderid})
            res.status(201).json({"msg":"Delete success",status:"success"})
        } catch (error) {
            res.status(500).json({"msg":"something went wrong",status:"error"})
        }

    }else{
        res.status(401).json({"msg":"invalid request",status:"error"})
    }

})


module.exports={orderR}