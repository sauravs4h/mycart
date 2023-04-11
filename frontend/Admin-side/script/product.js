

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




container=document.getElementById("container");


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

        let update=document.createElement("button")
        update.innerText="UPDATE"

        let deletee = document.createElement("button")
        deletee.innerText="DELETE"
        deletee.onclick=()=>{
            deleteproduct(el._id)
        }

        div.append(img,name,price,brand,category,desc,update,deletee)

        container.append(div)
    })
}



// delete product

async function deleteproduct(id){

   

    let res=await fetch(`${api}/deleteproduct/${id}`,{
        method: "DELETE",
        headers: {
            "content-type":"application/json"
        },
        body:null
    })

    let result=await res.json();
    alert(result.msg)
    getproduct()
    console.log(result)
}
















///////////////////////////// add product  /////////////////////////////////

const addproduct=document.getElementById("addproduct");
addproduct.onclick=()=>{
    addproductform()
}

const addproductform=()=>{
    container.innerHTML="";

    container.innerHTML=`

    <form id="addpform" action="">
            <input id="pdname" type="text" placeholder="product name" required >
            <input id="pdprice" type="number" placeholder="product price" required>
            <input id="pddesc" type="text" placeholder="product desc" required>
            <input id="pdimg" type="text" placeholder="product image" required >
            <input id="pdbrand" type="text" placeholder="product brand" required>
            <input id="pdcat" type="text" placeholder="product category" required>
            <input id="pdstock" type="number" placeholder="product stoke" required>
            <input id="pdrating" type="number" placeholder="product rating" required>
            <input  type="submit">
    
    </form>
    `


    let addform=document.getElementById("addpform");

        addform.onsubmit=async(e)=>{
            e.preventDefault();

            
               let name = document.getElementById("pdname").value
               let price = document.getElementById("pdprice").value
               let description = document.getElementById("pddesc").value
               let image = document.getElementById("pdimg").value
               let brand = document.getElementById("pdbrand").value
               let category = document.getElementById("pdcat").value
               let stock = document.getElementById("pdstock").value
               let rating = document.getElementById("pdrating").value


               let obj={
                name:name,
                price:price,
                description:description,
                image:image,
                brand:brand,
                category:category,
                stock:stock,
                rating:rating
               }
            
               
               


            let res=await fetch(`${api}/addproduct`,{
                method:"POST",
                
                headers:{
                    "content-type":"application/json"
                },
                body: JSON.stringify(obj)
            })

            let result=await res.json();
            alert(result.msg)
            console.log(result);


            // empty the input feild
            document.getElementById("pdname").value=""
            document.getElementById("pdprice").value=""
            document.getElementById("pddesc").value=""
            document.getElementById("pdimg").value=""
            document.getElementById("pdbrand").value=""
            document.getElementById("pdcat").value=""
            document.getElementById("pdstock").value=""
            document.getElementById("pdrating").value=""

  
        }

}



