#include "Debug.h"
#include "LedFlags.h"
#include "FireBase.h"
#include "IOManager.h"
#include "LITTLEFS.h"
#include "mbedtls/aes.h"
#include <Base64.h>
#include <EEPROM.h>
#include"Decryption.h"

const char *OEM_HEX = "alfa-romeo/146/2017/image.hex";             //test
const char *OEM_HMAC = "alfa-romeo/146/2017/digest.hex";             //hmac
const char *OEM_CIPHER = "alfa-romeo/146/2017/cipher.hex";           //cipher

const char *RealtimeDatabase_UpdateInfo = "/alfa-romeo/146/2017/UpdateInfo";
const char *RealtimeDatabase_ErrorInfo = "/alfa-romeo/146/2017/ErrorInfo";

const char *OEM_HEX_file = "/OEM_HEX.hex";                       //test

const char *OEM_CIPHER_file = "/OEM_Cipher.hex";                 //cipher
const char *ESP_HEX_file = "/ESP_HEX.hex";                       //cipher

const char *OEM_DIGEST_file = "/OEM_DIGEST.hex";                 //hmac
const char *ESP_DIGEST_file = "/ESP_DIGEST.hex";                 //hmac


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
  UpdateCheck(RealtimeDatabase_UpdateInfo);

  if (Serial2.available())
  {
    ReadSerial = Receive(); // Receive Yes to Start Update
    debugln(ReadSerial);
    if (ReadSerial == DOWNLOAD_PERMISSION)
    {
      ReadSerial = '0';

      LEDUpdateFlag(ReceiveNotification);
      
      debugln("Downlaod Enabled");

      Server_Download(OEM_CIPHER,OEM_CIPHER_file);
      
      DecryptFile(OEM_CIPHER_file, ESP_HEX_file);
     // ReadFile(ESP_HEX_file);
      //SendFile(ESP_HEX_file);


      
      

      //Server_Download(OEM_HMAC,OEM_DIGEST_file);  //hmac
      //ReadFile(OEM_DIGEST_file);                      //hmac


      HMAC_File(ESP_HEX_file,ESP_DIGEST_file);
      //ReadFile(ESP_DIGEST_file);

      if(HMAC_COMPARE(ESP_DIGEST_file,OEM_DIGEST_file))
        {
          SendFile(ESP_HEX_file);
          LEDUpdateFlag(FilesSecure);
          Set_ErrorID(RealtimeDatabase_ErrorInfo,ALLRight);

        }
      else
        {
          LEDUpdateFlag(FilesNotSecure);
          Set_ErrorID(RealtimeDatabase_ErrorInfo,FileNotSecure);
        }
    }
  }
}