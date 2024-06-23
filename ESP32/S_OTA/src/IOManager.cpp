#include "Debug.h"
#include "IOManager.h"
#include "HardwareSerial.h"
#include "FireBase.h"
#include "Decryption.h"
#include "Base64.h"
#include "mbedtls/aes.h"

char Acknowledge;

void ReadFile(const char *path)
{
  debugf("Reading file: %s\n", path);
  File file = LittleFS.open(path, "r");
  if (!file) 
  {
    debugln("Failed to open file for reading");
    return;
  }
  debugln("Read from file: ");
  while (file.available())
  {
    Serial.write(file.read());
  }
  file.close();
  debugln();
}

void SendFile(const char * path)
{
  int SendSize = 0;
  debugf("Reading file: %s\r\n", "/TestStorage.hex");

  File file = LittleFS.open(path,"r");
 
  if (!file || file.isDirectory()) 
  {
    debugln("- failed to open file for reading");
    return;
  }
   
   Transmit((char)Target);
   debug("- Target ID : ");
   debugln(Target);
   delay(2000);

   Transmit(file.size());    
   debug("- Size of File: ");
   debugln(file.size());
   delay(2000);
  
  debugln("- read from file:");

  while (file.available())
  {
    char SingleByte;
    Acknowledge = '0';
    
    while (!(Serial2.available()));
    Acknowledge = Receive();                //Receive Acknowledge
      
    if(Acknowledge == 'A')
    {
      debugln("Acknowledge recieved..");
      do
    {
      SingleByte = (char)file.read();
      Transmit(SingleByte);            // Send Byte By Byte 
      SendSize++;
      debug(SingleByte);
    } while (SingleByte != '\n');

      if(SendSize==file.size())
        {break;}

        continue;
      }
      else 
      {
        debugln("Acknowledge not recieved..");
        break;
      } 
      /************************************************************************************/
      /*                          Send Record By Record                                   */
      /*
            file.readBytesUntil('\n', Record, sizeof(Record));
            Serial2.print(Record);
            debug(Record);
      */
      /************************************************************************************/
  } 
  file.close();
  debugln("File Closed,Send Done");
}



void DecryptFile(const char *Cipher_File,const char *Decrypted_File)
{
  String decoded_line = "";
  String line; 
  String decrypted_line;
  int decoded_length;

  File downloaded_file = LittleFS.open(Cipher_File);
  File decrypted_file = LittleFS.open(Decrypted_File, FILE_WRITE);
 
  while (downloaded_file.available()) 
  {  
    decoded_line = "";
    line = downloaded_file.readStringUntil('\n');
    
    decoded_length = Base64.decodedLength(const_cast<char*>(line.c_str()) , line.length());

    char decodedString[decoded_length];
    Base64.decode(decodedString, const_cast<char*>(line.c_str()), line.length());

    for (int i=0; i<=decoded_length; i++)
    {
      decoded_line += decodedString[i];
    }
    
    decrypted_line = decryptString(decoded_line);

    decrypted_line.remove(decrypted_line.indexOf('\n'));

    if ((decrypted_line.length())%16 == 0)
    {
      decrypted_line.remove(decrypted_line.length()-16);
    }
    decrypted_file.print(decrypted_line + "\n");
  }
  downloaded_file.close();
  decrypted_file.close();
}
