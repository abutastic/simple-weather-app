document.addEventListener("DOMContentLoaded", function () {
  const cityInput = document.getElementById("city-input");
  const getButton = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById('description')
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "8a0a4448fdb9540fe45faef901e044a3";

  getButton.addEventListener("click", async function () {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
        const weatherData = await fetchWeather(city)
        displayWeatherData(weatherData)
    } catch (error) {
      showError();
    }
  });

  //function to fetch weather data
  async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);

    if(!response.ok){
        throw new Error('Some error occured')
    }

    const data = await response.json()

    // console.log(response);
    // console.log(data);
    

    return data
  }

  // function to display fetched data
  function displayWeatherData(data) {
    // destructuring of the data is required

    // console.log(data);

    const {name, main, weather} = data

    cityName.textContent = `Location: ${name}`
    temperature.textContent = `temperature of ${name} is: ${main.temp}`
    description.textContent = `There is ${weather[0].description} around ${name}`


    


    // unlock the weather information container(div)
    weatherInfo.classList.remove('hidden')
    errorMessage.classList.add('hidden')

  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
