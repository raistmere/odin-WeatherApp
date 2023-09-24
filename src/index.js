// http://api.weatherapi.com/v1/current.json?key=<YOUR_API_KEY>&q=London
// Remember that we want to do 3 days limit.
const body = document.querySelector("body");
const apiKey = "9340fab4c2cb4703b00181743231609";


async function getData()
{
    const fetchRespoonse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=76018&days=3`);
    const jsonData = await fetchRespoonse.json();
    console.log(jsonData);
    console.log(jsonData.forecast.forecastday[0])
}

getData();

