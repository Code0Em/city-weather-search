// **JAVASCRIPT TASKS**
// TASK 1: Get API key from OpenWeatherMap API and construct API url. End point will be the city name (i.e. user’s input and/or input saved to the browser). Also add parameters for units in metric.

// TASK 2: Create a function which “fetches” the city’s data from the API, when the user inputs the city and selects the search button. Within this, use an if/else statement to validate the user’s input and display an error message if the input’s blank.

// TASK 3: Create a function which displays today’s forecast for the city, and stores the city’s name to the browser.

// TASK 4: Create a function which displays the next five days’ forecast for the city.

// TASK 5: Create a function which “collects” the innerHTML of the search history buttons (i.e. so we can then check if a button for the city already exists).

// TASK 6: Create a function which creates a new search history button, if there is not one already created for the city.

// TASK 7: Create a function which retrieves the city’s name from the browser and “fetches” the city’s data from the API (i.e. so that the data is up to date), when the user selects the city’s search history button.

// TASK 8: Construct API url to call Geocoding API, “fetch” and extract the city’s geographical coordinates from this API. Use the extracted geographical coordinates to reconstruct API url from TASK 1 (i.e. to call 5 Day Forecast API); embed within existing functions.

// TASK 9: Create a function which clears any stored city names from the browser and removes any search history buttons from the page, when the user selects the clear button.


// **GLOBAL VARIABLES**
// TASK 1: Api Key.
const apiKey = "0da7a739bbb63431efc4b479cf47b78e";

// Gets today's date, using Dayjs.
const today = dayjs();

// Empty array to "collect" inner HTML of search history buttons.
let btnsText = [];

// Gets references for all of the HTML elements that we need.
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const errorMessage = document.getElementById("error");
const todaySection = document.getElementById("today");
const forecastSection = document.getElementById("forecast");
const searchHistory = document.getElementById("history");
const searchHistoryBtns = searchHistory.children;
const clearBtn = document.getElementById("clear");

// **FUNCTIONS**
// TASK 5: "Collects" inner HTML of search history buttons.
// *CREDIT: Function adapted from Xpert Learning Assistant’s (2024) answer to “how to check the text content of all child elements”.
function collectBtns() {
    // Loops through each search history button.
    for (let i = 0; i < searchHistoryBtns.length; i++) {
        // Gets the inner HTML for each button.
        const innerHTML = searchHistoryBtns[i].innerHTML;
        // Pushes the inner HTML up to array.
        btnsText.push(innerHTML);
    }
}

// TASK 6: Creates search history buttons.
function createBtn(city) {
    // Checks if array (i.e. inner HTML of search history buttons) includes user's input city (i.e. if this city already has a button, run this codeblock).
    if (btnsText.includes(city)) {
        // Gets us out of the function (i.e. returns nothing).
        return
    } else {
        // Creates a new button.
        const newBtn = document.createElement("button");
        // Sets the text of the button to the city.
        newBtn.textContent = city;
        // Adds classes to button (for Bootstrap styling and for event listener).
        newBtn.classList.add("btn", "btn-light", "cities");
        // Appends button to section element with id of history.
        searchHistory.append(newBtn);
    }
}

// TASK 4: Creates five day forecast.
function createFiveDayForecast(data) {
    // Sets the listIndex to -1 (i.e. declares a re-assignable variable called listIndex and sets this equal to -1).
    let listIndex = -1;
    // Interates five times (for five day forecast).
    for (i = 0; i < 5; i++) {
        // Gets today's date and adds one to it on each iteraion, using Dayjs' add() method.
        const newDay = today.add(i + 1, 'day');
        // Formats the new date, using Dayjs' format method.
        const newDayFormatted = newDay.format("DD/MM/YYYY");
        // Adds 8 to listIndex on each iteration.
        listIndex += 8;

        // Extracts data from the returned API data, starting at listIndex 7 (e.g. day 1 at 12.00), then 14 (e.g. day 2 at 12.00) etc (i.e. times will differ depending on when API is called, but same time on each day will be displayed).
        // Gets the day's weather icon.
        const nextIcon = data.list[listIndex].weather[0].icon;
        // Gets the day's temperature.
        const nextTemp = data.list[listIndex].main.temp;
        // Gets the day's wind speed.
        const nextWind = data.list[listIndex].wind.speed;
        // Gets the day's humidity.
        const nextHumidity = data.list[listIndex].main.humidity;

        // Displays the extracted data:
        // Sets the text content of the h2 (which is great-grandchild of the section element with id of forecast) to new date.
        // On first iteration grandchild of second child will be targeted, then third etc.
        forecastSection.children[i + 1].children[0].children[0].textContent = newDayFormatted;
        // Sets source of image (also great-grandchild) to the weather icon.
        forecastSection.children[i + 1].children[0].children[1].setAttribute("src", `https://openweathermap.org/img/wn/${nextIcon}.png`);
        // Sets text content of p elements (also great-grandchildren) to the temperature, wind and humidity.
        forecastSection.children[i + 1].children[0].children[2].textContent = "Temp: " + nextTemp + "°C";
        forecastSection.children[i + 1].children[0].children[3].textContent = "Wind: " + nextWind + "m/s";
        forecastSection.children[i + 1].children[0].children[4].textContent = "Humidity: " + nextHumidity + "%";
    }
}

