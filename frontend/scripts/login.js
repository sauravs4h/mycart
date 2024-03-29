
// goforsignup 

let goforsignup = document.getElementById("signup");

goforsignup.onclick=()=>{

    window.location.href="./signup.html"
}


    

const api="http://localhost:8080/user"



let loginform=document.getElementById("loginform");

loginform.onsubmit=async(e)=>{
    e.preventDefault()
    let obj={
        email : document.getElementById("emailid").value,
        password : document.getElementById("password").value
    }
    
    let res=await fetch(`${api}/login`,{

        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(obj)

    })

    let result=await res.json();
    console.log(result)

    if(result.status=="success"){
        let token=result.token
        
        localStorage.setItem("mykart_token",token)

        window.location.href="./index.html"
    }
    
}

// goforlogout

let goforlogout = document.getElementById("logout");

goforlogout.onclick=async()=>{
    const token= localStorage.getItem("mykart_token")

    try {

        let logout=await fetch(`${api}/logout`,{
            method:"GET",
            headers:{
                "content-type":"application/json",
                authorization: `Bearer ${token}`
                
            }
        })

        let res=await logout.json();

        console.log(res)

        alert(res.msg);
        
    } catch (error) {
        
    }
}
