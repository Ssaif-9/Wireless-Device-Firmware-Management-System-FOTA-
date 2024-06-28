#include <iostream>
#include "Arduino.h"
#include "FS.h"
#include "LITTLEFS.h"

#include<vector>
#include "Debug.h"
#include "LedFlags.h"
#include "IOManager.h"
#include "HardwareSerial.h"
#include "FireBase.h"
#include "Decryption.h"
#include "Base64.h"
#include "mbedtls/aes.h"
#include "mbedtls/md.h"

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

void DeleteFiles(const char* filePath)
{
    // Check if file exists and delete it
    if (LittleFS.exists(filePath)) 
    {
        if (LittleFS.remove(filePath)) 
        {
            debug("Deleted file: ");
            debugln(filePath);
        } 
        else 
        {
            debug("Failed to delete file: ");
            debugln(filePath);
        }
    } 
    else 
    {
        debug("File does not exist: ");
        debugln(filePath);
    }
}

void SendFile(const char * path)
{
    int SendSize = 0;
    debugf("Reading file: %s\r\n", "/TestStorage.hex");

    File file = LittleFS.open(path, "r");
 
    if (!file || file.isDirectory()) 
    {
        debugln("- failed to open file for reading");
        return;
    }

    Transmit(Target);
    debug("- Target ID : ");
    debugln(Target);
    delay(150);

    Transmit(file.size());
    debug("- Size of File: ");
    debugln(file.size());
    delay(150);

    debugln("- read from file:");

    while (file.available())
    {
        char SingleByte;
        Acknowledge = '0';
    
        while (!(Serial2.available()));

        Acknowledge = Receive();                //Receive Acknowledge
      
        if (Acknowledge == 'A')
        {
            debugln("Acknowledge received..");
            do
            {
                SingleByte = (char)file.read();
                Transmit(SingleByte);            // Send Byte By Byte 
                SendSize++;
                debug(SingleByte);
                delay(1);
            } while (SingleByte != '\n');

            if (SendSize == file.size())
            {
                LEDUpdateFlag(ALLDone);
                LEDUpdateFlag(ALLDone);
                LEDUpdateFlag(ALLDone);
                break;
            }

            continue;
        }
        else 
        {
            debugln("Acknowledge not received..");
            break;
        } 
    } 
    file.close();
    debugln("File Closed, Send Done");
}
/*
void DecryptFile(const char *Download_File, const char *OriginalCode_File)
{
    String decoded_line = "";
    String line; 
    String decrypted_line;
    int decoded_length;

    File Cipher_File = LittleFS.open(Download_File);
    File HEX_file = LittleFS.open(OriginalCode_File, FILE_WRITE);
 
    while (Cipher_File.available()) 
    {  
        decoded_line = "";
        line = Cipher_File.readStringUntil('\n');
    
        decoded_length = Base64.decodedLength(const_cast<char*>(line.c_str()), line.length());

        char decodedString[decoded_length];
        Base64.decode(decodedString, const_cast<char*>(line.c_str()), line.length());

        for (int i = 0; i <= decoded_length; i++)
        {
            decoded_line += decodedString[i];
        }
    
        decrypted_line = decryptString(decoded_line);

        decrypted_line.remove(decrypted_line.indexOf('\n'));

        if ((decrypted_line.length()) % 16 == 0)
        {
            decrypted_line.remove(decrypted_line.length() - 16);
        }
        HEX_file.print(decrypted_line + "\n");
    }
    Cipher_File.close();
    HEX_file.close();
}

*/
bool HMAC_COMPARE(const char *OEM_DigestFile, const char *TelematicUnit_DigestFile)
{
    // Open the first file for reading
    File OEM_FILE = LittleFS.open(OEM_DigestFile, "r");
    if (!OEM_FILE) 
    {
        debugln("Failed to open first file");
        return false;
    }

    // Open the second file for reading
    File ESP_FILE = LittleFS.open(TelematicUnit_DigestFile, "r");
    if (!ESP_FILE) 
    {
        debugln("Failed to open second file");
        OEM_FILE.close();
        return false;
    }

    // Compare file sizes
    if (OEM_FILE.size() != ESP_FILE.size()) 
    {
        debugln("Files have different sizes");
        OEM_FILE.close();
        ESP_FILE.close();
        return false;
    }

    // Compare file contents byte by byte
    bool filesAreEqual = true;
    while (OEM_FILE.available() && ESP_FILE.available()) 
    {
        if (OEM_FILE.read() != ESP_FILE.read()) 
        {
            filesAreEqual = false;
            break;
        }
    }

    // Close the files
    OEM_FILE.close();
    ESP_FILE.close();

    return filesAreEqual;
}
