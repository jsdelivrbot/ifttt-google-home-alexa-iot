'use strict'
//var pahoClient = require('paho-mqtt');

exports.sendMessage = (req, res) =>{

    let response = {
        message : "message sent"
    };
    return res.status(200).send(response);
};

exports.mqttHealthCheck = (req, res) =>{

    let response = {
        message : "message sent"
    };
    return res.status(200).send(response);
};

