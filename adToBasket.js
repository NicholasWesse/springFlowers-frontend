let d = document.getElementById("placeOrder");
let host = getHost();

setName();


async function setName(){
    let flower = await getFlower();

    let name = document.getElementById("flowerName");
    name.innerHTML = `<h1>${flower.description}</h1>`;
}


async function getFlower(){
    
        let id = localStorage.getItem("flower");

        let response = await fetch(host + "/flowers" + `/${id}`);
        
        if (!response.ok) {
            if (response.status === 401) {
                logout();
            } else {
                throw new Error(`Failed to fetch flowers: ${response.statusText}`);
            }
        }

        let result = await response.json();
        return result;
}

function saveInfo(id, date, cost){
    localStorage.setItem("list", id);
    localStorage.setItem("date", date);
    localStorage.setItem("cost", cost);

}

async function submit() {
        let result = await getFlower();
        console.log(result)
   

        let first = document.getElementById("flowerName");
        first.innerHTML = `<h2>${result.description}</h2>`;

        let cost = 0;
        let da = document.getElementById("date");
        let co = document.getElementsByName("options");
        
        localStorage.setItem("oldCost", result.price);
        if (co[0].checked) {
            cost += 74;
        } else {
            cost += 56;
        }
        
        cost += result.price;

        let id = result.id;


        saveInfo(id,da.value,cost);
        localStorage.setItem("total", 1)

    

        
        window.location.href = "deliveryInformation.html";




}


d.addEventListener("click", submit);
