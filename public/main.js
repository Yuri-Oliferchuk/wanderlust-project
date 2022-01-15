// Foursquare API Info
const foursquareKey = 'key';
const url = 'https://api.foursquare.com/v3/places/search?sort=RATING&near=';
const limit = '&limit=30';

// OpenWeather Info
const openWeatherKey = 'key';
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
// Random function
const randomArray = (num) => {
  const arr = [];
  for(let i=0; i<num; i++) {
      arr.push(Math.floor(Math.random()*30));
  }
   arr.sort();    
   for(let i=1; i<arr.length; i++) {
       if(arr[i] == arr[i-1]) {
          arr[i] += 1;
          i--;
       }
   }
  return arr;
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
      // console.log(places);
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
      // console.log(jsonResponse);
      return jsonResponse;
    }
  } catch(err) {
    console.log(err);
  }
};

const getPhoto = async (id) => {
  const urlToFeatch = `
  https://api.foursquare.com/v3/places/${id}/photos?limit=1`;
  try {
    const response = await fetch(urlToFeatch, options)
    if(response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    }
  } catch(err) {
    console.log(err);
  }

}


// Render functions
const renderPlaces = async (places) => {
  const position = randomArray(4);
  for(let index=0; index<4; index++) {
    // Add your code here:
    const place = places[position[index]];
    const placeIcon = place.categories[0].icon;
    const photo = await getPhoto(place.fsq_id);
    const placeImgSrc = `${photo[0].prefix}200x200${photo[0].suffix}`
    if(place.location.postcode==undefined) {place.location.postcode = ""}
    const placeContent = createPlaceHTML(place.name, place.location, placeImgSrc);
    $placeDivs[index].append(placeContent);
  };
  $destination.append(`<h2>${places[0].location.locality}</h2>`);
};

const renderForecast = (forecast) => {
  const weatherContent = createWeatherHTML(forecast);
  $weatherDiv.append(weatherContent);
};

const executeSearch = () => {
  $placeDivs.forEach(place => place.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getPlaces().then(places => renderPlaces(places));
  getForecast().then(forecast => renderForecast(forecast));
  return false;
}

$submit.click(executeSearch);