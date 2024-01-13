// **JAVASCRIPT TASKS**
// TASK 1: Get API key from OpenWeatherMap API and construct API url. End point will be the city name (i.e. user’s input and/or input saved to the browser). Also add parameters for units in metric.

// TASK 2: Create a function which “fetches” the city’s data from the API, when the user inputs the city and selects the search button. Within this, use an if/else statement to validate the user’s input and display an error message if the input’s blank.

// TASK 3: Create a function which displays today’s forecast for the city, and stores the city’s name to the browser.

// TASK 4: Create a function which displays the next five days’ forecast for the city.

// TASK 5: Create a function which “collects” the innerHTML of the search history buttons (i.e. so we can then check if a button for the city already exists).

// TASK 6: Create a function which creates a new search history button, if there is not one already created for the city.

// TASK 6: Create a function which retrieves the city’s name from the browser and “fetches” the city’s data from the API (i.e. so that the data is up to date), when the user selects the city’s search history button.

// TASK 7: Create a function which clears any stored city names from the browser and removes any search history buttons from the page, when the user selects the clear button.

// **GLOBAL VARIABLES**

// TASK 1: Api Key.
const apiKey = "0da7a739bbb63431efc4b479cf47b78e";

// Gets references for all of the HTML elements that we need.
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const errorMessage = document.getElementById("error");

// !TO BE MOVED
// TASK 1: Query URL for the API (returning saved city).
const historyQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${savedCity}&units=metric&appid=${apiKey}`

// **EVENT LISTENERS**
// TASK 2: Listens for a click event on the search button and calls function.
searchBtn.addEventListener("click", function (e) {
    // Prevents the default behaviour (i.e. reloading the page).
    e.preventDefault();
    // Gets what the user's inputted into the search input (i.e. the value of input element).
    const userSearch = searchInput.value;
    // Validates the search input by checking it's not empty (i.e. if the length of the value is zero, run this codeblock).
    if (userSearch.length == 0) {
        // Displays error message (i.e. sets the inner HTML of the p element).
        errorMessage.innerHTML = "Please enter a city."
        // If the search input isn't empty, run this codeblock:
    } else {
        // Checks if there's an error message already displayed (i.e. if the inner HTML of p doesn't equal zero, run this codeblock).
        if (errorMessage.innerHTML.length !== 0) {
            // Removes the existing error message (i.e. sets inner HTML of p to empty string).
            errorMessage.innerHTML = " ";
        } // Continues through the function

        // TASK 1: Query URL for the API (returning user's input).
        const userQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${userSearch}&units=metric&appid=${apiKey}`
        // Runs the fetch method on the API query URL.
        fetch(userQueryUrl)
            .then(function (response) {
                // Formats the returned data into a usable form, using json method.
                return response.json();
            })
            // Waits for the data to be formatted.
            .then(function (data) {
                // Calls the function to display today's forecast.
                createTodaysForecast(data);
            });
    }
});