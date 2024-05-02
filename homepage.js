
let host = getHost();
let flowers = [];
displayFlowers();


if(localStorage.getItem("ordersAll") == null){
  localStorage.setItem("ordersAll", []);
}




async function getFlowers() {
    // const headers = { Authorization: `Bearer ${configuration.token()}` };
   

    try {
        let response = await fetch(host + "/flowers");
        
        if (!response.ok) {
            if (response.status === 401) {
                logout();
            } else {
                throw new Error(`Failed to fetch flowers: ${response.statusText}`);
            }
        }

        let result = await response.json();
        
        return result;
    } catch (error) {
        console.error("Error fetching flowers:", error);
        throw error; 
    }
}





/* */


      async function getImage(id) {
        const headers = { Authorization: `Bearer ${configuration.token()}` };
        let response = await fetch(host + "/questions" + "/" + id + "/image", {
          headers,
        });
        if (response.status === 401) {
          logout();
        }

        const blob = await response.blob();
        const imgUrl = URL.createObjectURL(blob);
        const img = document.createElement("img");
        img.src = imgUrl;
        img.style = "width:100%";
        return img;
      }



      async function displayFlowers() {
        if (flowers.length == 0) {
          flowers = await getFlowers();
        }
        

        let list = document.getElementById("flowers");
        list.innerHTML = "";

        for (let flower of flowers) {
          //image = await getImage(question.id);

          let div = document.createElement("div");
          div.className = "card";
          let innerHtml = `
         
        <div class="container" onclick="redirect(${flower.id})">
        <img id=placeholdImg src='decorativeImg/pinkFlowers.jpg'></img>
          <h4><b>${flower.description}</b></h4> 
          <p>${flower.price}</p>
        </div>
            `;
          
          div.innerHTML += innerHtml;
          list.appendChild(div);
        }
      }






      //Sorting Functions 


async function sortType(flType){
    console.log("type");
    
    let flowers = await getFlowers();
    for (let i = flowers.length - 1; i >= 0; i--) {
        if (flowers[i].type !== flType) {
          console.log(flowers[i].type);
         flowers.splice(i, 1);
    }
}
    let list = document.getElementById("flowers");
    list.innerHTML = "";

    for (let flower of flowers) {
      //image = await getImage(question.id);

      let div = document.createElement("div");
      div.className = "card";
      let innerHtml = `
     
    <div class="container" onclick="redirect(${flower.id})">
    <img id=placeholdImg src='decorativeImg/pinkFlowers.jpg'></img>
      <p>${flower.id}</p>
      <h4><b>${flower.description}</b></h4> 
      <p>${flower.price}</p>
    </div>
        `;
    //  div.appendChild(image);
      div.innerHTML += innerHtml;
      list.appendChild(div);
    }
}




async function redirect(id){

  localStorage.setItem("flower", id);

  window.location.href = "addToBasket.html";
}









async function sortOccasion(flOccasion){
    console.log("occasion");
    flowers = await getFlowers();
    let i =0;
    for (let i = flowers.length - 1; i >= 0; i--) {
        if (flowers[i].occasion !== flOccasion) {
         flowers.splice(i, 1);
    }
}
    let list = document.getElementById("flowers");
    list.innerHTML = "";

    for (let flower of flowers) {
      //image = await getImage(question.id);

      let div = document.createElement("div");
      div.className = "card";
      let innerHtml = `
     
    <div class="container" onclick="redirect(${flower.id})">
    <img id=placeholdImg src='decorativeImg/pinkFlowers.jpg'></img>
      <h4><b>${flower.description}</b></h4> 
      <p>${flower.price}</p>
    </div>
        `;
    //  div.appendChild(image);
      div.innerHTML += innerHtml;
      list.appendChild(div);
    }
}

async function sortColor(flColor){
    console.log("color");
    flowers = await getFlowers();
    for (let i = flowers.length - 1; i >= 0; i--) {
        if (flowers[i].color !== flColor) {
         flowers.splice(i, 1);
    }
}
    let list = document.getElementById("flowers");
    list.innerHTML = "";

    for (let flower of flowers) {
      //image = await getImage(question.id);

      let div = document.createElement("div");
      div.className = "card";
      let innerHtml = `
     
    <div class="container" onclick="redirect(${flower.id})">
    <img id=placeholdImg src='decorativeImg/pinkFlowers.jpg'></img>
      <h4><b>${flower.description}</b></h4> 
      <p>${flower.price}</p>
    </div>
        `;
    //  div.appendChild(image);
      div.innerHTML += innerHtml;
      list.appendChild(div);
    }
}

async function sortPrice(dir){
    console.log("price");
    flowers = await getFlowers();
    let arr = flowers;
    if(dir == "low"){
    for (var i = 1; i < arr.length; i++) {
        for (var j = 0; j < i; j++) {
            if (arr[i].price < arr[j].price) {
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
}
    }
    else if(dir == "high"){
        for (var i = 1; i < arr.length; i++) {
            for (var j = 0; j < i; j++) {
                if (arr[i].price > arr[j].price) {
                    var temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
    }
        }
        let list = document.getElementById("flowers");
        list.innerHTML = "";
    
        for (let flower of flowers) {
          //image = await getImage(question.id);
    
          let div = document.createElement("div");
          div.className = "card";
          let innerHtml = `
         
        <div class="container" onclick="redirect(${flower.id})">
        <img id=placeholdImg src='decorativeImg/pinkFlowers.jpg'></img>
          <h4><b>${flower.description}</b></h4> 
          <p>${flower.price}</p>
        </div>
            `;
        //  div.appendChild(image);
          div.innerHTML += innerHtml;
          list.appendChild(div);
        }
}


let flowerType = document.getElementById("flowerType");
let occasion = document.getElementById("occasion");
let color = document.getElementById("colors");
let price = document.getElementById("price");

flowerType.addEventListener("change", function() {sortType(flowerType.value)});
occasion.addEventListener("change", function() {sortOccasion(occasion.value)});
color.addEventListener("change", function() {sortColor(color.value)});
price.addEventListener("change", function() {sortPrice(price.value)});
