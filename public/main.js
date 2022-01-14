// Foursquare API Info
const foursquareKey = 'fsq3M/MnY7M44SuZrq/a0aMmDtCrD0jiSrPm+d81Xl8CP/c=';
const url = 'https://api.foursquare.com/v3/places/search?near=';
const limit = '&limit=10';

// OpenWeather Info
const openWeatherKey = '4e8e3d9c4b0bdd8c7b26bf517231d3c7';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $placeDivs = [$("#place1"), $("#place2"), $("#place3"), $("#place4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: foursquareKey,
  }
};

// Add AJAX functions here:
const getPlaces = async () => {
  const city = $input.val();
  const urlToFetch = `${url}${city}${limit}`;
  try {
    const response = await fetch(urlToFetch, options);
    if(response.ok) {
      const jsonResponse = await response.json();
      const places = jsonResponse.results;
      return places;
    }

  } catch(err) {
    console.log(err);
  }
};

const getForecast = async () => {
  const city = $input.val();
  const urlToFetch = weatherUrl + '?appid=' + openWeatherKey + '&q=' + city;
  try {
    const response = await fetch(urlToFetch, {})
    if(response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    }
  } catch(err) {
    console.log(err);
  }
};


// Render functions
const renderPlaces = (places) => {
  $placeDivs.forEach(($place, index) => {
    // Add your code here:

    const placeContent = '';
    $place.append(placeContent);
  });
  $destination.append(`<h2>${places[0].location.locality}</h2>`);
};

const renderForecast = (forecast) => {
  const weatherContent = '';
  $weatherDiv.append(weatherContent);
};

const executeSearch = () => {
  $placeDivs.forEach(place => place.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getPlaces();
  getForecast();
  return false;
}

$submit.click(executeSearch);