// TASK 3: Creates today's forecast.
function createTodaysForecast(data) {
    // Formats today's date, using Dayjs' format method.
    const todayFormatted = today.format("DD/MM/YYYY");
    // Extracts data from the returned API data:
    // Gets the city's name.
    const city = data.city.name;
    // Gets the city's country.
    const country = data.city.country;
    // Gets today's weather icon.
    const icon = data.list[0].weather[0].icon;
    // Gets today's temperature.
    const temp = data.list[0].main.temp;
    // Gets today's wind speed.
    const wind = data.list[0].wind.speed;
    // Gets today's humidity.
    const humidity = data.list[0].main.humidity;

    // Displays the extracted data:
    // Sets the text content of the h1 (child of the section element with id of today) to the city's name, country code and today's date.
    todaySection.children[0].textContent = city + ", " + country + " (" + todayFormatted + ")";
    // Sets source of image (also child of section) to the weather icon.
    todaySection.children[1].setAttribute("src", `https://openweathermap.org/img/wn/${icon}.png`);
    // Sets text content of p elements (children of section) to the temperature, wind and humidity.
    todaySection.children[2].textContent = "Temp: " + temp + "°C";
    todaySection.children[3].textContent = "Wind: " + wind + "m/s";
    todaySection.children[4].textContent = "Humidity: " + humidity + "%";

    // Saves the city's name to the browser, setting the key name and the value to the city's name.
    localStorage.setItem(`${city}`, JSON.stringify(city));

    // Calls the function to display five day forecast
    createFiveDayForecast(data);
    // Calls function to "collect" search history buttons' inner HTML.
    collectBtns();
    // Calls function to create search history buttons.
    createBtn(city);
}

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
        } // Continues through the function.

        // TASK 8: Query URL for Geocoding API, set to return data on user's input city.
        // Gets the city's geographical coordinates for 5 Day Forecast API.
        const userQueryUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${userSearch}&limit=1&appid=${apiKey}`;
        // Runs the fetch method on the API query URL.
        fetch(userQueryUrl)
            // Waits for the data to be returned (and then runs codeblock).
            .then(function (response) {
                // Formats the returned data into a usable form, using json method.
                return response.json();
            })
            // Waits for the data to be formatted (and then runs codeblock).
            .then(function (data) {
                // TASK 1: Query URL for the API, , set to return data on user's input city (using geo coordinates).
                const userCoordsQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=${apiKey}`

                // Runs fetch on the API query URL.
                fetch(userCoordsQueryUrl)
                    // Waits (and then runs codeblock).
                    .then(function (response) {
                        // Formats the returned data.
                        return response.json();
                    })
                    // Waits (and then runs codeblock).
                    .then(function (data) {
                        // Calls the function to display today's forecast.
                        createTodaysForecast(data);
                    });
            });
    }
});

// TASK 7: Listens for a click event on the search history buttons (using event delegation) and calls function.
searchHistory.addEventListener("click", function (e) {
    // Checks if the element that's been clicked on has class of cities (i.e. if it's a search history button, run this codeblock).
    if (e.target.matches(".cities")) {
        // Declares city variable and sets this equal to inner HTML of the button (so that this can be passed as key name).
        const city = e.target.innerHTML;
        // Gets the city from the browser (as per project brief).
        const savedCity = JSON.parse(localStorage.getItem(`${city}`));

        // TASK 8: Query URL for Geocoding API, set to return data on saved city.
        // Gets the city's geographical coordinates for 5 Day Forecast API.
        const historyQueryUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${savedCity}&appid=${apiKey}`;
        // Runs the fetch method on the API query URL.
        fetch(historyQueryUrl)
            // Waits for the data to be returned (and then runs codeblock).
            .then(function (response) {
                // Formats the returned data into a usable form, using json method.
                return response.json();
            })
            // Waits for the data to be formatted (and then runs codeblock).
            .then(function (data) {
                // TASK 1: Query URL for the API, , set to return data on saved city (using geo coordinates).
                const historyCoordsQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=${apiKey}`

                // Runs fetch on the API query URL.
                fetch(historyCoordsQueryUrl)
                    // Waits (and then runs codeblock).
                    .then(function (response) {
                        // Formats the returned data.
                        return response.json();
                    })
                    // Waits (and then runs codeblock).
                    .then(function (data) {
                        // Calls the function to display today's forecast.
                        createTodaysForecast(data);
                    });
            });
    }
});

// TASK 9: Listens for a click event on the clear history button and calls function.
clearBtn.addEventListener("click", function () {
    // Clears any saved cities from the browser, using clear method.
    localStorage.clear();
    // "Empties" btnText array (so that future cities will be saved again).
    btnsText = [];
    console.log(btnsText);
    // Removes all search history buttons (inc clear button) (by setting the inner HTML of search history section to an empty string).
    searchHistory.innerHTML = '';
    // Appends clear button (i.e. adds this back).
    searchHistory.appendChild(clearBtn);
});

//**CREDITS**
// The following sources built upon the developer’s existing knowledge of the methods etc used throughout the build:

// MDN Web Docs (2023) The Thematic Break (Horizontal Rule) Element (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr).

// W3Schools (no date) JavaScript Promises (https://www.w3schools.com/js/js_promise.asp).

// Xpert Learning Assistant (2024) (accessed via Virtual Learning Environment).