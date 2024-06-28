#ifndef IOMANAGER_H_
#define IOMANAGER_H_

#include <Arduino.h>
#include <LittleFS.h>
#include"Decryption.h"

#define DOWNLOAD_PERMISSION           'y'
#define ACKN                          'A'


//Function to Read file from ESP Memory
void ReadFile(const char *path);

//Function to Delete file from ESP Memory
void DeleteFiles(const char *filePath);

//Function to Decrypt file and save output in another file
void DecryptFile(const char *Download_File, const char *OriginalCode_File);

//Function to apply HMAC-SHA256 in file and save output in another file

//Function to compare Digests
bool HMAC_COMPARE(const char *OEM_DigestFile, const char *TelematicUnit_DigestFile);

//Function to Send file from ESP to Main ECU
void SendFile(const char *path);

#endif
