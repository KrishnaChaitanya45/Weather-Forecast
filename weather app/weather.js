

 const container = document.querySelector('.container'),
 
    inputPart = container.querySelector(".inputpart"),
    info_text = inputPart.querySelector(".info"),
    inputField = inputPart.querySelector('input');
    locationBTN = inputPart.querySelector('button');
    let api;
    Icon = document.querySelector(".weather-area img");

    // let apikey= "08fef673e7d8e13f5ee8b7ccd39258ba";


    inputField.addEventListener("keyup", e => {
            if (e.key == "Enter" && inputField.value != "") {
                requestApi(inputField.value);
    }
     });

locationBTN.addEventListener("click", () => {
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

}else{
    console.log("error");
}
});

function onSuccess(position){
    const {latitude,longitude} = position.coords;
      api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=08fef673e7d8e13f5ee8b7ccd39258ba`
fetchData(); 
}



function onError(error){
    info_text.innerText = error.message;
    info_text.classList.add("error");
}



     function requestApi(city){
          api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=08fef673e7d8e13f5ee8b7ccd39258ba`;
    //      info_text.innerText = "Gathering Weather Details....";
    //      info_text.classList.add("pending");
    //      fetch(api).then(response => response.json()).then(result => weatherdetails(result));
    fetchData();
     }

     function fetchData(){

        info_text.innerText = "Gathering Weather Details....";
          info_text.classList.add("pending");
          fetch(api).then(response => response.json()).then(result => weatherdetails(result));

     }
     function weatherdetails(info){
         if(info.cod == "404"){
            info_text.innerText = `${inputField.value} is not a valid city name`;
            info_text.classList.replace("pending", "error");
         }else{
         const city = info.name;
         const country = info.sys.country;
         const {description , id} = info.weather[0];
         const {feels_like , humidity , temp} = info.main;

         if(id == 800){
        Icon.src = "icons/clear.svg";
         }else if(id >=200 && id<=232){
             Icon.src = "icons/storm.svg";
         }else if(id >= 600 && id<=622){
            Icon.src = "icons/snow.svg";
        }else if(id >=701 && id<=781){
            Icon.src = "icons/haze.svg";
        }else if(id >=801 && id<=804){
            Icon.src = "icons/cloud.svg";
        } else if(id >=300 && id<=321 || id >= 500 &&  id <= 531){
            Icon.src = "icons/rain.svg";
        }
        
        
        
        
         








         container.querySelector(".num").innerHTML = Math.floor(temp);
         container.querySelector(".weather").innerHTML = description;
         container.querySelector(".location span").innerHTML = `${city} , ${country}`;
         container.querySelector(".temp .num-2").innerHTML = feels_like;
         container.querySelector(".humidity span").innerHTML = `${humidity}%`;


            info_text.classList.remove("pending", "error");
         container.classList.add("active");
         console.log(info);
         }  
     }
    