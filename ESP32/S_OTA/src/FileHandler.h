#ifndef FILEHANDLER_H_
#define FILEHANDLER_H_

#include <Arduino.h>
#include <LittleFS.h>

#define DOWNLOAD_PERMISSION           'k'
#define APP1_DOWNLOADED               'd'
#define START_SEND                    's'
#define ACKN                          'A'


//Function to Read file from ESP Memory
void ReadFile(const char *path);

//Function to Decrypt file
void DecryptFile(const char *Cipher_path, const char *Decrypted_path);

//Function to Send file from ESP to Main ECU
void SendFile(const char *path);

#endif
