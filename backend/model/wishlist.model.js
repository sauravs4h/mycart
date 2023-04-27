const mongoose=require("mongoose");

const wishlistSchema=mongoose.Schema({
    productID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})

const Wishlistmodel=mongoose.model("wishlist",wishlistSchema);


module.exports={Wishlistmodel}