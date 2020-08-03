//refactor api call function to be able to use same function for every call
// ! ADD one call API one API call for all weather data you would need on one location 

var weatherDataObj={};

var currentConditions=  document.querySelector("header p");
var tempHeader=  document.querySelector("header h2");
var daysOfWeek=["Monday","Tuesday","Wednesday","Thursday","Friday"];

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
                
                })
            ;
         }); 
          
    } else {
        document.querySelector("header h1").textContent = "Broken"
    }

}

const getDay = () => {
    var date = new Date();
    var day = date.getDay()
    console.log(day +"day nigga");
}

getDay();

window.addEventListener('load',()=> {
    getData();
    
    setTimeout(() => {
        console.log(weatherDataObj, "Async Object")
        var descriptionData=weatherDataObj.current.weather[0].description;
        let kelvinToFh;

        kelvinToFh= Math.round((weatherDataObj.current.temp-273.15) * 9/5 + 32);
         /* formula to convert kelvin to fahrenheit */

        tempHeader.textContent= kelvinToFh;
        currentConditions.textContent=descriptionData;

        
    }, 5000);

});