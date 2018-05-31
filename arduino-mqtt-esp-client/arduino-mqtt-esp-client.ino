
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

// WIfi Settings
const char* ssid = "U&ME";
const char* password = "youandme";
const char* mqtt_server = "test.mosquitto.org";
const int mqtt_server_port = 1883;
const char* mqtt_topic = "sudhakar/home/hall/+/switch";
const char* mqtt_client_id = "hall-switch-relay-client";

IPAddress ip(192, 168, 1, 102);  // Desired IP Address
IPAddress gateway(192, 168, 1, 1); // set gateway to match your network
IPAddress subnet(255, 255, 255, 0);

WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);

const int ledPin = 2;

void setup() {
  Serial.begin(115200);
  delay(10);

  WiFi.config(ip, gateway, subnet);  
  WiFi.begin(ssid,password);
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println(WiFi.localIP());

  mqttClient.setServer(mqtt_server,mqtt_server_port);
  mqttClient.setCallback(mqtt_callback);

  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, 0);
}

void loop() {
  if(!mqttClient.connected()) {
      reconnect();
    }
    mqttClient.loop();
}

void mqtt_callback(char *topic, byte* payload, unsigned int length) {
  Serial.print("message received : ");
  Serial.print(topic);
  char receivedChar[length];
  for(int i=0;i<length;i++) {
    receivedChar[i] = (char)payload[i];
    // Serial.print(receivedChar[i]);
  }

  StaticJsonBuffer<200> jsonBuffer;  
  JsonObject& root = jsonBuffer.parseObject(receivedChar);

  if(root.success()) {
    const char *sensorId = root["sensorId"];
    const char *command = root["command"];
    const char *action = root["action"];
  
    Serial.println(sensorId);
    Serial.println(command);
    Serial.println(action);
  }
  else {
    Serial.println("json parseObject() failed");    
  }
  
  digitalWrite(ledPin, 1);
  delay(500);
  digitalWrite(ledPin, 0);
    
  Serial.println();
}

void reconnect() {
  while(!mqttClient.connected()) {
    Serial.println("Attempting MQTT server");
    if(mqttClient.connect(mqtt_client_id)) {
      Serial.println("Connected to MQTT server");
      mqttClient.subscribe(mqtt_topic);      
    } else {
      Serial.print("failed rc=");
      Serial.print(mqttClient.state());
      Serial.println(" try again after 5 seconds");
      delay(5000);
    }
  }  
}
