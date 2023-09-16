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

    role:{
        type:String,
        enum:["Customer","Seller","Admin"],
        default:"Customer"
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