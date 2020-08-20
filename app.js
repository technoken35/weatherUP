
// !! SELECT ELEMENTS IN A MORE DRY WAY

// !! Add ALL methods and other properties to weatherDataObj

// !! Create better method for applying classes. EX add classes to array and pass them to a function as an arguement 

//! Moon icon in progress bar stays when changing from dark mode to light mode.

// global variables that contain all city & weather data for page
var weatherDataObj={};
var cityGeoObj={}


// !! move these selectors
var uvIndexText= document.querySelector(".uv-index-text");
var progressBar=document.querySelector(".uv-index-progress");
let date = new Date();

var sunsetData;
var currentWeatherID;



function getData () {

    
    var longitude;
    var latitude;
    
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


// API call to get weather data for user selected city location
// Accepts latitude and longitude as arguments 
function getCitiesData (latitude,longitude){
    // ? remove this object, push response JSON straight to array 
    var citiesWeatherDataObj={};
    var citiesWeatherDataArr=[];
    
    // query open weather map based on latitude and longitude passed to function
    const API=  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=4a9721a8067a91cc5de8f90d6c9d4c16`;

    fetch(API)
        .then(function(response){
            // return response obect as JSON
            return response.json();
        })
        .then (function(data){
            // store data in weather object
            citiesWeatherDataObj=data;
            console.log(citiesWeatherDataObj,"results");
            
            // push object to weatherDataArr
            citiesWeatherDataArr.push(citiesWeatherDataObj);
            console.log(citiesWeatherDataArr[0].main,"lord is it you?")
            // call add city to update UI and pass selected city data in array
            addCity(citiesWeatherDataArr);
            
        })
    ;    
    
}


function updateUI (){

    // gotta be a more DRY way of selecting elements

    var currentConditions=  document.querySelector(".current-conditions");
    // one for large and one for mobile. Gotta be a better way of giving multiple elements the same content.
    var currentConditions2=  document.querySelector(".current-conditions-2");
    var tempHeader=  document.querySelector(".current-temp-showcase");
    var tempHeader2=  document.querySelector(".current-temp-showcase-2");
    var forecastDescriptionDay1= document.querySelector(".forecast-day-1 .conditions");
    var forecastDescriptionDay2= document.querySelector(".forecast-day-2 .conditions");
    var forecastDescriptionDay3= document.querySelector(".forecast-day-3 .conditions");
    var forecastHeaderDays1= document.querySelector(".forecast-day-1 p");
    var forecastHeaderDays2= document.querySelector(".forecast-day-2 p");
    var forecastHeaderDays3=document.querySelector(".forecast-day-3 p");
    var forecastTempDay1= document.querySelector(".forecast-day-1 .forecast-num p");
    var forecastTempDay2= document.querySelector(".forecast-day-2 .forecast-num p");
    var forecastTempDay3= document.querySelector(".forecast-day-3 .forecast-num p");

    var showcaseLocation=document.querySelector(".showcase-location");
    var showcaseIcon= document.querySelector(".showcase-icon");
    var showcaseIcon2= document.querySelector(".showcase-icon-2");
    var icon1 = document.querySelector(".weather-icon-1");
    var icon2= document.querySelector(".weather-icon-2");
    var icon3= document.querySelector(".weather-icon-3");

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

    
    
    var currentDescriptionData=weatherDataObj.current.weather[0].description;
    
    // captures first char index of string and sets to uppercase
    //Slices string and captures all chars except index 0 (first letter of string)
    // concatenates string 
    var currentDescription= currentDescriptionData[0].toUpperCase() + currentDescriptionData.slice(1);
    
    var currentDescriptionDataShort=weatherDataObj.current.weather[0].main;
    var currentTemp=Math.round(weatherDataObj.current.temp);
    var currentIconData=weatherDataObj.current.weather[0].icon;
   
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
    sunsetData=weatherDataObj.current.sunrise;

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
    var forecastWeatherID1= weatherDataObj.daily[1].weather[0].id;
    var forecastIconDataDay1= weatherDataObj.daily[1].weather[0].icon

    forecastHeaderDays2.textContent=getDayOfWeek(weatherDataObj.daily[2].dt);
    forecastTempDay2.textContent=forecastTempDataDay2High + "°" + "/" + "°"+ forecastTempDataDay2Low;
    forecastDescriptionDay2.textContent=forecastDescriptionDataDay2;
    var forecastWeatherID2= weatherDataObj.daily[2].weather[0].id;
    var forecastIconDataDay2= weatherDataObj.daily[2].weather[0].icon

    forecastHeaderDays3.textContent=getDayOfWeek(weatherDataObj.daily[3].dt);
    forecastTempDay3.textContent=forecastTempDataDay3High + "°" + "/" + "°"+ forecastTempDataDay3Low;
    forecastDescriptionDay3.textContent=forecastDescriptionDataDay3;
    var forecastWeatherID3= weatherDataObj.daily[3].weather[0].id;
    var forecastIconDataDay3= weatherDataObj.daily[3].weather[0].icon

    // updating showcase city with current city returned from reverse geocoding api 
    showcaseLocation.textContent=reverseGeoObj.city
    tempHeader.textContent= currentTemp;
    tempHeader2.textContent= currentTemp;
    currentConditions.textContent=currentDescription;
    currentConditions2.textContent=currentDescription;
   
    

    uvIndexText.textContent=uvIndexData; 
    console.log(weatherDataObj.current.uvi);

    windSpeed.textContent= Math.round(windSpeedData);

    humidity.textContent=humidityData;


    sunrise.textContent=formatTime(sunriseData);
    sunset.textContent= formatTime(sunsetData);
    
    
    setProgressBar(uvIndexData,progressBar);
   /* sets width based on uvi for ex 6 uvi will be 6*10= 60% */
    setIcon(icon1,forecastIconDataDay1);
    setIcon(icon2,forecastIconDataDay2);
    setIcon(icon3,forecastIconDataDay3);
    setIcon(showcaseIcon,currentIconData);
    setIcon(showcaseIcon2,currentIconData);
    console.log(showcaseIcon)
   // setIcon(forecastDescriptionDataDay2,icon2);
    //setIcon(forecastDescriptionDataDay3,icon3);
   // setIcon(currentDescriptionDataShort,showcaseIcon); 
    setDirection(windDirectionData,windDirection);
   
   console.log(weatherDataObj," ","weather data obj")

    console.log(reverseGeoObj," "," Storing returned object from function")

    
   

}

var addLocation=document.querySelector(".location-button");
addLocation.addEventListener("click",geoCode);

var citiesSection=document.querySelector(".cities")

function kelvinToFh(temp){
    var fahrenheit;
    fahrenheit= Math.round((temp - 273.15) * 9/5 + 32) ;
    return fahrenheit;
}


// optional parameter geoCoords
function addCity(weatherData){
    //adds a new location div with weather data array passed

    console.log(weatherData[0],"add city")
    console.log(cityGeoObj.results,"add city")
    console.log()
   
    // Create city card and add styling
    var cityDiv = document.createElement("div");
    //adds styling class to newly created child element
    cityDiv.classList.add("cities-selection");
    
    // creating the two main parent html elements of city card, adding styling, and appending to city card container  
    var cityAdvancedDataDiv=document.createElement("div");
    var cityMainDataDiv= document.createElement("div");
    cityMainDataDiv.classList.add("cities-main-data");
    cityAdvancedDataDiv.classList.add("cities-advanced-data");
    
    //add child elements to cities-main-data 
    var imgContainer=document.createElement("div");
     //create image wrapper
    imgContainer.classList.add("cities-icon-container");
    cityMainDataDiv.appendChild(imgContainer);
    // add icon image to image wrapper
    var imgIcon=document.createElement("img");
    imgIcon.classList.add("weather-icon-cities");
    // set Icon img src
    setIcon(imgIcon,weatherData[0].weather[0].icon);
    console.log("cities Icon")
    imgContainer.appendChild(imgIcon);
    // create p elements inside of cities-main-data
    var citiesTemp= document.createElement("p");
    citiesTemp.classList.add("cities-temp");
    // convert kelvins returned by API and returns rounded fahrenheit value
    citiesTemp.textContent=kelvinToFh(weatherData[0].main.temp);
    cityMainDataDiv.appendChild(citiesTemp);
    // city selected
    var cityName= document.createElement("p");
    cityName.classList.add("city")
    // update card with requested city name and country
    cityName.innerText= weatherData[0].name;
    cityMainDataDiv.appendChild(cityName); 

    // Create delete button
    var deleteButton= document.createElement("button");
    deleteButton.classList.add("trash-btn");
    // add fontawesome icon to button
    deleteButton.innerHTML='<i class="fas fa-times-circle"></i>';
    // append delete button 
    cityMainDataDiv.appendChild(deleteButton);
    // select delete button and listen
    deleteButton.addEventListener('click',deleteCity);  
    

    //add child elements to cities-advanced-data
    var citiesData1= document.createElement("p");
    citiesData1.classList.add("cities-data-1");
    citiesData1.textContent="Humidity"
    cityAdvancedDataDiv.appendChild(citiesData1);
    //data section 2
    var citiesData2= document.createElement("p");
    citiesData2.classList.add("cities-data-2");
    citiesData2.textContent="Northwest"
    cityAdvancedDataDiv.appendChild(citiesData2);
    //data section 3
    var citiesData3= document.createElement("p");
    citiesData3.classList.add("cities-data-3");
    citiesData1.textContent="25mph"
    cityAdvancedDataDiv.appendChild(citiesData3);


    cityDiv.appendChild(cityMainDataDiv);
    cityDiv.appendChild(cityAdvancedDataDiv);

    // APPEND  MAIN PARENT ELEMENT THAT CONTAINS ALL CITY CARDS
    citiesSection.appendChild(cityDiv);
    
    // Saving data as object
   var cityData={
        city:  weatherData[0].name,
        geoCoords: {lat:weatherData[0].coord.lat, lng:weatherData[0].coord.lon}
   }
    var inArray;
    if(localStorage.getItem("cities")!==null){
        var cities=[];
        

        cities=JSON.parse(localStorage.getItem("cities"));
        console.log(cities,"cities local storage inside add city")

        // loop through all city objects
        for (i=0; i<cities.length;i++){
        
            // data for each city is stored as an object inside cities array 
             // check if current citiies index has city property equal to city text
             // loop through each city string at current index
            if(cities[i].city !== weatherData[0].name){
                (console.log(cities[i].city," ",weatherData[0].name));
                inArray=false;
            } 
        }

        // if item is not in array saveCity
        if(inArray==false){
            saveCity(cityData);

        } else{
            console.log("duplicate no need to save city")
        }
    
    } else {
        // first city
       
        var test=true;
        if(!test){
            console.log("you not going crazy")
        }
        saveCity(cityData)
        console.log("first case test")
    }

   // saveCity(cityData);
}

    
    
   
    
    // clear input for next city
    document.querySelector("input").value="";


//function accepts an event as arguement. It is passed by event listener who called this function
function deleteCity(e) {
    // !! ADD ARE YOU SURE YOU WANT TO DELETE 
    // !! TOGGLE a grayed out effect (element.classListToggle({class})) css: transition: all 1s ease 
   
    // {event}.target method returns the html element that fired the event listener 
    var htmlElement= e.target;
  
    // checks the first class list array index of html element clicked. If it is not equal to trash then it does not delete
    if (htmlElement.classList[0]==="trash-btn"){
        console.log(htmlElement);
        // parentElement method allows you to grab an html elements parent
        // button is nested inside two html elements
        // select buttons parent
        var cityMainDataDiv = htmlElement.parentElement;
        // select main parent
        var cityDiv=cityMainDataDiv.parentElement
        // adding classlist for delete animation
        cityDiv.classList.add("fall");

        // variable with array value to store local storage city values
        var cities;
        
        /* storing the city text of current card being deleted in variable by selecting the 
        parent elements children and going to the 2nd index in
        childNodes which contains the paragraph html element that has city text */
        var cityText= cityMainDataDiv.childNodes[2].textContent;
        console.log(cityText);
        
        // get cities array from local storage and parse from JSON
       cities=JSON.parse(localStorage.getItem("cities"));

       // loop over cities array 
       // !! CHANGE TO FOR EACH LOOP
       for (i=0; i<cities.length;i++){
        
        // data for each city is stored as an object inside cities array 
         // check if current citiies index has city property equal to city text
           if(cities[i].city===cityText){

               // remove current object from array
               // start at current index, remove 1 item
               cities.splice(i,1);
           };
       }
       
       //push updated array back to local storage
       localStorage.setItem("cities",JSON.stringify(cities));
           
        // this event listener waits until the transition has ended to fire 
        // you can also set to animaionend if you have a css animation
        cityDiv.addEventListener('transitionend',function(){
            
            cityDiv.remove();
        });


    }
    
}

function saveCity(city){
    // Checks if there are any cities already stored in local storage 

    var cities;
    
    if(localStorage.getItem("cities")===null){
        //if local storage empty create empty array containing cities
        cities=[];
    } else {
        // else there are existing cities in local storage 
        //converts local storage JSON into a JS object and places existing data back into cities array
        cities=JSON.parse(localStorage.getItem("cities"));
    }

    // adds new city to the end of the city array
    cities.push(city);
    // saves key named cities with an array of city names as the value. JSON.stringify() converts JS values in JSON 
    //setItem stores data in Storage object 
    localStorage.setItem("cities",JSON.stringify(cities));

    
}

// accepts event from event listener that called this function as arguement 
// USER INPUT TO GEO COORDS
function geoCode(event) {
    // GEOCODING WITH TRUE WAY VIA RAPID API
    
    //stops default action after event. Ex checkbox cant be checked. No text input into check box.
    // here it stops page from refreshing after submit button is pressed
    event.preventDefault();

    // save user input in variable 
    var input=document.querySelector("input").value;

    var queryInput;
  

    console.log(input.length)
    // loop through user input to check each char for a space 
    for (i=0;i<input.length;i++){
        // query cannot accept space characters. All spaces are replaced "%20"
        if(input[i]===" "){
            // function to replace all matching values with another. / /g = replace all spaces globaly in string 
            queryInput=input.replace(/ /g,"%20");
        };
    }

    //concatenate query string
    fetch("https://trueway-geocoding.p.rapidapi.com/Geocode?language=en&country=US&address="+queryInput, 
    
    {
        // query parameters 
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "trueway-geocoding.p.rapidapi.com",
            "x-rapidapi-key": "dbff5aa8f8mshcffb7b6cbc1a605p183a15jsn83584005fee5"
        }
    })
    .then(function(response) {
        // return response from rapid API as JSON
        return response.json();
    })
    .then(function(data){
        // store data in object
        cityGeoObj=data;
        console.log("fresh object right of the press",cityGeoObj)
        console.log(cityGeoObj.results[0].locality)
    
        // calls getCitiesData which accepts geo coords and querys openWeatherMap
        getCitiesData(cityGeoObj.results[0].location.lat,cityGeoObj.results[0].location.lng);   

    })
    .catch(function(err) {
        console.log(err);
    });
    
   
    

}

// ! Get cities data should call add city to update UI

function getCities(){
    var cities;
    console.log("inside get cities");
    
    if(localStorage.getItem("cities")===null){
        //if local storage does not have KEY named "cities" create an empty ARRAY named cities
        cities=[];
    } else {
        // else there are exisiting values in cities key in local storage 
        //converts local storage JSON into a JS object and places existing data back into cities array
        // this works because an array is a special kind of object
        cities=JSON.parse(localStorage.getItem("cities"));
       
    }

    // loop over all values in city array
    // index is optional argument produces current index of array
    
    cities.forEach(function(city,index){
        //cities array kept in local storage
        // call geoCode to geoCode city name 
         
        getCitiesData(cities[index].geoCoords.lat, cities[index].geoCoords.lng);
        console.log("get cities is the culprit")

      
    })

}


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


 function setIcon(uiElement,iconCodeData) {
    // sets icons from open weather map API based on a icon img name inside img folder. Names are given by icon code from open weather
   

    // set icon img src based on icon code passed to function from weatherDataOBJ.
    // icons located in local img folder and are saved under the given icon code name
    var iconSrc=  "/img/open-weather-icons/"+iconCodeData+"@2x.png";
    
    // !! BETTER WAY TO SET ATTRITUBUTES LIKE IMG SRC:  imgElem.setAttribute('src', currentImage);
    // update html element 
    uiElement.src=iconSrc;
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

// EVENT LISTENER TO CHECK IF ALL DOM CONTENT HAS LOADED
// if it has get cities
window.addEventListener('DOMContentLoaded',  getCities());

document.querySelector(".fa-sync-alt").addEventListener('click',()=> {
    getData();
})

// !! STORE REVERSE GEO LOCATION FETCH IN A FUNCTION
// !! REPLACE WITH RAPID API REVERSE GEO CODE

    var latitudeReverseGeo;
    var longitudeReverseGeo;
    var reverseGeoObj={};

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){

            latitudeReverseGeo= position.coords.latitude;
            longitudeReverseGeo= position.coords.longitude;
        
            const API = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitudeReverseGeo}&longitude=${longitudeReverseGeo}&localityLanguage=en`;
            /* function for requests/responses returns a promise that is a response object */
            fetch(API)
                .then(function(response) {
                /* then waits for data to return before executing. (response is arbitrary parameter for data returned from call) 
                parse response into JSON
                */
                return response.json();

            })
                .then(function(data) {
                    reverseGeoObj=data;
                    console.log('recieved reverse geo', reverseGeoObj);
    
                })
            ;   
        })
    }



/* USEFUL WAYS OF USING CLASS LIST 
     add or remove multiple classes using spread syntax
    const cls = ["foo", "bar"];
    div.classList.add(...cls); 
    div.classList.remove(...cls);

    replace class "foo" with class "bar"
    div.classList.replace("foo", "bar");

*/