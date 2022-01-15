**ASYNC JAVASCRIPT AND HTTP REQUESTS**

**Wanderlust**

Using fetch, async, and await, you’ll request information from the Foursquare API and OpenWeather API to create a travel website.

Before you begin, you’ll need to register for developer accounts for both of the APIs above. They’re both free.

For Foursquare, once you make an account, navigate to your Projects page, click Create New Project and give it a fitting name. Within your new project, select Generate API Key, which you’ll also need to name, then the Foursquare API will supply you with an API Key. You’ll need to save this key in main.js.

Note: You will only be able to see the Foursquare API Key once. Make sure you copy and paste it somewhere before dismissing the prompt. Should you ever lose your API key, be sure to revoke access to that key and generate a new one. All of these tasks can be completed from the Project Settings page.

For OpenWeather, follow the instructions for the How to start. When prompted, create your account, you can fill in other for the OpenWeather questions for their data collection. OpenWeather will give you an API Key, which you’ll also need to save in main.js.

You can view a live version of this project here.

Note: In this project, you will be using API Keys to authenticate the requests you make to the Foursquare and OpenWeather APIs. An API Key is your personal credential to access API resources and should never be shared. This means if you screenshot or send your code to someone for any reason, you should censor or remove your API Keys before doing so!

Tasks

Mark the tasks as complete by checking them off

**Add API Information**

1.Save the API Key you obtained from the Foursquare API to const foursquareKey.

2.Check the Foursquare documentation to see the place search API endpoint. Save the endpoint to const url.
Add a query string with a near parameter without a value. To add a query to the end of a URL, be sure to use ? followed by the first key (near) and an =. You’ll add the value of the near parameter to this URL string when you make the request itself.

3.Save the API Key you obtained from OpenWeather to const openWeatherKey.

4.Save 'api.openweathermap.org/data/2.5/weather'  to const weatherUrl.
See examples of OpenWeather API calls under ‘Examples of API calls’ on the OpenWeather documentation.

##Get Data from Foursquare

5.The following steps will guide you through constructing the getPlaces() function, which is called from executeSearch().
Turn getPlaces() into an asynchronous function that returns a Promise.

6.Inside of that function, add a const called city. Save the value from the user’s input field on the page with $input.val().

7.Add a const called urlToFetch. This string will contain the combined text of the entire request URL
the API endpoint URL
the user’s input city
a limit parameter with the number of venues you wish to return (use 10)
Each key-value parameter pair should be joined to the others with an &. For instance, to request 5 venues you would add &limit=5 after the city.

8.Still inside the getPlaces() function, add try/catch statements with empty code blocks. Then, in the catch code block, log the error to the console.

9.Above the getPlaces() function definition, you may have noticed there is an options object. This object provides additional information to the Foursquare API about the request being made.
Add a property to headers with the name Authorization. Set the value as your Foursquare API Key.

10.In the try code block, use fetch() to send a GET request to urlToFetch, passing the options object as a second argument. await the response and save it to a variable called response using the const keyword.

11.Create a conditional statement that checks if the .ok property of the response object evaluates to a truthy value.

12.Log the response to the console. In the browser window with the Wanderlust page, enter a city in the search field and submit. Make sure that you have your own browser’s JavaScript console open so that you can see the response that is logged to the console.

13.Let’s work in the if statement. To get the requested data, convert the response object to a JSON object. await the resolution of this method and save it to a variable called jsonResponse using the const keyword.
Log jsonResponse to the console. Keep in mind that you should remove the console.log() statements when you don’t need them anymore.

14.Explore the object in the console; there’s a lot of information in there. Note that the jsonResponse object has two properties: context and results. context contains the geographic coordinates associated with the place name you requested and results contains an array of 10 objects (or however many you set the limit parameter to in your request), each representing a different place.
For this project, you will only need to work with the places in the results property of jsonResponse. Below jsonResponse, save this to a variable called places. Log this variable to the console and confirm that it contains the correct information.

15.Return places as the very last line of the try code block. Open the hint to peek at the whole try block.

##Get Data from OpenWeather

