var pahoClient = require('paho-mqtt');

var mqtt = {};
exports.initializeMQTT = ()=>{
    mqtt = new Paho.MQTT.Client("192.168.1.15", 9001,"webClient");    
    mqtt.onConnectionLost = onConnectionLost;    
    mqtt.onMessageArrived = onMessageArrived;
    mqtt.connect({onSuccess:onConnect});
};



