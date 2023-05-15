const mongoose=require("mongoose")

const cartSchema=mongoose.Schema({

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
        ref:"user"
    }
})

const cartModel= mongoose.model("cart",cartSchema);

module.exports={cartModel}