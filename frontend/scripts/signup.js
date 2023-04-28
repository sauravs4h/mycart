



/// go for login

// let goforlogin=document.getElementById("loginbutton");

// loginbutton.onclick=()=>{

//     window.location.href="./login.html"
// }


// // go for cart section 

// let goforcart= document.getElementById("cartbutton");

// goforcart.onclick=()=>{

//     window.location.href="./cart.html"
// }


// // go for order section

// let gofororder= document.getElementById("orderbutton");

// gofororder.onclick=()=>{

//     window.location.href="./order.html"
// }


    

const api="http://localhost:8080/user"



let signupform=document.getElementById("signupform");

signupform.onsubmit=async(e)=>{
    e.preventDefault()
    let obj={
        name: document.getElementById("name").value,
        email : document.getElementById("emailid").value,
        mobile_no: document.getElementById("mobnumber").value ,
        password : document.getElementById("password").value
    }
    
    let res=await fetch(`${api}/signup`,{

        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(obj)

    })

    let result=await res.json();
    console.log(result)
    alert(result.msg)
    
    
}