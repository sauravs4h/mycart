const express=require("express");
var cors = require('cors')
const app=express();


const {connection}=require("./config/db");
const {users}=require("./routes/user.routes");
const {prodr}=require("./routes/product.routes")
const {auth}=require("./middleware/auth");
const {cartr}=require("./routes/cart.routes")
const {orderR}=require("./routes/order.routes")


app.use(cors())
app.use(express.json());
app.use("/user",users)
app.use("/product",prodr);
app.use("/cart",auth,cartr)
app.use("/order",auth,orderR)



app.get("/",(req,res)=>{
    res.send({msg:"base api"})
})




app.listen(8080,async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log("not connected to db")
    }
    console.log("listining at 8080");
})