
// const api="http://localhost:8080"
let api="https://mycart-0sv3.onrender.com"



const token= localStorage.getItem("mykart_token")


// get category products:-

const getproduct=async()=>{
    try {

        const res=await fetch(`${api}/wishlist/allwishlist`,{
            method:"GET",
            headers:{
                "content-type":"application/json",
                authorization: `Bearer ${token}`

            }
        })

         let result=await res.json()
        // console.log("result",result)

         if (!res.ok){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${result.msg}`,
                
              })
            
            window.location.href="./login.html";
         }
         else{
            result=result.wishlist
            console.log(result)
            appendproduct(result)
         }

         
        
    } catch (error) {
        console.log(error)
        Swal.fire(
            'The Internet?',
            'That thing is still around?',
            'question'
          )
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

        
        
        let img=document.createElement("img")
        img.src=el.productID.image

        let name=document.createElement("h3")
        name.innerText=el.productID.name

        let price=document.createElement("h3")
        price.innerText="RS "+el.productID.price

        let deletebutton=document.createElement("button");
        deletebutton.innerText="Remove";
        deletebutton.classList.add("romovebutton")
        deletebutton.onclick=()=>{

            deleteitom(el._id)
        }

        img.onclick=()=>{
            localStorage.setItem("mykart_product",el.productID._id);
            window.location.href="./product.html"
          //  console.log(el._id);
        }

        div.append(img,name,price,deletebutton)

        container.append(div)
    })
}

async function deleteitom(id){

    
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
        getproduct()
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
        //alert("something went wrong")
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            
          })
    }
}
