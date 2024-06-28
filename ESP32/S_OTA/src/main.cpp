#include "Debug.h"
#include "LedFlags.h"
#include "FireBase.h"
#include "IOManager.h"
#include "LITTLEFS.h"
#include "mbedtls/aes.h"
#include <Base64.h>
#include <EEPROM.h>
#include"Decryption.h"

const char *FB_file = "alfa-romeo/mito/2016/version.hex";
 const char *OEM_HMACfile = "alfa-romeo/mito/2016/digest.hex";         //hmac

const char *ESP_Cipher_file = "/TestStorage.hex";
// const char * ESP_Decrypted_file = "/Decrypted.hex";
 const char *OEM_DIGEST_file = "/OEM_digest.hex";                      //hmac
const char *ESP_DIGEST_file = "/ESP_DIGEST.hex";                      //hmac

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

      Server_Download(FB_file,ESP_Cipher_file);
      //ReadFile(ESP_Cipher_file);
      
      // DecryptFile(ESP_Cipher_file, ESP_Decrypted_file);
      // ReadFile(ESP_Decrypted_file);

      /**********************************************************/
      /*                    Check Digest                        */
      /**********************************************************/

      Server_Download(OEM_HMACfile,OEM_DIGEST_file);  //hmac
      ReadFile(OEM_DIGEST_file);                      //hmac


      HMAC_File(ESP_Cipher_file,ESP_DIGEST_file);
      ReadFile(ESP_DIGEST_file);

      if(HMAC_COMPARE(ESP_DIGEST_file,OEM_DIGEST_file))
        {
          SendFile(ESP_Cipher_file);
          LEDUpdateFlag(FilesSecure);
          Set_ErrorID(ALLRight);

        }
      else
        {
          LEDUpdateFlag(FilesNotSecure);
          Set_ErrorID(FileNotSecure);
        }
      
      /**********************************************************/
    }
  }
}