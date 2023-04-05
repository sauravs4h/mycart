
let allproduct=document.getElementById("allproduct")
allproduct.onclick=()=>{
    getproduct();
}

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




product_div=document.getElementById("container");


const appendproduct=(res)=>{

    product_div.innerHTML="";
    res.forEach((el)=>{

        let div=document.createElement("div")
        
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

        let update=document.createElement("button")
        update.innerText="UPDATE"

        let deletee = document.createElement("button")
        deletee.innerText="DELETE"

        div.append(img,name,price,brand,category,desc,update,deletee)

        product_div.append(div)
    })
}


///////////////////////////// add product  /////////////////////////////////


const addproductform=()=>{
    product_div.innerHTML="";

    product_div.innerHTML=`
    
    
    
    
    `
}
