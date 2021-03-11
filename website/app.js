/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const units = '&units=metric';
const apiKey = '&appid=6684c2778e3d4aefc3f8ba10eafc527c';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Listen for generate btn and perform data collection
document.getElementById('generate').addEventListener('click', performAction);

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