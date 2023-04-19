
    

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