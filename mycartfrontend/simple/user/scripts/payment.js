
 //const api="http://localhost:8080"
 let api="https://mycart-0sv3.onrender.com"
 //let api="http://51.20.115.58:8080"



const token= localStorage.getItem("mykart_token")



document.getElementById("dopayment").innerHTML = cardpayment();



let card_div = document.getElementById("craditcard");

card_div.addEventListener("click", () => {
  document.getElementById("dopayment").innerHTML = cardpayment();
});

let upi_div = document.getElementById("upi");

upi_div.addEventListener("click", () => {
  document.getElementById("dopayment").innerHTML = upipayment();
});

let netb_div = document.getElementById("ibanking");

netb_div.addEventListener("click", () => {
  document.getElementById("dopayment").innerHTML = netbankingdetails();
});

let cod_div = document.getElementById("cod");

cod_div.addEventListener("click", () => {
  document.getElementById("dopayment").innerHTML = codpayment();
});

document.getElementById("bagdetailbox").innerHTML = `
  <div id="bag">
      <h3>Bag</h3>
      <h3 id="titam">items</h3>
  </div>
  <hr>
  <div id="bagaddress">
      <h3>Deliver To</h3>
      <input type="text" id="useraddress" placeholder="Enter address">
  </div>
<hr>
<div id="bagmobile">
<h3>Mobile No.</h3>
<input type="text" id="usermobile" placeholder="Enter Mobile Number">
</div>
<hr>
<div id="bagprice">
<h3>Price Details</h3>
<h3 id="tprice">price</h3>
</div>`


document.getElementById("paybutton").onclick = async () => {
  let cardNumber = document.getElementById("cardnumberbox").value;
  let carddate = document.getElementById("carddatebox").value;
  let cardcvv = document.getElementById("cardcvvbox").value;
  let usermobile = document.getElementById("usermobile").value;
  let useraddress = document.getElementById("useraddress").value;
  if (
    cardcvv == "" ||
    cardNumber == "" ||
    carddate == "" ||
    usermobile == "" ||
    useraddress == ""
  ) {


    //alertMsg("fill all the fields", "error");

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Fill all the fields!',
      
    })

    return;
  }
  try {

    console.log("hello")
 
    let res=await fetch(`${api}/order/placeorder`,{
        method:"POST",
        headers:{
            "content-type":"application/json",
            authorization:`Bearer ${token}`,
            
        },
        body:JSON.stringify({
            address:useraddress,
            mobile_no:usermobile})

    })

    let result=await res.json();
    
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

    window.location.href="./thankyou.html"
    

}
catch(error){
    //alert(error)
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      
    })
}
};


// get count of item

let totalitems=0

async function gettotalitems(){
  try {
    let res=await fetch(`${api}/cart/totalitems`,{
      method:"GET",
      headers:{
        "content-type":"application/json",
        authorization:`Bearer ${token}`,
      }
    })

    let result= await res.json();
    totalitems=result.count;
    console.log(totalitems)
    let titam = document.getElementById("titam");
    titam.innerHTML = totalitems + " items";
    titam.style.color = "rgb(163,170,177)";
   
  } catch (error) {
   // alert(error)
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      
    })
  }
}

gettotalitems();




let totalprice = localStorage.getItem("your_total");



let useraddress = document.getElementById("useraddress");
useraddress.innerText = "plot no. b-90 jaipur";
useraddress.style.color = "rgb(163,170,177)";

let tprice = document.getElementById("tprice");
tprice.innerHTML = "INR " + totalprice;
tprice.style.color = "rgb(163,170,177)";
















// functions 


function cardpayment(){
      return `<div id="carditcarddetail">
    <div>
        <h3>Credit/Debit Card</h3>
    </div>
    <hr>
    <div>
        <input class="carddetail" id="cardnumberbox" maxlength="16" type="text" placeholder="Card Number" >
    </div>
    <div>
        <input class="carddetail" id="carddatebox" type="month" placeholder="MM/YY">
        <input class="carddetail" id="cardcvvbox" type="text" placeholder="CVV" maxlength="3">
    </div>

    <p id="savedetail"><input type="checkbox"> Save this card securely for future </p>

    <button id="paybutton">pay</button>
</div>`
    
}


function upipayment(){
    return `<div id="upidetail">
    <div>
        <h3>UPI</h3>
    </div>
    <hr>
    <div>
        <input class="upidetail" id="upinumberbox" type="number" placeholder="Enter UPI id" >
    </div>
    

    <p id="savedetail"><input type="checkbox"> Save this card securely for future </p>

    <button id="paybutton">pay</button>
</div>`
}


function netbankingdetails(){
    return `<div id="netbdetail">
    <div>
        <h3>Net Banking</h3>
    </div>
    <hr>
    <div>
        <p class="bankname"> AXIS <input type="radio" name="bank" checked></p>
        <p class="bankname"> HDFC <input type="radio" name="bank"></p>
        <p class="bankname"> ICICI <input type="radio" name="bank"></p>
        <p class="bankname"> KOTAK <input type="radio" name="bank"></p>
        <p class="bankname"> SBI <input type="radio" name="bank"></p>

    </div>
    

    <p id="savedetail"><input type="checkbox"> Save this card securely for future </p>

    <button id="paybutton">pay</button>
</div>`
}


function codpayment(){
    return `<div id="coddetail">
    <div>
        <h3>Cash On Delivery </h3>
    </div>
    <hr>
    
    <button id="paybutton">Place order</button>

</div>`
}


function bagdetail(){
    
    return `<div id="bag">
      <h3>Bag</h3>
      <h3 id="titam">items</h3>
    </div>
    <hr>
    <div id="bagaddress">
      <h3>Deliver To</h3>
      <input type="text" id="useraddress" placeholder="Enter address">
    </div>
    <hr>
    <div id="bagmobile">
      <h3>Mobile No.</h3>
      <input type="text" id="usermobile" placeholder="Enter Mobile Number">
    </div>
    <hr>
    <div id="bagprice">
      <h3>Price Details</h3>
      <h3 id="tprice">price</h3>
    </div>`;
  };
