import {navbar} from "../components/navbar.js";

let nav=document.getElementById("nav");

nav.innerHTML=navbar();

//for redirect to home page

let home=document.getElementById("logo");
home.onclick=()=>{

    window.location.href="./index.html"
}

//for redirect to login page

let login=document.getElementById("login");
login.onclick=()=>{

    window.location.href="./login.html"
}


//for redirect to cart page

let cart=document.getElementById("cart");
cart.onclick=()=>{

    window.location.href="./cart.html"
}


//for redirect to wish page

let wish=document.getElementById("wish");
wish.onclick=()=>{

    window.location.href="./wishlist.html"
}

