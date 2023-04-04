const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    brand:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    }

})

const Productmodel= mongoose.model("product",productSchema);

module.exports={Productmodel}