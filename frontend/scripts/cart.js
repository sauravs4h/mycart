
const api="http://localhost:8080"

const token= localStorage.getItem("mykart_token")

//console.log("token",token)
//http://localhost:8080/product/allproduct

///get total payment


const yourtotal= async ()=>{

    let res=await fetch(`${api}/cart/totalprice`,{
        method:"GET",
        headers:{
            "content-type":"application/json",
            authorization: `Bearer ${token}`
        }
    })

    let result = await res.json()

    console.log(result)

    const yourt=document.getElementById("yourt");

    yourt.innerText="Your total :- "+result.total_price

}

yourtotal()






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

         appendproduct(result)
        
    } catch (error) {
        console.log(error)
    }
}


get_cart_product()

const container=document.getElementById("products")

const appendproduct=(res)=>{

   container.innerText="";

    res.forEach((el)=>{

        let productdiv=document.createElement("div")

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
        let pdrquantity=document.createElement("select")
        pdrquantity.innerHTML=option()
        pdrquantity.value=el.quantity

        pdrquantity.onchange=(e)=>{

            let newq=e.target.value

            updatequantity(el,newq)
        }

        
        let pdrdelete=document.createElement("button")
        pdrdelete.innerText="DELETE"
        pdrdelete.onclick=()=>{

            deletecart(el)
        }

        rightdiv.append(pdrname,pdrprice,pdrquantity,pdrdelete)

        ////
        productdiv.append(leftdiv,rightdiv)
        container.append(productdiv)


        function option(){
            return `
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
            `
        }

    //     container.innerHTML=`

    //     <div>
    //     <div>
    //         <img src=${el.productID.image} alt="product">
    //     </div>
    //     <div>
    //         <h2>${el.productID.name}</h2>
    //         <h2>total price : ${el.total_price}</h2>
            
    //         <select value=${el.quantity} name="quantity" id="quantity">
    //             <option value="1">1</option>
    //             <option value="2">2</option>
    //             <option value="3">3</option>
    //             <option value="4">4</option>
    //             <option value="5">5</option>
    //         </select>

    //         <button class="delete">delete</button>
    //     </div>
        
    // </div>
        
    //     `
    })
}



/// update quantity

async function updatequantity(el,newq){

    let id=el._id
    let quantity=newq

    try {

        let res= await fetch(`${api}/cart/update/${id}`,{
            method:"PATCH",
            headers:{
                "content-type":"application/json",
                authorization: `Bearer ${token}`
            },
            body:JSON.stringify({quantity})
        })

        let result=await res.json()
        get_cart_product()
        yourtotal()
        console.log(result);
        alert(result.msg)

        
    } catch (error) {

        alert("error")
        
    }

    
   // console.log("hello",id)
}



/// delete cart

async function deletecart(el){

   // console.log("helloddd")
   
   let id=el._id
 

   try {

       let res= await fetch(`${api}/cart/deletecart/${id}`,{
           method:"DELETE",
           headers:{
               "content-type":"application/json",
               authorization: `Bearer ${token}`
           },
           
       })

       let result=await res.json()
       get_cart_product();
       yourtotal()
       console.log(result);
       alert(result.msg)

       
   } catch (error) {

       alert("error")
       
   }
}






//// checkout


let checkout=document.getElementById("checkoutbutton");

checkout.onclick=()=>{

    window.location.href="./payment.html"
}