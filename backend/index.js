const express=require("express");
var cors = require('cors')
const app=express();

var bodyParser = require('body-parser')

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())



const {connection}=require("./config/db");
const {users}=require("./routes/user.routes");
const {categoryroute}=require("./routes/category.routes")
const {prodr}=require("./routes/product.routes")
const {authentication}=require("./middleware/authentication")
const {cartr}=require("./routes/cart.routes")
const {orderR}=require("./routes/order.routes")
const {wishR}=require("./routes/wishlist.routes")
const {client}=require("./services/redis")



//user route
app.use("/user",users);

//category route
app.use("/category",categoryroute);

//product route
app.use("/product",prodr);

// cart route
app.use("/cart",authentication,cartr);

//order route
app.use("/order",authentication,orderR);

//wishlist route
app.use("/wishlist",authentication,wishR)

//base api
app.get("/",(req,res)=>{
    res.send({msg:"base api"})
})




app.listen(8080,async()=>{
    try {
        await connection
        await client.connect();
        console.log("connected to db")
    } catch (error) {
        console.log("not connected to db")
    }
    console.log("listining at 8080");
})