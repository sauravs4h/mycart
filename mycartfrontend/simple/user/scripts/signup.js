 //const api="http://localhost:8080/user";
 let api="https://mycart-0sv3.onrender.com/user"



let signupform=document.getElementById("signupform");
signupform.onsubmit=async(e)=>{

    e.preventDefault();

    let name=document.getElementById("name").value;
    let email=document.getElementById("email").value;
    let mobile_no=document.getElementById("mobile").value;
    let address=document.getElementById("address").value;
    let password=document.getElementById("password").value;

    
    let res=await fetch(`${api}/signup`,{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({name,email,mobile_no,address,password})
    });

    let result=await res.json();
   // alert(result.msg)

   if(res.ok){
    Swal.fire(
        'Good job!',
        `${result.msg}`,
        'success'
      )
    
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${result.msg}`,
            
        })

    }


    //console.log("hello")
}