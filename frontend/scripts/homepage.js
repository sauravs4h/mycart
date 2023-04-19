


const api="http://localhost:8080/product"

//http://localhost:8080/product/allproduct

///////////////// get allproduct ///////////////////////

const getproduct=async()=>{

    try {

        const res=await fetch(`${api}/allproduct`,{
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        })

         result=await res.json()
        result=result.products
         console.log(result)

         appendproduct(result)
        
    } catch (error) {
        
    }
}




container=document.getElementById("products");


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
        desc.innerText=el.description

        let add_to_cart=document.createElement("button")
        add_to_cart.innerText="Add to cart"

        add_to_cart.onclick=()=>{

            addcart(el)
        }

        // let deletee = document.createElement("button")
        // deletee.innerText="DELETE"
        // deletee.onclick=()=>{
        //     deleteproduct(el._id)
        // }

        div.append(img,name,price,brand,category,desc,add_to_cart)

        container.append(div)
    })
}


getproduct();





/// go for login

let goforlogin=document.getElementById("loginbutton");

loginbutton.onclick=()=>{

    window.location.href="./login.html"
}





///// add to cart 


function addcart(el){
    console.log(el)
}