import {navbarr} from "../components/navbar.js"

const navbar=document.getElementById("navbar");
navbar.innerHTML=navbarr()


/// go for login

let goforlogin=document.getElementById("loginbutton");

loginbutton.onclick=()=>{

    window.location.href="./login.html"
}


// go for cart section 

let goforcart= document.getElementById("cartbutton");

goforcart.onclick=()=>{

    window.location.href="./cart.html"
}




const api="http://localhost:8080"

const token= localStorage.getItem("mykart_token")








