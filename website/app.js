/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const units = '&units=metric';
const apiKey = '&appid=6684c2778e3d4aefc3f8ba10eafc527c';

// Listen for generate btn and perform data collection
document.getElementById('generate').addEventListener('click', performAction);

// Grab zip code user entered 
function performAction() {
    const zipCode = document.getElementById('zip').value;
    // Check if user entered a valid zip
    if (zipCode && zipCode.length == 5) {
    getWeather(baseURL, zipCode, units, apiKey)
    // .then(postData(data))
    } else {
        alert('Yoink!');
    }
}

// Get weather data
const getWeather = async (URL, zip, unit, key) => {
    console.log(URL+zip+unit+key);
    const res = await fetch(URL+zip+unit+key);
    console.log(res);

    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(`error: ${error}`);
    }
}

// Post data to server
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
    } catch(error) {
        console.log(`error: ${error}`);
    }
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

console.log(newDate);