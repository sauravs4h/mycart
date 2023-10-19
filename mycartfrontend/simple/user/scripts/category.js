//let api="http://localhost:8080/product"
let api="https://mycart-0sv3.onrender.com/product"


const category= localStorage.getItem("mykart_category");


// get category products:-

const getproduct=async()=>{
    try {

        const res=await fetch(`${api}/prodcategory/${category}`,{
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        })

         let result=await res.json()
        result=result.products
        

         appendproduct(result)
        
    } catch (error) {
        console.log(error)
    }
}

getproduct()



let container=document.getElementById("products");


const appendproduct=(res)=>{

    container.innerHTML="";
    container.classList.add("product-grid")
    res.forEach((el)=>{
        let div=document.createElement("div")
        div.classList.add("product-card");

        div.onclick=()=>{
            localStorage.setItem("mykart_product",el._id);
            window.location.href="./product.html"
          //  console.log(el._id);
        }
        
        let img=document.createElement("img")
        img.src=el.image

        let name=document.createElement("h3")
        name.innerText=el.name

        let price=document.createElement("h3")
        price.innerText="RS "+el.price

        div.append(img,name,price)

        container.append(div)
    })
}

