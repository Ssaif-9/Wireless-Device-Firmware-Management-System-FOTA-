#ifndef FIREBASE_H_
#define FIREBASE_H_

#include <Arduino.h>

//Define the WiFi credentials

#define WIFI_SSID                      ""    
#define WIFI_PASSWORD                  ""      


//Define the API Key
#define API_KEY                         ""
#define DATABASE_URL                    ""

//Define the user Email and password that alreadey registerd or added in your project
#define USER_EMAIL                      ""
#define USER_PASSWORD                   ""

//Define the Firebase storage bucket ID e.g bucket-name.appspot.com
#define STORAGE_BUCKET_ID               ""

#define BAUD_RATE                       115200
#define RXD2                            16
#define TXD2                            17

#define UPDATE_NOTIFICATION             'N'

extern int Target;



#define EEPROM_SIZE 64 

#define lastApp1Address  0  // Address for Last_APP1Notification in EEPROM
#define lastApp2Address  4  // Address for Last_APP2Notification in EEPROM

//Error List 
#define ALLRight                       0
#define FileNotSecure                  1


//Function to connect to Wifi
void Wifi_Connect(void);

//Function to establish connection with server
void Server_Connect(void);

//Function to download file from server
void Server_Download(const char *file, const char *ESP_File);

void Set_ErrorID(const char *RTDB_Path, int ErrorID);

int Version_Recieve(const char *RTDB_Path);

//Function to Check Version Update (Between Server and Car)
void UpdateCheck(const char *RTDB_Path);

void EEPROM_SETUP(void);

void storeinEEPROM(int address, int value);

#endif
