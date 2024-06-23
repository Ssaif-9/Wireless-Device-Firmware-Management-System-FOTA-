#ifndef IOMANAGER_H_
#define IOMANAGER_H_

#include <Arduino.h>
#include <LittleFS.h>
#include"Decryption.h"

#define DOWNLOAD_PERMISSION           'y'
#define ACKN                          'A'


//Function to Read file from ESP Memory
void ReadFile(const char *path);

//Function to Decrypt file
void DecryptFile(const char *Cipher_File,const char *Decrypted_File);

//Function to Send file from ESP to Main ECU
void SendFile(const char *path);

#endif
