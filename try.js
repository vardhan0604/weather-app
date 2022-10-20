const currentweather = async(a,b) =>{
    const response =  await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${a}&lon=${b}&units=metric&appid=0c53415518b8eb2c9ab6c5c2207da3c9`);
    let data = await response.json();
    
    return data;
}


  


const update =({clouds:{all},name,weather:[{main,description,icon}],main:{feels_like,humidity,pressure,temp,temp_max,temp_min},wind:{speed}}) =>{
    document.querySelector(".tempc").textContent=temp+" °C";
    document.querySelector(".feels").textContent=`Feels like ${feels_like} °C`;
    document.querySelector(".maxt").textContent=temp_max+" °C";
    document.querySelector(".mint").textContent=temp_min+" °C";
    document.querySelector(".w-image").src=` http://openweathermap.org/img/wn/${icon}@2x.png`;
    document.querySelector(".weather").textContent=main;
    document.querySelector(".weather-desc").textContent=description;
    console.log(description);
  
    document.querySelector(".humidity").textContent=humidity+" %";
    document.querySelector(".rain").textContent=all+" %";
    document.querySelector(".wind").textContent=speed+" m/s";
    document.querySelector(".c-location").textContent=name;
    document.querySelector(".pressure").textContent=pressure+" hPa";
}

const hourlyweather = async(a,b) =>{
    const resp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${a}&lon=${b}&units=metric&appid=0c53415518b8eb2c9ab6c5c2207da3c9`);
    let data1 = await resp.json();

    return data1;

}

const hours = ({list,list:{main ,weather},}) =>{
    console.log(list[0].dt_txt);
    document.querySelector(".g1tt").textContent=list[0].main.temp+" °C";
    document.querySelector(".g2tt").textContent=list[1].main.temp+" °C";
    document.querySelector(".g3tt").textContent=list[2].main.temp+" °C";
    document.querySelector(".g4tt").textContent=list[3].main.temp+" °C";
    document.querySelector(".g5tt").textContent=list[4].main.temp+" °C";
    document.querySelector(".g1t").textContent=list[0].dt_txt.slice(10,16);
    document.querySelector(".g2t").textContent=list[1].dt_txt.slice(10,16);
    document.querySelector(".g3t").textContent=list[2].dt_txt.slice(10,16);
    document.querySelector(".g4t").textContent=list[3].dt_txt.slice(10,16);
    document.querySelector(".g5t").textContent=list[4].dt_txt.slice(10,16);
    document.querySelector(".g1d").textContent=list[0].dt_txt.slice(0,10);
    document.querySelector(".g2d").textContent=list[1].dt_txt.slice(0,10);
    document.querySelector(".g3d").textContent=list[2].dt_txt.slice(0,10);
    document.querySelector(".g4d").textContent=list[3].dt_txt.slice(0,10);
    document.querySelector(".g5d").textContent=list[4].dt_txt.slice(0,10);
    document.querySelector(".ggimage1").src=`http://openweathermap.org/img/wn/${list[0].weather[0].icon}@2x.png`;
    document.querySelector(".ggimage2").src=`http://openweathermap.org/img/wn/${list[1].weather[0].icon}@2x.png`;
    document.querySelector(".ggimage3").src=`http://openweathermap.org/img/wn/${list[2].weather[0].icon}@2x.png`;
    document.querySelector(".ggimage4").src=`http://openweathermap.org/img/wn/${list[3].weather[0].icon}@2x.png`;
    document.querySelector(".ggimage5").src=`http://openweathermap.org/img/wn/${list[4].weather[0].icon}@2x.png`;

}

function geoFindMe() {

    
    const success= async(position) =>{
      const lat  = position.coords.latitude;
      const lon = position.coords.longitude;
      let a= await currentweather(lat,lon);
      let b= await hourlyweather(lat,lon);
      update(a);
      hours(b); 
      
    }
    const error = async()=>{
      console.log('Unable to retrieve your location');
    
    }
  
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
        console.log('Locating…');
        navigator.geolocation.getCurrentPosition(success, error);
        
    }
  
  }



document.addEventListener("DOMContentLoaded", async () =>{
    let city ="delhi";
    let lon =77.2167;
    let lat =28.6667;

    let a= await currentweather(lat,lon);
    let b= await hourlyweather(lat,lon);
    update(a);
    hours(b);
   
    
    geoFindMe();
    

    
   console.log("try.js")
})
