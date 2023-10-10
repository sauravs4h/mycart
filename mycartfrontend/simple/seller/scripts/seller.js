// script.js

let api="http://localhost:8080"
let token=localStorage.getItem("mycartseller");


document.addEventListener("DOMContentLoaded", async () => {
    // Get references to DOM elements
    const categorySelect = document.getElementById("product-category");
    const categoryList = document.getElementById("category-list");
    
    // Function to fetch categories from the API
    const fetchCategories = async () => {
        try {
            const response = await fetch(`${api}/category/allcategory`); 
            const result=await response.json();
            
          //  console.log(response.ok)
            if (response.ok) {
               const categories = result.allcategory
               
                // Clear any existing categories
                categoryList.innerHTML = '';
                
                // Append fetched categories to the list
                categories.forEach(category => {
                    const li = document.createElement("li");
                    li.textContent = category.title;
                    categoryList.appendChild(li);

                    //option 
                    const option = document.createElement("option");
                    option.value = category._id; // Use a unique identifier for the value
                    option.textContent = category.title;
                    categorySelect.appendChild(option);

                });
            } else {
                console.error('Failed to fetch categories.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    // Fetch categories when the page loads
    fetchCategories();


    // add category 

let addcategory=document.getElementById("add-category-form");
addcategory.addEventListener("submit",async(e)=>{

    e.preventDefault();

    let title=document.getElementById("category-title").value;

    try {
        let res=await fetch(`${api}/category/addcategory`,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
                "authorization":`brear ${token}`
            },
            body:JSON.stringify({title})
        });

        let responce=await res.json();

        console.log(responce)
        if(responce.status="success"){
            alert(responce.status);
            fetchCategories();
        }else{
            alert(responce.status)
        }
        
    } catch (error) {
        alert("something went wrong")
    }

    })



    

});


// add products

let addproduct=document.getElementById("add-product-form");
addproduct.addEventListener("submit",async(e)=>{

    e.preventDefault();

   let name =document.getElementById("product-name").value;
   let price =document.getElementById("product-price").value;
   let description =document.getElementById("product-description").value;
   let image =document.getElementById("product-image").value;
   let brand =document.getElementById("product-brand").value;
   let category =document.getElementById("product-category").value;
   let subcategory =document.getElementById("product-subcategory").value;
   let colour =document.getElementById("product-colour").value;
   let stock =document.getElementById("product-stock").value;
   let rating =document.getElementById("product-rating").value;

   console.log(category)

   let res=await fetch(`${api}/product/addproduct`,{
    method:"POST",
    headers:{
        'Content-Type': 'application/json',
        "authorization":`brear ${token}`
    },
    body:JSON.stringify({name,price,description,image,brand,category,subcategory,colour,stock,rating})
   })

   let responce=await res.json();
   alert(responce.status);

   
})



