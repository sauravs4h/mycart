


const api="http://localhost:8080"

const token= localStorage.getItem("mykart_token")

//console.log("token",token)
//http://localhost:8080/product/allproduct

///////////////// get allproduct ///////////////////////

const getproduct=async()=>{

    

    try {

        const res=await fetch(`${api}/product/allproduct`,{
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        })

         let result=await res.json()
        result=result.products
         console.log("result",result)

         appendproduct(result)
        
    } catch (error) {
        console.log(error)
    }
}




let container=document.getElementById("products");


const appendproduct=(res)=>{

    container.innerHTML="";
    res.forEach((el)=>{

        let div=document.createElement("div")
        div.classList.add("productdiv")
        
        let img=document.createElement("img")
        img.src=el.image

        let name=document.createElement("h2")
        name.innerText=el.name

        let price=document.createElement("h3")
        price.innerText="RS "+el.price

        let brand=document.createElement("h3")
        brand.innerText=el.brand

        let category=document.createElement("h3")
        category.innerText=el.category

        let desc=document.createElement("p")
        desc.innerText=el.description;

        let quantity=document.createElement("input");
        quantity.setAttribute("type","number");
        quantity.setAttribute("placeholder","enter quantity");
        quantity.setAttribute("value",1);

        let add_to_cart=document.createElement("button")
        add_to_cart.innerText="Add to cart"

        add_to_cart.onclick=()=>{

            let q=quantity.value

            addcart(el,q)
        }

        

        let addtowishlist = document.createElement("button")
        addtowishlist.innerText="add to wishlist"
        addtowishlist.onclick=()=>{
            wishproduct(el._id)
        }

        div.append(img,name,price,brand,category,desc,quantity,add_to_cart,addtowishlist)

        container.append(div)
    })
}


getproduct();





// /// go for login

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




// // go for wishlist section

// let goforwish= document.getElementById("wishbutton");

// goforwish.onclick=()=>{

//     window.location.href="./wishlist.html"
// }





///// add to cart 


async function addcart(el,q){
   // console.log(el,+q)

   const productID=el._id;
   const quantity=+q;

   

   let cartobj={
    productID,
    quantity
   }

   console.log(cartobj)

   const res= await fetch(`${api}/cart/addtocart`,{
            method:"POST",
            body:JSON.stringify(cartobj),
            headers:{
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
                
            }

   })

   const result= await res.json();
   alert(result.msg)
   
   
}

// add to wishlist 

async function wishproduct(id){
    let productID=id;

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
        alert(result.msg)
        console.log(result)
        
    } catch (error) {
        alert("something goes wrong")
        console.log(error)
    }
}