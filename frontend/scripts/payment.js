
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

let order= document.getElementById("pay");

order.onclick=async()=>{

    
    let card_number=document.getElementById("cardnumber");
    let date=document.getElementById("cardexp");
    let cvv=document.getElementById("cardcvv");
    let address=document.getElementById("address");
    let mobile_no=document.getElementById("mob_number");

    if(
        card_number.value=="" || 
        date.value==""||
        cvv.value==""||
        address.value==""||
        mobile_no==""
        
    ){
        alert("please enter all details")
    }else{

        console.log("hello")
     
        let res=await fetch(`${api}/order/placeorder`,{
            method:"POST",
            headers:{
                "content-type":"application/json",
                authorization:`Bearer ${token}`,
                
            },
            body:JSON.stringify({
                address:address.value,
                mobile_no:mobile_no.value})

        })

        let result=await res.json();
        console.log(result)
        alert(result.msg)



    }

}






