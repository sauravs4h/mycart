const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    mobile_no:{
        type:Number,
        require:true
    },
    address:{
        type:String,
        
    },
    password:{
        type:String,
        require:true
    },

    wishlist:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"whishlist"
        },
    ],

    cart:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"cart"
        },
    ],

    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"orders"
        }
    ]
})

const Usermodel=mongoose.model("Users",userSchema);

module.exports={Usermodel}