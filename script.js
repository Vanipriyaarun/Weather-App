window.addEventListener('load',()=>{
    let long;
    let lat;
    let temperatureDescription=document.querySelector('.temperature-description');
    let temperatureDegree=document.querySelector('.temperature-degree');
    let locationTimeZone=document.querySelector('.location-timeZone');
    let locationIcon = document.querySelector('.weather-icon');
    let temperatureSection=document.querySelector(".temperature");
    let temperatureSpan=document.querySelector(".temperature span");
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long=position.coords.longitude;
            lat=position.coords.latitude;
            const api=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=01e91ebd0526ace3c0dd54b0f2b33abd`
            fetch(api)
        .then(response=>{
            return response.json();
        })
        .then(data=>{
            const {temp}=data.main;
            const {description,icon} = data.weather[0]
            let  fahrenheit=Math.floor((temp-273.15)* 9/5 + 32 );
            temperatureDegree.textContent=fahrenheit;
            temperatureDescription.textContent=description;
            locationTimeZone.textContent=`UK/${data.name}`;
            locationIcon.innerHTML = `<img src="icons/${icon}.png">`;
            let celsius=(fahrenheit-32)*(5 / 9);

            temperatureSection.addEventListener('click',()=>{
                if(temperatureSpan.textContent==="F"){
                    temperatureSpan.textContent="C";
                    temperatureDegree.textContent=Math.floor(celsius); 
                }else{
                    temperatureSpan.textContent="F"
                    temperatureDegree.textContent=fahrenheit;
                }
            })
        });
        });  
    }  
});