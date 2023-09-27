// http://api.weatherapi.com/v1/current.json?key=<YOUR_API_KEY>&q=London
// Remember that we want to do 3 days limit because of free trial account.


// This module handles all DOM references and stores them for access.
const _DOM = (() =>{
    const searchBarInput = document.querySelector("#searchBarInput");
    const searchBarButton = document.querySelector(".searchBarButton");
    const locationText = document.querySelector(".locationText");
    const tempText = document.querySelector(".tempText");
    const weatherImage = document.querySelector(".weatherImage");
    const todayButton = document.querySelector(".todayButton");
    const nextDayButton = document.querySelector(".nextDayButton");
    const lastDayButton = document.querySelector(".lastDayButton");

    return { searchBarInput, searchBarButton, locationText, tempText, weatherImage, 
        todayButton, nextDayButton, lastDayButton}
})();


// This module handles all weather data through an api access point called fetchData.
const weatherData = (function()
{
    // Variables
    const apiKey = "9340fab4c2cb4703b00181743231609";
    let weatherData; //Stores current data in an object for future access.

    // This async function handles fetchingg json data for the weather app.
    async function fetchWeatherData(value)
    {
        const fetchRespoonse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${value}&days=3`);
        const jsonData = await fetchRespoonse.json();

        // Assign the new fetched data to the currentWeatherData for storage
        weatherData = jsonData;

        console.log(weatherData);

        // Want to go ahead and update the "Today" weather on the app.
        fetchTodayWeather();
    }

    async function fetchTodayWeather()
    {
        let todayWeather =
        {
            city: weatherData.location.name,
            region: weatherData.location.region,
            country: weatherData.location.region,
            temp: weatherData.current.temp_f,
        }

        updateWeatherInfo(todayWeather);
    }

    async function fetchNextDayWeather()
    {
        let nextDayWeather =
        {
            city: weatherData.location.name,
            region: weatherData.location.region,
            country: weatherData.location.region,
            temp: weatherData.forecast.forecastday[1].day.avgtemp_f,
        }

        updateWeatherInfo(nextDayWeather);
    }

    async function fetchLastDayWeather()
    {
        let lastDayWeather =
        {
            city: weatherData.location.name,
            region: weatherData.location.region,
            country: weatherData.location.region,
            temp: weatherData.forecast.forecastday[2].day.avgtemp_f,
        }

        updateWeatherInfo(lastDayWeather);
    }

    // This function handles updating the weather app with new data
    async function updateWeatherInfo(data)
    {
        _DOM.locationText.textContent = `${data.city}, ${(data.region === ""? data.country: data.region)}`;
        _DOM.tempText.textContent = data.temp;

        console.log(data);
        
        // Update weather image with correct gif based on current weather
        let searchText = `${data.country} flag`; // Based on time of day
        let fetchCall = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=KPX1TkQ5mj0AZXk1pFGHKYJXWxi8ysB9&s=${searchText}`, {mode: 'cors'})
        let imageData = await fetchCall.json();
        _DOM.weatherImage.src = imageData.data.images.original.url;
    }
    

    return { fetchWeatherData, fetchTodayWeather, fetchNextDayWeather, fetchLastDayWeather}
})();

// Event listeners
_DOM.searchBarButton.addEventListener("click", function(e)
{
    weatherData.fetchWeatherData(_DOM.searchBarInput.value);
});
_DOM.todayButton.addEventListener("click", function(e)
{
    weatherData.fetchTodayWeather();
})
_DOM.nextDayButton.addEventListener("click", function(e)
{
    weatherData.fetchNextDayWeather();
});
_DOM.lastDayButton.addEventListener("click", function(e)
{
    weatherData.fetchLastDayWeather();
});



// Initilization
weatherData.fetchWeatherData(_DOM.searchBarInput.value);




