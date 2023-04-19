const mongoose=require("mongoose")

const cartSchema=mongoose.Schema({

    quantity:{
        type:Number,
        require:true
    },

    total_price:{
        type:Number,
        require:true
    }
})