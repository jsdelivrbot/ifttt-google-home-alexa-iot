const mqtt = require('mqtt');

exports.initializeMQTT = ()=>{
    var mqttClient = mqtt.connect('mqtt://test.mosquitto.org', {
    clean:false,
    clientId:'sudhakar-home-heroku-client'
    });

    mqttClient.on("connect", (ack)=>{
        if(ack.sessionPresent) {
            console.log('connection already subscribed');
        } else {
            //console.log('subscribed');
            //exports.mqttClient.subscribe("sudhakar/home/hall/test/switch");
        }
    });
    exports.mqttClient = mqttClient;
};

exports.isConnected = ()=>{
    return exports.mqttClient.connected;
};

exports.publishMessage = (message)=>{
    exports.mqttClient.publish("sudhakar/home/hall/test/switch", JSON.stringify(message),{},anyError);
};

function anyError(message)
{
    console.log(message);
}