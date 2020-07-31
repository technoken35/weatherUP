//refactor api call function to be able to use same function for every call
// ! ADD one call API one API call for all weather data you would need on one location 

window.addEventListener('load',()=> {
    let longitude;
    let latitude;
    let kelvinToFh;

    if(navigator.geolocation){
        /* navigator object which is property of window object (contains document object too)
         is an object with properties written to obtain info about browser. One of those properties is .geolocation which returns a geolocation object with user locaion 
         If statement checks if user has accepted permission
         */

         navigator.geolocation.getCurrentPosition( function (position) {
            longitude= position.coords.longitude;
            /* this parameter(position) is the object that gets returned from getCurrentPosition()  */
            latitude= position.coords.latitude;

            /* console.log(position); geolocation position data  */

            const API = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=4a9721a8067a91cc5de8f90d6c9d4c16`;
            /* function for get request returns a object? */
            fetch(API)
                .then(response => {
                    /* then waits for data to return before executing. (response is arbitrary parameter for data returned from call) */
                    return response.json();

                })
                .then(data => {
                    console.log("we have data",data);

                    kelvinToFh= Math.round((data.main.temp-273.15) * 9/5 + 32); 
                    console.log(kelvinToFh);
                    /* formula to convert kelvin to fahrenheit */
                
                    document.querySelector("header h2").textContent = kelvinToFh;

                })
            
         });

    } else {
        document.querySelector("header h1").textContent = "Broken"
    }
});