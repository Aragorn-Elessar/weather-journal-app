# Weather-Journal App Project

## Table of Contents

* [Overview](#Overview)
* [project-description](#project-description)
* [Getting-Started](#Getting-Started)
* [Steps](#Steps)
* [Author](#Author)
* [Credits](#Credits)

## Overview
This project require to create an asynchronous web app that uses Web API and user data to dynamically update the UI. 

## project-description

The starter project has some HTML and CSS styling. To achieve the desired functionality, it required modifying the `server.js` file and the `website/app.js` file. And using `index.html` for element references. P.S: The app is functioning correctly but looks ugly still, will add some styling at some point.

## Getting-Started

### Prerequisites

- Install [Node.js](https://nodejs.dev/download/) from official site
- Any code editor (e.g: VSCode, Atom,... etc)

### Installing

Terminal commands to start using project:

- Install express and required dependencies
```
`npm install express body-parser cors`
```
- Get a copy of the project on your machine
```
`git clone https://github.com/Aragorn-Elessar/weather-journal-app.git`
```
- Call into the directory location
```
`cd weather-journal-app`
```
- Opens code in `VSCode`
```
`code .`
```

## Steps

### Server Side Changes

- Create get/post routes
```js
// Get route
app.get('/all', (req, res) => {
    res.send(projectData);
})

// Post route
app.post('/add', (req, res) => {
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.userFeeling = req.body.feelings;
})
```

### Client Side Changes

- Assign global variables
```js
/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const units = '&units=metric';
const apiKey = '&appid=6684c2778e3d4aefc3f8ba10eafc527c';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
```

- Create event listener for a `click` on `generate` button
```js
document.getElementById('generate').addEventListener('click', performAction);
```

- Add `getWeather` function to grab weather data from the API
```js
// Get weather data
const getWeather = async (URL, zip, unit, key) => {
    console.log(URL+zip+unit+key);
    const res = await fetch(URL+zip+unit+key);
    console.log(res);

    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch (e) {
        console.log(`error: ${e}`);
    }
}
```

- Add `postData` function to post data to server
```js
// Post data passed in to server
const postData = async (url='', data = {}) => {
    await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        console.log(data);
        return;
    } catch(e) {
        console.log(`error: ${e}`);
    }
}
```

- Add `updateUI` function to update user interface with date, temperature and user feeling
```js
// Update user interface
const updateUI = async () => {
    const req = await fetch('/all');
    
    try {
        const allData = await req.json();
        console.log(allData);
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.userFeeling;
    } catch(e) {
        console.log(`error: ${e}`);
    }
}
```

- Chain the 3 functions together using `.then`
```js
// Grab zip code & feeling user entered
function performAction() {
    const zipCode = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;
    // Check if user entered a valid zip to run function chain
    if (zipCode && zipCode.length == 5) {
    getWeather(baseURL, zipCode, units, apiKey)
    .then(data => postData('/add', {
        date: newDate,
        temp: data.main.temp,
        feelings: feeling,
    }))
    .then(() => updateUI())
    } else {
        alert('Please, enter a valid zip code');
    }
}
```

## Author

[Mahmoud Gadallah](https://github.com/Aragorn-Elessar)

## Credits

A [Udacity](https://www.udacity.com) Nanodegree project, provided by [FWD](https://egfwd.com/) initiative
