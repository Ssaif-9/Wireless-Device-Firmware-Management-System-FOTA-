#ifndef FIREBASE_H_
#define FIREBASE_H_

#include <Arduino.h>

//Define the WiFi credentials

//#define WIFI_SSID                      "Saif_sultan"    
//#define WIFI_PASSWORD                  "12345678s"      

#define WIFI_SSID                         "TE DATA"
#define WIFI_PASSWORD                     "S9S26#s25s1"

//#define WIFI_SSID                      "Radwa’s iPhone"    
//#define WIFI_PASSWORD                  "radwa15042001"      

//Define the API Key
#define API_KEY                         "AIzaSyByr95Y2uu7mzTcsndzJniOJNKR5Hm8LwM"
#define DATABASE_URL                    "https://fota-4ca08-default-rtdb.firebaseio.com/"

//Define the user Email and password that alreadey registerd or added in your project
#define USER_EMAIL                      "saifsoltan18@gmail.com"
#define USER_PASSWORD                   "12345678"

//Define the Firebase storage bucket ID e.g bucket-name.appspot.com
#define STORAGE_BUCKET_ID               "fota-4ca08.appspot.com"

#define BAUD_RATE                       9600
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

void Set_ErrorID(int ErrorID);

int Version_Recieve(void); 

//Function to Check Version Update (Between Server and Car)
void UpdateCheck(void);

void EEPROM_SETUP(void);
void storeinEEPROM(int address, int value);

#endif
