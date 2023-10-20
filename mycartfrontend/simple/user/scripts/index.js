//let api="http://localhost:8080"
let api="https://mycart-0sv3.onrender.com"


// for slide show

// ----------------------------------------------------------------

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides((slideIndex += n));
}

document.getElementById("prev").addEventListener("click", () => {
    plusSlides(-1);
});

document.getElementById("next").addEventListener("click", () => {
    plusSlides(1);
});

function showSlides(n) {
    const slides = document.querySelectorAll(".slide");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}



//--------------------------------------------------------------



//onclick on category 

    // click on grocery:-

    let catgrocery=document.getElementById("catgrocery");
    catgrocery.onclick=()=>{
        localStorage.setItem("mykart_category","Grocery");
        window.location.href="./category.html"
    }

    // click on mobiles 

    let catmobile=document.getElementById("catmobile");
    catmobile.onclick=()=>{
        localStorage.setItem("mykart_category","Mobiles");
        window.location.href="./category.html"
    }

    // click on fashion

    let catfashion=document.getElementById("catfashion");
    catfashion.onclick=()=>{
        localStorage.setItem("mykart_category","Fashion");
        window.location.href="./category.html"
    }

    // click on Electronics

    let catelectronics=document.getElementById("catelectronics");
    catelectronics.onclick=()=>{
        localStorage.setItem("mykart_category","Electronics");
        window.location.href="./category.html"
    }

    //click on beauty

    let catbeauty=document.getElementById("catbeauty");
    catbeauty.onclick=()=>{
        localStorage.setItem("mykart_category","Beauty");
        window.location.href="./category.html"
    }

    // click on toys

    let cattoys=document.getElementById("cattoys");
    cattoys.onclick=()=>{
        localStorage.setItem("mykart_category","Toys");
        window.location.href="./category.html"
    }


    //--------------------------------------------------->

    // Getting famous product based on category;
        

    async function getfamousproduct(category){

        try {

            let res=await fetch(`${api}/product/getfamousproduct/${category}`)
            let result=await res.json();
          
            result=result.products;
            return result
            
        } catch (error) {
            console.log(error)
        }
    }

    //Best of Electronics Grid

  
   async function Bestelec(){
        let maindiv=document.getElementById("bestelec");

        let data=await getfamousproduct("Electronics");
      

        data.forEach((el)=>{
            let productdiv=document.createElement("div")
            productdiv.classList.add("product")

            productdiv.onclick=()=>{
                localStorage.setItem("mykart_product",el._id);
                window.location.href="./product.html"
            }

            let image=document.createElement("img")
            image.src=el.image;

            let name=document.createElement("p");
            name.text=el.name;

            productdiv.append(image,name);
            maindiv.append(productdiv)
        })
    }

    Bestelec()


     //Best of Toys Grid

  
   async function Besttoys(){
    let maindiv=document.getElementById("besttoys");

    let data=await getfamousproduct("Toys");
   

    data.forEach((el)=>{
        let productdiv=document.createElement("div")
        productdiv.classList.add("product")

        productdiv.onclick=()=>{
            localStorage.setItem("mykart_product",el._id);
            window.location.href="./product.html"
        }

        let image=document.createElement("img")
        image.src=el.image;

        let name=document.createElement("p");
        name.text=el.name;

        productdiv.append(image,name);
        maindiv.append(productdiv)
    })
}

Besttoys()