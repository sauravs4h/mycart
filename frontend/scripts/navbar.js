
import {navbarr} from "../components/navbar.js"

const navbar= document.getElementById("navbar");

navbar.innerHTML=navbarr()




// go for home page

let goforhome=document.getElementById("homeimg");

goforhome.onclick=()=>{

    window.location.href="./index.html"
}





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

// go for wishlist section

let goforwish= document.getElementById("wishbutton");

goforwish.onclick=()=>{

    window.location.href="./wishlist.html"
}



// go for order section

let gofororder= document.getElementById("orderbutton");

gofororder.onclick=()=>{

    window.location.href="./order.html"
}

