#include <Arduino.h>
#include "Debug.h"
#include "Server.h"

#define DOWNLOAD_PERMISSION           'k'

char ReadSerial;

void setup(){

  //Connect to wifi with given SSID and Password
  Wifi_Connect(); 

  //Establish Connection with server
  Server_Connect();

  
  Serial2.write(UPDATE_NOTIFICATION);
	Serial2.write(UPDATE_NOTIFICATION); 
}

void loop()
{
  if (Serial.available())
  {
    ReadSerial = Serial.read();
    if (ReadSerial == DOWNLOAD_PERMISSION)
    {
      ReadSerial = 0;
      debugln("Downlaod Enabled");
      String FB_file = "alfa-romeo/mito/2016/version.hex";
      const char * ESP_file = "/TestStorage.hex";
      Server_Download(FB_file);
      ReadFile(ESP_file);
      Version_Recieve();
      UpdateCheck();
    }
  }
}