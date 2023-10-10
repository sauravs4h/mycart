// script.js

let api="http://localhost:8080"

const loginButton = document.getElementById("login-button");
const signupButton = document.getElementById("signup-button");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

loginButton.addEventListener("click", () => {
    loginButton.classList.add("active-button");
    signupButton.classList.remove("active-button");
    loginForm.style.display = "block";
    signupForm.style.display = "none";

    let logform=document.getElementById("logform");
    logform.addEventListener("submit",async(e)=>{

        e.preventDefault()

        const email=document.getElementById("logemail").value;
        const password=document.getElementById("logpassword").value;

        try {
            let res=await fetch(`${api}/user/login`,{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                    
                },
                body:JSON.stringify({email,password})
            });

            let responce=await res.json();
            console.log(responce);
            if(responce.status=="success"){

                let token=responce.token;
                localStorage.setItem("mycartseller",token);
                 alert("login successfull");

                window.location.href="./seller.html"
            }else{
                alert("wrong credentials, try again")
            }


        } catch (error) {
            console.error('Network error:', error);
            alert('Network error:', error)
        }

    })
});

signupButton.addEventListener("click", () => {
    signupButton.classList.add("active-button");
    loginButton.classList.remove("active-button");
    signupForm.style.display = "block";
    loginForm.style.display = "none";

    const signform= document.getElementById("signform");
    signform.addEventListener("submit",async(e)=>{

        e.preventDefault()

        const name=document.getElementById("signame").value;
        const email=document.getElementById("signemail").value;
        const mobile=document.getElementById("sigmob").value;
        const address=document.getElementById("signaddress").value;
        const password=document.getElementById("signpass").value;

        try {

            let res=await fetch(`${api}/user/signup`,{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                    
                },
                body:JSON.stringify({name,email,mobile,address,password,role:"Seller"})
            });

            let responce=await res.json();
            console.log(responce);

            alert(responce.status);
            
        } catch (error) {
            console.error('Network error:', error);
            alert('Network error:', error)
        }


        
    })
});
