// !! ADD better DATA visualization 

// !! ADD OPEN WEATHER MAP ICONS. THEY HAVE SOME FOR DAY & NIGHT 


var weatherDataObj={};
var uvIndexText= document.querySelector(".uv-index-text");
var progressBar=document.querySelector(".uv-index-progress");


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

            const API = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=minutely&appid=4a9721a8067a91cc5de8f90d6c9d4c16`;
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

    var showcaseIcon= document.querySelector("header .temp i");
    var icon1 = document.querySelector(".forecast-day-1 i");
    var icon2= document.querySelector(".forecast-day-2 i");
    var icon3= document.querySelector(".forecast-day-3 i");

    
    
    
    var descriptionData=weatherDataObj.current.weather[0].description;
    var currentDescriptionDataShort=weatherDataObj.current.weather[0].main;
    var currentTemp=Math.round(weatherDataObj.current.temp);
   
    var currentConditionsShort = weatherDataObj.current.weather[0].main;
    var uvIndexData =Math.round(weatherDataObj.current.uvi);
    var forecastTempDataDay1High= Math.round( weatherDataObj.daily[1].temp.max);
    var forecastTempDataDay2High= Math.round(weatherDataObj.daily[2].temp.max);
    var forecastTempDataDay3High= Math.round( weatherDataObj.daily[3].temp.max);
    var forecastTempDataDay1Low= Math.round( weatherDataObj.daily[1].temp.min);
    var forecastTempDataDay2Low= Math.round(weatherDataObj.daily[2].temp.min);
    var forecastTempDataDay3Low= Math.round(weatherDataObj.daily[3].temp.min);
    
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

    tempHeader.textContent= currentTemp;
    currentConditions.textContent=descriptionData;

    uvIndexText.textContent=uvIndexData; 
    console.log(weatherDataObj.current.uvi);
    setProgress(uvIndexData);
    setIcon(forecastDescriptionDataDay1,icon1);
    setIcon(forecastDescriptionDataDay2,icon2);
    setIcon(forecastDescriptionDataDay3,icon3);
    setIcon(currentDescriptionDataShort,showcaseIcon);

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

function setProgress(uvi){
    var uvi;

    var uviWidth= uvi*10;
    /* sets width based on uvi for ex 6 uvi will be 6*10= 60% */
    
    progressBar.style.width = uviWidth + "%";

    /* sets color based on uvi value */
    if(uvi>0 && uvi<=2){
        progressBar.style.background="#88D813";
        //low
    } else if (uvi >= 3 && uvi <=5){
        progressBar.style.background="#FEF200";
        //moderate

    } else if (uvi >= 6 && uvi <=7) {
        progressBar.style.background="#FF7D09";
        //high
    } else if(uvi >=8) {
        progressBar.style.background="#E82F00";
        //very high
    }

}

function setIcon(conditions, uiElement) {
    // sets fontawesome icon class based on conditions in string form
    // sets conditions to uppercase to make sure it is the same
    if (conditions.toUpperCase()=='CLEAR') {

        uiElement.classList.add("fa-sun");
    
    } else if(conditions.toUpperCase()=='RAIN') {
        /* "Thunderstorm" "Snow" "Rain" "Clouds" "Clear" "Drizzle" "Everything else"*/

        uiElement.classList.add("fa-cloud-showers-heavy");
    }

}

window.addEventListener('load',()=> {
    getData();

});