16.The following steps will guide you through constructing the getForecast() function, which is called from executeSearch().
Turn getForecast() into an asynchronous function that returns a Promise. Add empty try/catch blocks inside. Log the error inside the catch block.

17.Before the try code block, create a const called urlToFetch that includes:
the base weatherUrl
the q parameter (representing the location query) with a value of the user’s input ($input.val())
and your API key as the APPID parameter
Don’t forget to join parameter key-value pairs after the API key with &.

18.Inside of the try block, await the response of calling fetch() and passing it the URL you created in a previous step. Save the response to a variable called response using the const keyword.

19.Create a conditional statement that checks the .ok property of the response object. If this evaluates to a truthy value, await the response of calling .json() on the response object. Save the resolution of this Promise to a variable called jsonResponse using the const keyword.

20.Log jsonResponse to the console. Enter a city in the browser and see what is logged! Explore the object!

21.Return jsonResponse at the bottom of the try code block. Open the hint to inspect the complete try block inside getForecast().

**Render Data From Foursquare API**

22.If you want to follow the steps and render the data with guidance, that’s great! If not, check the hint and update the renderPlaces() function provided in main.js.

23.In main.js, there’s a function called renderPlaces() that calls the .forEach() method on the $placeDivs array. This is an array of the <div>s in index.html where you will render the information returned in the response from the Foursquare API.
Towards the bottom of this function, there is a variable called placeContent. It’s an empty string for now, but you’ll be replacing it with an HTML string to render correct place information.
Start by creating a const place to represent the individual place object inside of the .forEach() callback. Save the current place at places[index] to this variable.

24.Create a const placeIcon to save the value of the object representing the place icon. This is accessible as the .icon property of the first element in the array of .categories of the place object.

25.Now, construct the full source URL for the place icon. The placeIcon has prefix and suffix fields that can be used to construct the source path. You can find more information about the icon object in the Response Fields and sample Response in the Foursquare documentation or log placeIcon to the console to inspect it.
Concatenate or combine the prefix property of placeIcon, the string 'bg_64', and the suffix, and save to a const placeImgSrc. 'bg_64' is required to fetch icons with a gray background that will show up against the background of the Wanderlust page.

26.A helper function named createPlaceHTML() has been provided to construct the HTML string to display the place information.
Pass createPlaceHTML() the place’s name, location, and image source URL and save the returned string to the placeContent variable.

27.Now it’s time to hook up your renderPlaces() function to the data fetched by getPlaces().
In the executeSearch() function towards the bottom of main.js, getPlaces() and getForecast() are already being called.
Chain a .then() method to getPlaces(). .then()‘s callback function should take a single parameter, places, and return renderPlaces(places).
Save your code, search for a location, and you should be able to see place information displayed towards the bottom of the Wanderlust page!

**Render Data from OpenWeather**

28.If you want to follow the steps and render the data with guidance, that’s great! If not, check the hint and update the renderForecast() function provided in main.js.

29.In main.js, there’s a function called renderForecast() that you will use to render the information returned from the OpenWeather API to $weatherDiv. The function receives a single parameter, forecast, which will be the jsonResponse object returned from calling getForecast().
  Within the function body, there is a variable called weatherContent, which is currently assigned to an empty string. You will replace it with an HTML string to render the weather information to the web page using another helper function that we have provided named createWeatherHTML(). Pass forecast as an argument to createWeatherHTML() and save the returned HTML string to weatherContent.

30.Time to hook up the forecast data and the render function.
  Inside executeSearch(), add a .then() method to getForecast(). .then()‘s callback function should take a single parameter, forecast, and return renderForecast(forecast).

**Complete!**

31.Congratulations! You should now be able to search for place and weather details by city and see the response on the page!
  Note: The OpenWeather API endpoint we use can take input of the form: city, state, like Baltimore, Maryland. You can read more about the OpenWeather API here.

**Challenges**

32.Great work finishing up the project! If you want more practice, try any of the following challenges:
- Fetch more than 4 places and randomize which ones are added to the page.
- Include additional information about the weather.
- Include additional information about each place from the response.
- For a particularly difficult challenge, try fetching place photos! This will require an additional request for place photos for each place, as the photo information is not returned in the initial request.
