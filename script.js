document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "8a0a4448fdb9540fe45faef901e044a3"; // environment variables (will be taught later on)

  getWeatherBtn.addEventListener("click", async () => {
    let city = cityInput.value.trim();
    if (!city) return; // empty string is considered as false value

    // it may throw an error
    //server/database is always is in different continent

    try {
      const weatherData = await fetchWeather(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeather(city) {
    //gets the weather data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    // console.log(typeof response);
    // console.log(`RESPONSE`, response);

    if (!response.ok) {
      throw new Error(" City not found");
    }

    const data = await response.json();
    return data;
  }

  function displayWeatherData(weatherData) {
    // display's the weather data it got from fetch request
    console.log(weatherData);
    const {name, main, weather} = weatherData
    cityNameDisplay.textContent = `City/Location: ${name}`
    temperature.textContent = `temperature: ${main.temp}`
    description.textContent = `description: ${weather[0].description}`

    // unlock the display

    weatherInfo.classList.remove('hidden')
    errorMessage.classList.add('hidden')
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
