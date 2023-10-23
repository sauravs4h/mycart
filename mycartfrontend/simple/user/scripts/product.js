 //let api="http://localhost:8080"
 //let api="https://mycart-0sv3.onrender.com"
 let api="http://51.20.115.58:8080"


const product= localStorage.getItem("mykart_product");
let token=localStorage.getItem("mykart_token")

// console.log(".....",product)

const getproduct=async()=>{
    try {

        const res=await fetch(`${api}/product/getoneproduct/${product}`,{
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        })

         let result=await res.json()
        result=result.products
         //console.log("result",result)

         appendproduct(result[0])
        
    } catch (error) {
        console.log(error)
    }
}

getproduct()


let container=document.getElementById("productdiv");
container.classList.add("product-detail");


const appendproduct=(prod)=>{

     container.innerHTML=`
        <div  class="product-image">
            <img src=${prod.image} alt="Product 1">
        </div>
        <div class="product-info">
            <h2>${prod.name}</h2>
            <p class="product-brand">Brand: ${prod.brand}</p>
            <p class="product-description">${prod.description}</p>
            <p class="product-price">INR ${prod.price}</p>
           
            <div class="quantity">
                <label for="quantity">Quantity:</label>
                

            </div>
            <div class="product-buttons">
                <button id="cartbutton" class="add-to-cart-button">Add to Cart</button>
                <button id="wishlistbutton" class="add-to-wishlist-button">Add to Wishlist</button>
            </div>
        </div>
     `

     let quantityselect=document.createElement("select");

     quantityselect.innerHTML=optionvalu();
     quantityselect.id="quantity"
     quantityselect.value=1;

     quantityselect.onchange=(e)=>{
        quantityselect.value=e.target.value;

     }

     container.querySelector(".quantity").appendChild(quantityselect);

     

     function optionvalu(){
        return `
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>

        `
     }

// add to the cart

        let cartbutton=document.getElementById("cartbutton");
        cartbutton.onclick=async()=>{
             let quantity=+quantityselect.value;
            const productID=prod._id;
            //const product_quantity=+quantity;

           

        
            let cartobj={
            productID,
            quantity
            }
        
           
        
            const res= await fetch(`${api}/cart/addtocart`,{
                    method:"POST",
                    body:JSON.stringify(cartobj),
                    headers:{
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`
                        
                    }
        
            })
        
            const result= await res.json();
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
            

        }


// Add to the wishlist 

        let wishlist=document.getElementById("wishlistbutton");
        wishlist.onclick=async()=>{
            
            let productID=prod._id

            try {

                let res= await fetch(`${api}/wishlist/addtowish`,{
                    method:"POST",
                    headers:{
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`
                    },
                    body:JSON.stringify({productID})
                })
        
                let result=await res.json();
               // alert(result.msg)
               
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
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    
                  })
                //alert("something goes wrong")
                console.log(error)
            }
            
        }

    
}

















//  let imagediv=document.createElement("div");
    //  imagediv.classList.add("product-image");
    //  imagediv.innerHTML=`<img src=${res.image} alt="Product 1">`
    // container.classList.add("product-grid")
    // res.forEach((el)=>{
    //     let div=document.createElement("div")
    //     div.classList.add("product-card");

    //     div.onclick=()=>{
    //         localStorage.setItem("mykart_product",el._id);
    //         window.location.href="./product.html"
    //       //  console.log(el._id);
    //     }
        
    //     let img=document.createElement("img")
    //     img.src=el.image

    //     let name=document.createElement("h3")
    //     name.innerText=el.name

    //     let price=document.createElement("h3")
    //     price.innerText="RS "+el.price

    //     div.append(img,name,price)

        //container.append(imagediv)
    // })

