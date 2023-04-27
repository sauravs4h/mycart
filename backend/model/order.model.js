const mongoose=require("mongoose")

let orderSchema=mongoose.Schema({
    quantity:{
        type:Number,
        require:true
    },
    total_price:{
        type:Number,
        require:true
    },
    productID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    
    orderstatus:{
        type:String,
        require:true
    }

})


const Ordermodel=mongoose.model("order",orderSchema);


module.exports={Ordermodel}