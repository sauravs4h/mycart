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
    password:{
        type:String,
        require:true
    }
})

const Usermodel=mongoose.model("Users",userSchema);

module.exports={Usermodel}