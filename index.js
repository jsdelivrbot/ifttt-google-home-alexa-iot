const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000

var mqttController = require('./api/mqttController')
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mqttController.connectMQTT();

// Return HTML Page
app.get('/', (req, res) => res.render('pages/index'));

// Local Home Connected Arduino Sensor Test
app.get('/api/mqtt-health-check', mqttController.mqttHealthCheck);

app.get('/api/mqtt-test-message', mqttController.testMQTTMessage);


// Internal API Test
app.get('/api/health-check', (req,res,next)=>{
  let data = {
    message:'hello world'
  };
  res.status(200).send(data);
});

// Redirect all IFTTT request to Sensors
app.post('/api/ifttt', mqttController.sendMessage);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

