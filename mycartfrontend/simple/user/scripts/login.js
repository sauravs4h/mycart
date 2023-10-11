// let api="http://localhost:8080/user";
let api="https://mycart-0sv3.onrender.com/user"



let loginform=document.getElementById("loginform");
loginform.onsubmit=async(e)=>{

    e.preventDefault();

    
    let email=document.getElementById("email").value;
    let password=document.getElementById("password").value;

    
    let res=await fetch(`${api}/login`,{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({email,password})
    });

    let result=await res.json();
    if(result.status=="success"){
        let token=result.token
        
        localStorage.setItem("mykart_token",token)

        window.location.href="./index.html"
    }
    alert(result.msg)



    //console.log("hello")
}



const logout=document.getElementById("logout");

logout.onclick=async()=>{

    const token= localStorage.getItem("mykart_token")

    try {

        let logou=await fetch(`${api}/logout`,{
            method:"GET",
            headers:{
                "content-type":"application/json",
                authorization: `Bearer ${token}`
                
            }
        })

        let res=await logou.json();

        console.log(res)
        alert(res.msg);
        
    } catch (error) {
        alert(error);
    }
}


