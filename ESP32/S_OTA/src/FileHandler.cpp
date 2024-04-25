#include "Debug.h"
#include "FileHandler.h"
#include "HardwareSerial.h"



char ackn = 'A';

String getFile(const char * path) {

    File file = LittleFS.open(path,"r");

    String output = "";

    for (int j = 0; j < file.size(); j++)
    {
        output += (char)file.read();
  }

  Serial2.write(APP1_DOWNLOADED);
  Serial.write(APP1_DOWNLOADED);
  Serial2.println(file.size());
  Serial.println(file.size()); 

  return output;
}

void SendFile(const char * path)
{
  char FileByte;
  char FileBytes[8];
  int i;
  debugf("Reading file: %s\r\n", "/TestStorage.hex");

  File file = LittleFS.open(path,"r");
 
  if (!file || file.isDirectory()) {
    debugln("- failed to open file for reading");
    return;
  }
   
  debugln("- read from file:");
 while (file.available())
  {  
      i=0;
      ackn = '0' ;
      
      do
      {
        FileByte = file.read();
        Serial2.write(FileByte);
        Serial.write(FileByte);
      }while (FileByte != '\n');
      
      while (!(Serial2.available()));
      ackn = Serial2.read();
      //debugln(ackn);
      //debugln("waiting for ackn: ");
      if(ackn == 'a')
      {
        //debugln("ackn recieved..");
        continue;
      }
      else 
        break;
  } 
  file.close();
}


