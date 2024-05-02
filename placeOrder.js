
let host = getHost();

setItems();



// <div id="top"></div>
// <div id="deliveryDate"></div>
// <div id="itemPricing"></div>
// <div id="cost"></div>

function setItems(){
    console.log("hit");
    let dDate = localStorage.getItem("date");
    let cost = localStorage.getItem("cost");
    cost = Number(cost).toFixed(2);
    let firstName = localStorage.getItem("first");
    let lastName = localStorage.getItem("last");
    let address = localStorage.getItem("address");
    let oldCost = localStorage.getItem("oldCost");

    

    let dateElement = document.getElementById("deliveryDate");
    let pricingElement = document.getElementById("itemPricing");
    let costElement = document.getElementById("cost");
    let addressElement = document.getElementById("address");

    dateElement.innerHTML = `<h2>Delivery Date</h2><p>${dDate}</p>`;
    pricingElement.innerHTML = `<h2>Item Pricing</h2><p>${cost}</p>`;
   
    addressElement.innerHTML = `<h2>Delivery Address</h2><p>${firstName} ${lastName}</p><p>${address}</p>`;

    if(isLoggedIn()){
    costElement.innerHTML = `<h2>Total Cost</h2>
                                <p>Subtotal: ${cost}</p>
                                <p>Delivery: 25$ </p>
                                <p>Delivery Discount: -10</p>
                                <p>Tax: 0.00</p>
                                <p>Order Total: ${cost + 15}</p>`;
    }
    costElement.innerHTML = `<h2>Total Cost</h2>
    <p>Subtotal: ${cost}</p>
    <p>Delivery: 25$ </p>
    <p>Delivery Discount: 0</p>
    <p>Tax: 0.00</p>
    <p>Order Total: ${Number(cost) + 25}</p>`;

    
}


async function sendOrder(){
    console.log("send")

    let dDate = localStorage.getItem("date");
    let cost = localStorage.getItem("cost");
    let id = localStorage.getItem("list");

    let obj = {
        "date" : dDate,
        "cost" : cost,
        "flowersList" : [id]
    }

    let request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      };
      let response = await fetch(host + "/orders",request);

      localStorage.setItem("total", 0);

    window.location.href = "index.html"
}

let fin = document.getElementById("finish");

fin.addEventListener("click", sendOrder);
