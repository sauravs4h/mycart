
//const api="http://localhost:8080"
let api="https://mycart-0sv3.onrender.com"
//let api="http://51.20.115.58:8080"


const token= localStorage.getItem("mykart_token")


// total price -------------------------------->

const yourtotal= async ()=>{

    let res=await fetch(`${api}/cart/totalprice`,{
        method:"GET",
        headers:{
            "content-type":"application/json",
            authorization: `Bearer ${token}`
        }
    })

    let result = await res.json()

  

    const yourt=document.getElementById("total-price");

    yourt.innerText="INR "+result.total_price

    localStorage.setItem("your_total",result.total_price);
    

}

yourtotal()

//------------------------------------------------------->




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
     

         appendproduct(result)
        
    } catch (error) {
       // alert(error)
       Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        
      })
    }
}


get_cart_product()

const container=document.getElementById("cart-items")

const appendproduct=(result)=>{

   container.innerText="";

   result.forEach((el)=>{

 

    let productdiv=document.createElement("div")
    productdiv.classList.add("cart-item")
    container.append(productdiv);
    productdiv.innerHTML=`
                <div class="item-details">
                    <img src=${el.productID.image} alt="Product 1">
                    <div class="item-info">
                        <h3>${el.productID.name}</h3>
                        <p class="item-price">INR ${el.productID.price}</p>
                    </div>
                </div>
                <div id="quantitycont" class="item-quantity">
                    <label for="quantity1">Quantity:</label>
                   
                </div>
                <div class="item-total">
                    <p class="total-price">INR ${el.total_price}</p>
                </div>
                <div class="item-remove">
                    
                </div>
    `

    
    let quantityselect=document.createElement("select");

    quantityselect.innerHTML=optionvalu();
    quantityselect.id="quantity"
    quantityselect.value=el.quantity;

    quantityselect.onchange=(e)=>{
       
       updatequantity(el,e.target.value)
       
    }

    productdiv.querySelector(".item-quantity").appendChild(quantityselect);

    

    function optionvalu(){
       return `
       <option value="1">1</option>
       <option value="2">2</option>
       <option value="3">3</option>
       <option value="4">4</option>
       <option value="5">5</option>

       `
    }


    // delete functionality

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.textContent = "Remove";
    productdiv.querySelector(".item-remove").appendChild(removeButton);

    removeButton.addEventListener("click", () => {
        deletecart(el);
    });
    
    })

//-------------------------------


}



/// delete cart

async function deletecart(el){ 
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
       
       //alert(result.msg)

        if(res.ok){
            Swal.fire(
                'Good job!',
                `${result.msg}`,
                'success'
            )
        
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${result.msg}`,
                
            })

        }

       
   } catch (error) {

      // alert("error")
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        
      })
       
   }
}





// update quantity

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
       
        //alert(result.msg)
        if(res.ok){
            Swal.fire(
                'Good job!',
                `${result.msg}`,
                'success'
              )
            
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${result.msg}`,
                
              })

        }

        
    } catch (error) {

       // alert("error")
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            
          })
        
    }
}






//// checkout


let checkout=document.getElementById("checkoutbutton");

checkout.onclick=()=>{

    window.location.href="./payment.html"
}









