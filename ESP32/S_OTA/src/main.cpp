#include <Arduino.h>
#include "Debug.h"
#include "FireBase.h"
#include "IOManager.h"

bool Update_Secure = true;

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
      const char * ESP_Cipher_file = "/TestStorage.hex";
      const char * ESP_Decrypted_file = "/Decrypted.hex";

      Server_Download(FB_file);
      ReadFile(ESP_Cipher_file);

      //DecryptFile(ESP_Cipher_file, ESP_Decrypted_file);
      //ReadFile(ESP_Decrypted_file);

      
      /**********************************************************/
      /*                    Check Digest                        */
      /**********************************************************/

      /*
      DigestCheck(&Update_Secure);
      if(Update_Secure)
        continue;
      else
        {
          debugln("Update Not Secure ");
          DeleteFiles();
          break;
        }
      */
      /**********************************************************/

      SendFile(ESP_Cipher_file); 
    }
  }
  UpdateCheck();
}