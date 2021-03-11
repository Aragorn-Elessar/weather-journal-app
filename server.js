// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
port = 3000;

app.listen(port, () => console.log(`Server running on localhost: ${port}`));

// Get route
app.get('/all', sendData);

function sendData(req, res) {
    res.send(projectData);
}

// Post route
app.post('/add', (req, res) => {
    res.send('Post recieved');
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.userFeeling = req.body.feeling;
})