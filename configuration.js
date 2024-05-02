const mode = 1;

const host_local = "http://localhost:8080";
const host_remote = "https://final-n1yk.onrender.com";

if(localStorage.getItem("total") == null){
    localStorage.setItem("total",0);
}
let shoppingBasketIcon = document.querySelector(".hit");


shoppingBasketIcon.innerHTML = ` ${localStorage.getItem('total')}`;

// holdde.innerHTML = ` <a class="nav-link" href="deliveryInformation.html"
// ><span class="material-symbols-outlined">
// shopping_basket ${localStorage.getItem('total')}</span></a> `


console.log(localStorage.getItem("total"))

function getHost() {
    return "https://final-n1yk.onrender.com"
}

function isLoggedIn() {
    if(localStorage.getItem("token")) {
        return true;
    } else {
        return false;
    }
}

function getTheToken() {
    return localStorage.getItem("token");
} 

function saveTheToken(token) {
     localStorage.setItem("token", token);
     
} 

function removeTheToken() {
    localStorage.removeItem("token");
} 

let configuration = {
    isLoggedIn: () => isLoggedIn(), 
    host: () => getHost(), 
    token: () => getTheToken()    
};

function setCustomer(user, pass){
    localStorage.setItem("username", user);
    localStorage.setItem("password", pass);
}
function getUser(){
    return localStorage.getItem("username");
}
function getPass(){
    return localStorage.getItem("password");
}



async function signup() {
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("passs").value;
    let customer = {email:email, username: username, password: password};
    console.log(customer);
    
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(customer)
      };
      try {
        let response = await fetch(getHost() + "/signup", request);
        if(response.status == 200) {  
            alert("The registration was successful!")
            location.href = "login.html";

        } else {
            console.log(`response status:${response.status}`);            
            alert("Something went wrong!");
        }
      }
      catch(error) {
        console.log(error);        
        alert("Something went wrong!");
      }    
}



async function login() {    
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let customer = {username: username, password: password};
    setCustomer(username, password);

    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
    };
    try{
        let response = await fetch(getHost() + "/signin", request);
        if(response.status == 200){
            alert("The login was succesful!");
            const token = await response.text();
            saveTheToken(token);
            location.href = "index.html";
        }else{
            console.log(`response status:${response.status}`);
            removeTheToken();
            alert("Something went wrong")
        }   
    }
    catch(error){
        console.log(error);
        removeTheToken();
        alert("Something went wrong")
    }
}

async function logout() {   
    removeTheToken();  
}