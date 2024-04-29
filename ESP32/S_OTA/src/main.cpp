#include <Arduino.h>
#include "Debug.h"
#include "Server.h"
#include "FileHandler.h"


  
char ReadSerial;

void setup()
{
  //Connect to wifi with given SSID and Password
  Wifi_Connect(); 

  //Establish Connection with server
  Server_Connect();
}

void loop()
{
  if (Serial.available())
  {
    ReadSerial = Serial.read();                     //Receive Yes to Start Update 
    if (ReadSerial == DOWNLOAD_PERMISSION)
    {
      ReadSerial = 0;
      debugln("Downlaod Enabled");

      const char * FB_file = "alfa-romeo/mito/2016/version.hex";
      const char * ESP_file = "/TestStorage.hex";

      Server_Download(FB_file);
      ReadFile(ESP_file);
     
      SendFile(ESP_file); 
    }
  }
  UpdateCheck();
}