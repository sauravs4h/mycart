import {navbarr} from "../components/navbar.js"

const navbar=document.getElementById("navbar");
navbar.innerHTML=navbarr()


/// go for login

let goforlogin=document.getElementById("loginbutton");

loginbutton.onclick=()=>{

    window.location.href="./login.html"
}


// go for cart section 

let goforcart= document.getElementById("cartbutton");

goforcart.onclick=()=>{

    window.location.href="./cart.html"
}




const api="http://localhost:8080"

const token= localStorage.getItem("mykart_token")

//console.log("token",token)
//http://localhost:8080/product/allproduct

///////////////// get allproduct ///////////////////////

const get_cart_product=async()=>{

    

    try {

        const res=await fetch(`${api}/cart/allcart`,{
            method:"GET",
            headers:{
                "content-type":"application/json",
                authorization: `Bearer ${token}`
                
            }
        })

         let result=await res.json()
        result=result.data
         console.log("result",result)

         //appendproduct(result)
        
    } catch (error) {
        console.log(error)
    }
}


get_cart_product()