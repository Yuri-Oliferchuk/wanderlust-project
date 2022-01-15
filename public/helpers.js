const createPlaceHTML = (name, location, iconSource) => {
    return `<h2>${name}</h2>
    <img class="placeimage" src="${iconSource}"/>
    <h3>Address:</h3>
    <p>${location.address}</p>
    <p>${location.locality}, ${location.region}</p>
    <p>${location.country}, ${location.postcode}</p>`;
  }
  
  const createWeatherHTML = (currentDay) => {
    return `<h2>${weekDays[(new Date()).getDay()]}</h2>
          <h2>Temperature: ${kelvinToCelsius(currentDay.main.temp)} &deg;C</h2>
          <h2>Condition: ${currentDay.weather[0].description}</h2>
          <h2>Wind: ${currentDay.wind.speed} m/sec</h2>
        <img src="https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png" class="weathericon">`;
  }
  
  //const kelvinToFahrenheit = k => ((k - 273.15) * 9 / 5 + 32).toFixed(0);
  const kelvinToCelsius = k => (k-273.15).toFixed(0);