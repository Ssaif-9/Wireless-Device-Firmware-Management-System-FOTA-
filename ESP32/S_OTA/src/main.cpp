#include "Debug.h"
#include "LedFlags.h"
#include "FireBase.h"
#include "IOManager.h"
#include "LITTLEFS.h"
#include "mbedtls/aes.h"
#include <Base64.h>
#include <EEPROM.h>
#include"Decryption.h"

const char *OEM_HEX    = "bmw/x6/2017/image.hex";           //test
const char *OEM_HMAC   = "bmw/x6/2017/digest.hex";          //hmac
const char *OEM_CIPHER = "bmw/x6/2017/cipher.hex";           //cipher

const char *RealtimeDatabase_UpdateInfo = "/bmw/x6/2017/UpdateInfo";
const char *RealtimeDatabase_ErrorInfo = "/bmw/x6/2017/ErrorInfo";

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
      delay(2000);

      debugln("Downlaod Enabled");

      Server_Download(OEM_CIPHER,OEM_CIPHER_file); //Download Cipher File 
      
      DecryptFile(OEM_CIPHER_file, ESP_HEX_file);  //Apply Cryptography Algotithm (AES-128)
     
      Server_Download(OEM_HMAC,OEM_DIGEST_file);  //Download OEM Digest 
      
      HMAC_File(ESP_HEX_file,ESP_DIGEST_file);    //Applt HMAC-SHA256 Algorithm

      if(HMAC_COMPARE(ESP_DIGEST_file,OEM_DIGEST_file))  // Check Secure Boot 
        {          
          LEDUpdateFlag(FilesSecure);
          delay(2000);
          SendFile(ESP_HEX_file);
          Set_ErrorID(RealtimeDatabase_ErrorInfo,ALLRight);
        }
      else
        {
          LEDUpdateFlag(FilesNotSecure);
          delay(2000);
          Set_ErrorID(RealtimeDatabase_ErrorInfo,FileNotSecure);
        }
    }
  }
}