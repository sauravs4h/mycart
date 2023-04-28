import {navbarr} from "../components/navbar.js"

let navbar=document.getElementById("navbar")

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


// go for order section

let gofororder= document.getElementById("orderbutton");

gofororder.onclick=()=>{

    window.location.href="./order.html"
}



const api="http://localhost:8080"

const token= localStorage.getItem("mykart_token")




///////////////// get allproduct ///////////////////////

const get_order_product=async()=>{
    try {

        const res=await fetch(`${api}/wishlist/allwishlist`,{
            method:"GET",
            headers:{
                "content-type":"application/json",
                authorization: `Bearer ${token}`
                
            }
        })

         let result=await res.json()
        result=result.wishlist
         console.log("result",result)

         appendproduct(result)
        
    } catch (error) {
        console.log(error)
    }
}


get_order_product()

const container=document.getElementById("products")

const appendproduct=(res)=>{

    container.innerText="";

    res.forEach((el)=>{

        
        let productdiv=document.createElement("div")

        container.append(productdiv)

        ///
        let leftdiv=document.createElement("div")

        let prodimg=document.createElement("img");
        prodimg.src=el.productID.image;

        leftdiv.append(prodimg);
        ///

        ////

        let rightdiv=document.createElement("div")

        let pdrname=document.createElement("h2")
        pdrname.innerText=el.productID.name
        let pdrprice=document.createElement("h2")
        pdrprice.innerText=" price : "+ el.productID.price;
      
        // let pdrstatus=document.createElement("h2")
        // pdrstatus.innerText=el.orderstatus
      

        
        let pdrdelete=document.createElement("button")
        pdrdelete.innerText="Remove from wishlist";

        pdrdelete.onclick=()=>{
            removewish(el._id)
        }
       

        rightdiv.append(pdrname,pdrprice,pdrdelete)

        
        productdiv.append(leftdiv,rightdiv)


    })


    

}


// remove from wishlist 

async function removewish(id){
    //console.log(id)

    try {
        let res=await fetch(`${api}/wishlist/deletewish/${id}`,{
            method:"DELETE",
            headers:{
                "content-type":"application/json",
                authorization: `Bearer ${token}`
                
            }
        })

        let result=await res.json()
        console.log(result);
        get_order_product()
        alert(result.msg)
    } catch (error) {
        alert("something went wrong")
    }
}