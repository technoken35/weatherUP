// !! ADD better DATA visualization 

// !! CHANGE ICONS WITH TIME OF DAY

// !! ICON only loads properly when you refresh page not when you toggle between light and dark

// !! SELECT ELEMENTS IN A MORE DRY WAY

// !! Add ALL methods and other properties to weatherDataObj

// !! Create better method for applying classes. EX add classes to array and pass them to a function as an arguement 

//! Moon icon in progress bar stays when changing from dark mode to light mode.


var weatherDataObj={};
var uvIndexText= document.querySelector(".uv-index-text");
var progressBar=document.querySelector(".uv-index-progress");
let date = new Date();


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

    var windSpeed= document.querySelector(".wind-speed p span");
    var windDirection= document.querySelector('.wind-direction');

    var humidity=document.querySelector(".humidity-text span");

    var sunrise=document.querySelector(".sunrise-text");
    var sunset=document.querySelector(".sunset-text");


    function formatTime(timestamp){
       
        /*  unix timestamp to UTC */
        let unix_timestamp = timestamp;
    
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        date = new Date(unix_timestamp * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();

        if (hours>12){
            // if hours are over 12 subtracts 12 to get to 12 hr format. Returns military time otherwise
            hours-= 12;
        }

         // Minutes part from the timestamp
         var minutes = "0" + date.getMinutes();

         // Will display time in 10:30 format
         var formattedTime = hours + ':' + minutes.substr(-2);

        return formattedTime;

    }


    
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

    var windSpeedData= weatherDataObj.current.wind_speed;
    var windDirectionData= weatherDataObj.current.wind_deg;

    var humidityData=weatherDataObj.current.humidity;

    var sunriseData=weatherDataObj.current.sunrise;

   /* weatherDataObj.test= function (){
        console.log("test");

        weatherDataObj.test();
   
    } */



    function getDayOfWeek(unix_timestamp) {
        var daysOfTheWeek=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        var stringDay;
        var stamp=unix_timestamp *1000; //mutiply by 1000 to convert unix_timestamp to milliseconds
        
        var getDayOfStamp = new Date(stamp); 
        /* new Date () constructor method creates a date object. Returns currrent date if no arguments are passed to it EX: Fri Aug 07 2020 17:49:42 GMT-0700 (Pacific Daylight Time) 
        when new Date() is passed a timestamp it creates a date object with the date of the time stamp EX: console.log(date); OUTPUT:  01/01/2000 @ 12:00am (UTC)

        (GMT=Greenwhich Mean Time. UTC= coordinated universal time. UTC & GMT have same meaning. Essentially UTC is new standard. GMT-0700 means 7 hours behind the universal time)
        */
        
        stringDay=daysOfTheWeek[getDayOfStamp.getDay()];
        // getDay() of date object returns the day in integer form. Possible day values are 0-6. 0=Sunday (makes values convienent for indexes in data structures!)
        
        return stringDay;
        /* returns day of week string based on the index position of daysOfWeek array which is determined by timestamp passed */

    }


    forecastHeaderDays1.textContent=getDayOfWeek(weatherDataObj.daily[1].dt); 
    forecastTempDay1.textContent=forecastTempDataDay1High + "°" + "/" + "°"+ forecastTempDataDay1Low;
    forecastDescriptionDay1.textContent=forecastDescriptionDataDay1;

    forecastHeaderDays2.textContent=getDayOfWeek(weatherDataObj.daily[2].dt);
    forecastTempDay2.textContent=forecastTempDataDay2High + "°" + "/" + "°"+ forecastTempDataDay2Low;
    forecastDescriptionDay2.textContent=forecastDescriptionDataDay2;

    forecastHeaderDays3.textContent=getDayOfWeek(weatherDataObj.daily[3].dt);
    forecastTempDay3.textContent=forecastTempDataDay3High + "°" + "/" + "°"+ forecastTempDataDay3Low;
    forecastDescriptionDay3.textContent=forecastDescriptionDataDay3;

    tempHeader.textContent= currentTemp;
    currentConditions.textContent=descriptionData;

    uvIndexText.textContent=uvIndexData; 
    console.log(weatherDataObj.current.uvi);

    windSpeed.textContent= Math.round(windSpeedData);

    humidity.textContent=humidityData;

    var sunsetData=weatherDataObj.current.sunset;

    

    sunrise.textContent=formatTime(sunriseData);
    sunset.textContent= formatTime(sunsetData);
    console.log(sunsetData);
   
    
    
    setProgressBar(uvIndexData,progressBar);
    /* sets width based on uvi for ex 6 uvi will be 6*10= 60% */
    setIcon(forecastDescriptionDataDay1,icon1);
    setIcon(forecastDescriptionDataDay2,icon2);
    setIcon(forecastDescriptionDataDay3,icon3);
    setIcon(currentDescriptionDataShort,showcaseIcon);
    setDirection(windDirectionData,windDirection);
   
    
}

