#ifndef FILEHANDLER_H_
#define FILEHANDLER_H_

#include <Arduino.h>

//Define Firebase Data object
#include "FS.h"
#include "SPIFFS.h"
#include <LittleFS.h>

#define DOWNLOAD_PERMISSION           'k'
#define APP1_DOWNLOADED               'd'
#define APP2_DOWNLOADED               '2'
#define DIAGNOSTICS                   'D'
#define START_SEND                    's'
#define ACKN                          'a'

void SendFile(const char *path);

String getFile( const char * path);

//void DecryptFile(fs::FS &fs);
//void encryptFile(fs::FS &fs);

#endif
