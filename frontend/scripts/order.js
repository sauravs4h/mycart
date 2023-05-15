


/// go for login

// let goforlogin=document.getElementById("loginbutton");

// loginbutton.onclick=()=>{

//     window.location.href="./login.html"
// }


// // go for cart section 

// let goforcart= document.getElementById("cartbutton");

// goforcart.onclick=()=>{

//     window.location.href="./cart.html"
// }


// // go for order section

// let gofororder= document.getElementById("orderbutton");

// gofororder.onclick=()=>{

//     window.location.href="./order.html"
// }



const api="http://localhost:8080"

const token= localStorage.getItem("mykart_token")

//console.log("token",token)
//http://localhost:8080/product/allproduct

///get total payment


///////////////// get allproduct ///////////////////////

const get_order_product=async()=>{

    

    try {

        const res=await fetch(`${api}/order/allorders`,{
            method:"GET",
            headers:{
                "content-type":"application/json",
                authorization: `Bearer ${token}`
                
            }
        })

         let result=await res.json()
        
         console.log("result",result)

         if (result.status=="error"){
            alert(result.msg);
            window.location.href="./login.html";
         }else{
            appendproduct(result.data)
         }

         
        
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
      
        let pdrstatus=document.createElement("h2")
        pdrstatus.innerText=el.orderstatus
      

        
        let pdrreturn=document.createElement("button")
        pdrreturn.innerText="Return";

        if(el.orderstatus=="Return"){
           
            pdrreturn.disabled=true;
        }
        pdrreturn.onclick=()=>{

            
            returnorder(el)
        }

        rightdiv.append(pdrname,pdrprice,pdrstatus,pdrreturn)

        
        productdiv.append(leftdiv,rightdiv)


    })


    

}

   

   //// for return

        
async function returnorder(el){

    let orderid=el._id

    let res= await fetch(`${api}/order/updatestatus/${orderid}`,{
        method:"PATCH",
        headers:{
                "content-type":"application/json",
                authorization: `Bearer ${token}`
        }
    })

    let result=await res.json();

    console.log(result)
    get_order_product()
    alert(result.msg)
}



