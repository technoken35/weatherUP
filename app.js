// ! ADD one call API one API call for all weather data you would need on one location 

var weatherDataObj={};

function kelvinToFh (temp) {
    let fhTemp= Math.round(temp * 9/5 - 459.67);
    return fhTemp;
    
}

function getData () {

    let longitude;
    let latitude;
    
    if(navigator.geolocation){
        /* navigator object which is property of window object (contains document object too)
         is an object with properties written to obtain info about browser. One of those properties is .geolocation which returns a geolocation object with user locaion 
         If statement checks if user has accepted permission
         */

         navigator.geolocation.getCurrentPosition( position => {
            /* this parameter(position) is the object containing geolocation data that gets returned from getCurrentPosition()  */
            
            longitude= position.coords.longitude;
            latitude= position.coords.latitude;

            console.log(position); /* geolocation position data  */

            const API = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=4a9721a8067a91cc5de8f90d6c9d4c16`;
            /* function for requests/responses returns a promise that is a response object */
            fetch(API)
                .then(response => {
                    /* then waits for data to return before executing. (response is arbitrary parameter for data returned from call) */
                    return response.json();

                })
                .then(data => {
                   weatherDataObj=data;
                   console.log('recieved data', weatherDataObj);
                   updateUI();
                
                })
            ;
         }); 
          
    } else {
        document.querySelector("header h1").textContent = "Broken"
    }

}

function updateUI (){

    // gotta be a more DRY way of selecting elements

    var currentConditions=  document.querySelector("header p");
    var tempHeader=  document.querySelector("header h2");
    var forecastDescriptionDay1= document.querySelector(".forecast-day-1 .conditions");
    var forecastDescriptionDay2= document.querySelector(".forecast-day-2 .conditions");
    var forecastDescriptionDay3= document.querySelector(".forecast-day-3 .conditions");
    var forecastHeaderDays1= document.querySelector(".forecast-day-1 p");
    var forecastHeaderDays2= document.querySelector(".forecast-day-2 p");
    var forecastHeaderDays3=document.querySelector(".forecast-day-3 p");
    var forecastTempDay1= document.querySelector(".forecast-day-1 .forecast-num p");
    var forecastTempDay2= document.querySelector(".forecast-day-2 .forecast-num p");
    var forecastTempDay3= document.querySelector(".forecast-day-3 .forecast-num p");
    
    
    var descriptionData=weatherDataObj.current.weather[0].description;
    var currentTemp=weatherDataObj.current.temp;
   
   
   
    var forecastTempDataDay1High= kelvinToFh(weatherDataObj.daily[1].temp.max);
    var forecastTempDataDay2High= kelvinToFh(weatherDataObj.daily[2].temp.max);
    var forecastTempDataDay3High= kelvinToFh(weatherDataObj.daily[3].temp.max);
    var forecastTempDataDay1Low= kelvinToFh(weatherDataObj.daily[1].temp.min);
    var forecastTempDataDay2Low= kelvinToFh(weatherDataObj.daily[2].temp.min);
    var forecastTempDataDay3Low= kelvinToFh(weatherDataObj.daily[3].temp.min);
    
    var forecastDescriptionDataDay1 = weatherDataObj.daily[1].weather[0].main;
    var forecastDescriptionDataDay2 = weatherDataObj.daily[2].weather[0].main;
    var forecastDescriptionDataDay3 = weatherDataObj.daily[3].weather[0].main;
   
    var daysOfWeek=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    let date = new Date();
    var day = date.getDay();
    /* Date object has method to return day of week in integer form */

    // updated UI based on var day={value} and the corresponding daysOfWeek[] index
    forecastHeaderDays1.textContent= daysOfWeek[day];
    forecastHeaderDays2.textContent=daysOfWeek[day+1];
    forecastHeaderDays3.textContent=daysOfWeek[day+2];
    

    forecastTempDay1.textContent=forecastTempDataDay1High + "°" + "/" + "°"+ forecastTempDataDay1Low;
    forecastDescriptionDay1.textContent=forecastDescriptionDataDay1;

    forecastTempDay2.textContent=forecastTempDataDay2High + "°" + "/" + "°"+ forecastTempDataDay2Low;
    forecastDescriptionDay2.textContent=forecastDescriptionDataDay2;

    forecastTempDay3.textContent=forecastTempDataDay3High + "°" + "/" + "°"+ forecastTempDataDay3Low;
    forecastDescriptionDay3.textContent=forecastDescriptionDataDay3;

    tempHeader.textContent= kelvinToFh(currentTemp);
    currentConditions.textContent=descriptionData;

    /*  unix timestamp to UTC */
    let unix_timestamp = 1596545408;
    
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
     // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2);

    console.log(formattedTime);
    
}

window.addEventListener('load',()=> {
    getData();

});

