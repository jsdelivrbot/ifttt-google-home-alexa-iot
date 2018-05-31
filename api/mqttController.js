'use strict'
var mqttClient = require('./mqtt-client');

exports.connectMQTT = () =>{
    mqttClient.initializeMQTT();
};

exports.sendMessage = (req, res) =>{
    mqttClient.publishMessage(req.body);
    return res.status(200).send("Task Done");
};

exports.testMQTTMessage = (req, res) =>{
    var message = {
        sensorId: "switch",
        command : "power",
        action : "on"
    };
    mqttClient.publishMessage(message);
    return res.status(200).send("Test Success");
};

exports.mqttHealthCheck = (req, res) =>{
    
    if(!mqttClient.isConnected()) {
        return res.status(200).send({connected:"false"});
    }
    else {
        return res.status(200).send({connected:"true"});
    }
};

