#include "Debug.h"
#include "FileHandler.h"
#include "HardwareSerial.h"
#include "Decryption.h"

char Acknowledge;

void ReadFile(const char *path)
{
  Serial.printf("Reading file: %s\n", path);
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
   
   debug("- Size of File: :");
   debugln(file.size()); 
   Serial2.write(file.size());    //First Send Size Of File 
  
  debugln("- read from file:");

  while (file.available())
  {
    char SingleByte;
    Acknowledge = '0';
    
    do
    {
      SingleByte = (char)file.read();
      Serial2.write(SingleByte);            // Send Byte By Byte 
      SendSize++;
      debug(SingleByte);
      } while (SingleByte != '\n');

      if(SendSize==file.size())
        {break;}

      /************************************************************************************/
      /*                          Send Record By Record                                   */
      /*
            file.readBytesUntil('\n', Record, sizeof(Record));
            Serial2.print(Record);
            debug(Record);
      */
      /************************************************************************************/

      while (!(Serial2.available()));
      Acknowledge = Serial2.read();                //Receive Acknowledge
      
      if(Acknowledge == 'A')
      {
        debugln("Acknowledge recieved..");
        continue;
      }
      else 
      {
        debugln("Acknowledge not recieved..");
        break;
      } 
  } 
  file.close();
  debugln("File Closed,Send Done");
}


void DecryptFile(const char *Cipher_path,const char *Decrypted_path)
{
  String Chipher_line ;
  String decrypted_line;

  File Cipher_File = LittleFS.open(Cipher_path, "r");
  File Decrypted_File = LittleFS.open(Decrypted_path, "w");

  while (Cipher_File.available()) 
  {  
    Chipher_line = "";
    Chipher_line = Cipher_File.readStringUntil('\n');
    
    decrypted_line = decryptString(Chipher_line,CIPHER_KEY);

    Decrypted_File.print(decrypted_line + "\n");
  }
  Cipher_File.close();
  Decrypted_File.close();
}
