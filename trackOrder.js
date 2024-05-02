let host = getHost();

async function getOrders(){
    let orders = localStorage.getItem("ordersAll");

    

    let response = await fetch(host + "/orders");
    
    if (!response.ok) {
        if (response.status === 401) {
            logout();
        } else {
            throw new Error(`Failed to fetch flowers: ${response.statusText}`);
        }
    }

    let result = await response.json();

    let order = document.getElementById("orders");

    for(let ord of result){
        for(let o of orders){
            if(o = ord.id){
                order.innerHTML = "ff";
            }
        }
    }

}