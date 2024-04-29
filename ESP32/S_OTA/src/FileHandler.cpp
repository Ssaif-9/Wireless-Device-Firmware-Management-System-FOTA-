#include "Debug.h"
#include "FileHandler.h"
#include "HardwareSerial.h"


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


