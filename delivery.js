

loggedIn();



function loggedIn(){
    if(!isLoggedIn()){
        let lo = document.getElementById("login");
        lo.innerHTML = "<button onClick='redirectLogin()'>Login</button><button onClick='redirectSign()'>SignUp</button>"
    }
}

function redirectLogin(){
    window.location.href = "login.html";
}
function redirectSign(){
    window.location.href = "signup.html";
}


function saveInformation(event){
    event.preventDefault();
    let first = document.getElementById("firstName").value
    let last = document.getElementById("lastName").value
    let relate = document.getElementById("relationship").value

    let apartment = document.getElementById("apartment").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let zipcode = document.getElementById("zipcode").value;



    localStorage.setItem("first", first);
    localStorage.setItem("last", last);
    localStorage.setItem("relate", relate);

    localStorage.setItem("apartment", apartment);
    localStorage.setItem("address", address);
    localStorage.setItem("city", city);
    localStorage.setItem("zip", zipcode);
    console.log("saved");
    window.location.href = "placeOrder.html"
}


let hold = document.getElementById("submit");

hold.addEventListener("click", saveInformation);