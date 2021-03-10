/* Global Variables */
const baseURL = 'api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=6684c2778e3d4aefc3f8ba10eafc527c';

// Listen for generate btn and perform data collection
document.getElementById('generate').addEventListener('click', performAction);

// Grab zip code user entered 
function performAction() {
    const zipCode = document.getElementById('zip').value;
    // Check if user entered zip
    if (zipCode) {
    // Call getWeather and pass it your url credentials
    getWeather(baseURL, zipCode, apiKey)
    } else {
        alert('Yoink!');
    }
}

// Get weather data
const getWeather = async (URL, zip, key) => {
    console.log(URL+zip+key);
    const res = await fetch(URL+zip+key);

    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(`error: ${error}`);
    }
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();