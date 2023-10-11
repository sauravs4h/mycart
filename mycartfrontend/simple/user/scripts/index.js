

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