var citiesSection= document.querySelector(".cities");
function addCity(event){
    //adds a new location div when user clicks
    
    //stops default action after event. Ex checkbox cant be checked. No text input into check box.
    // here it stops page from refreshing after submit button is pressed
    event.preventDefault();    

    // Create city div
    
    var cityDiv = document.createElement("div");
    //adds styling class to newly created child element
    cityDiv.classList.add("cities-selection");

    // create  paragraph for city name
    var cityName= document.createElement("p");
    cityName.innerText= document.querySelector("input").value;
    cityDiv.appendChild(cityName);
    // Create delete button
    var button= document.createElement("button");
    button.classList.add("trash-btn");
   
    // add fontawesome icon to button
    button.innerHTML="<i class='fas fa-trash fa-lg '> </i>";
    // append delete button to city card
    cityDiv.appendChild(button);

    // APPEND cities section
    citiesSection.appendChild(cityDiv);

    // clear input for next city
    document.querySelector("input").value="";
}

//function accepts an event as arguement. It is passed by event listener who called this function
function deleteCity(e) {
   
    // {event}.target method returns the html element that fired the event listener 
    var htmlElement= e.target;
  

    console.log(htmlElement);

    // checks the first class list array index of html element clicked. If it is not equal to trash then it does not delete
    if (htmlElement.classList[0]==="trash-btn"){
        // parentElement method allows you to grab an html elements parent
        var cityElement = htmlElement.parentElement;
        // remove method allows you to remove a html element (proably method of document object);
        cityElement.remove();
    }
    
}


var addLocation=document.querySelector(".location-button");

addLocation.addEventListener("click",addCity);
citiesSection.addEventListener('click',deleteCity);

function setProgressBar(uvi,progressBar){
     /* sets color & progress based on uvi value */

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        //checks for light mode/default
    
        progressBar.style.width = (uvi *10) + "%";
        /* sets width value by making string with uv index value*10. EX Uv index of 2 would produce 20%
                Javascript performs automatic type conversion
        */
        
        if(uvi >0 && uvi<=2){
            
            progressBar.style.background="#88D813";
            //low
        } else if (uvi >= 3 && uvi <=5){
           
            progressBar.style.background="#FEF200";
            //moderate
    
        } else if (uvi >= 6 && uvi <=7) {
           
            progressBar.style.background="#FF7D09";
            //high
        
        } else if(uvi >=8 && uvi <=10) {
            progressBar.style.background="#E82F00";
            //very high
        
        }  else if(uvi>10) {
            
            uvIndexText.textContent="Very High"
            progressBar.style.background="#E82F00";
            progressBar.style.width = "100%";
            document.querySelector(".uv-index-progress i").classList.add("fa-exclamation-triangle");
            //over 10, dangerous!
        }

    } else {
        //dark mode, its nightime no UV index
        progressBar.style.background="#7598BD";
        progressBar.style.width="100%";
        document.querySelector(".uv-index-progress i").classList.add("fa-moon");
        uvIndexText.textContent="";

    }

}

function setIcon(conditions, uiElement) {
    // sets fontawesome icon class based on conditions in string form

    //! refactor to include everyting for dark mode

    // sets conditions to uppercase to make sure it is the same
    if (conditions.toUpperCase()=='CLEAR') {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            uiElement.classList.add("fa-moon");
            // dark mode
        
        } else {
            uiElement.classList.add("fa-sun");
            
            console.log()
           
        
        }
        
    
    } else if(conditions.toUpperCase()=='RAIN') {
        /* "Thunderstorm" "Snow" "Rain" "Clouds" "Clear" "Drizzle" "Everything else"*/

        uiElement.classList.add("fa-cloud-showers-heavy");
        uiElement.parentElement.children[2].classList.add("cloud-blue");
    
    }else if(conditions.toUpperCase()=='CLOUDS') {
        /* "Thunderstorm" "Snow" "Rain" "Clouds" "Clear" "Drizzle" "Everything else"*/

        uiElement.classList.add("fa-cloud");
        
        // JS <html element>.parentElement method returns parent of selected html element
        // JS method <html element>.children returns the children of selected html element
        // selecting parent and then listing children
        // selecting div.forecast-num position in DOMTokenList and adding cloud-blue class to style to match conditions
        uiElement.parentElement.children[2].classList.add("cloud-blue");
    }
}

function setDirection(degrees,uiElement){
    /* Sets wind direction based on  degrees (compass) */
    if(degrees >=0 && degrees <=44) {
        uiElement.textContent='N';
    } else if (degrees >= 45 && degrees <= 89 ) {
        uiElement.textContent='NE';

    } else if (degrees >=90 && degrees <=134){
        uiElement.textContent='E';
    } else if (degrees >=135 && degrees <=179) {
        uiElement.textContent='SE';
    } else if (degrees >=180 && degrees <=224) {
        uiElement.textContent='S';
    } else if (degrees >=225 && degrees <=269) {
        uiElement.textContent='SW';
    } else if (degrees >=270 && degrees <=315) {
        uiElement.textContent='W';
    } else {
        uiElement.textContent='NW';
    }
}

window.addEventListener('load',()=> {
    getData();

});

document.querySelector(".fa-sync-alt").addEventListener('click',()=> {
    getData();
})


/* USEFUL WAYS OF USING CLASS LIST 
     add or remove multiple classes using spread syntax
    const cls = ["foo", "bar"];
    div.classList.add(...cls); 
    div.classList.remove(...cls);

    replace class "foo" with class "bar"
    div.classList.replace("foo", "bar");
V





*/