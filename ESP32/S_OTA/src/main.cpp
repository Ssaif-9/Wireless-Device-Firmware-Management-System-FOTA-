#include "Debug.h"
#include "LedFlags.h"
#include "FireBase.h"
#include "IOManager.h"
#include <LittleFS.h>
#include "mbedtls/aes.h"
#include <Base64.h>
#include <EEPROM.h>

bool Update_Secure = true;

char ReadSerial='0';

void setup()
{
  LED_SetUP();

  //Connect to wifi with given SSID and Password
  Wifi_Connect(); 

  //Establish Connection with server
  Server_Connect();

  EEPROM_SETUP();
}

void loop()
{
  UpdateCheck();

  if (Serial2.available())
  {
    ReadSerial = Receive(); // Receive Yes to Start Update
    debugln(ReadSerial);
    if (ReadSerial == DOWNLOAD_PERMISSION)
    {
      ReadSerial = '0';

      LEDUpdateFlag(ReceiveNotification);
      
      debugln("Downlaod Enabled");

      const char *FB_file = "alfa-romeo/mito/2016/version.hex";
      const char *ESP_Cipher_file = "/TestStorage.hex";
      // const char * ESP_Decrypted_file = "/Decrypted.hex";

      Server_Download(FB_file);
      // ReadFile(ESP_Cipher_file);

      // DecryptFile(ESP_Cipher_file, ESP_Decrypted_file);
      // ReadFile(ESP_Decrypted_file);

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
}