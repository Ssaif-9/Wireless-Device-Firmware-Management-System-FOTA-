#include <Arduino.h>

#include <Firebase_ESP_Client.h>
#include <addons/TokenHelper.h>
#include <addons/RTDBHelper.h>

#include "FIREBASE_config.h"
#include "FIREBASE_interface.h"

#include "../UART/UART_config.h"
#include "../UART/UART_interface.h"

FirebaseAuth auth;
FirebaseConfig config;

void FIREBASE_INIT(void)
{
    Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);

    /* Assign the api key (required) */
    config.api_key = API_KEY;
    config.database_url = RealTimeDataBase_BUCKET_ID;
    /* Assign the user sign in credentials */
    auth.user.email = USER_EMAIL;
    auth.user.password = USER_PASSWORD;

    config.token_status_callback = tokenStatusCallback; // see addons/TokenHelper.h

    Firebase.reconnectNetwork(true);
    //FBDO.setBSSLBufferSize(4096 /* Rx buffer size in bytes from 512 - 16384 */, 1024 /* Tx buffer size in bytes from 512 - 16384 */);

    config.fcs.download_buffer_size = 2048;

    Firebase.begin(&config, &auth);
}

void fcsDownloadCallback(FCS_DownloadStatusInfo info)
{
    if (info.status == firebase_fcs_download_status_init)
    {
        Serial.printf("Downloading file %s (%d) to %s\n", info.remoteFileName.c_str(), info.fileSize, info.localFileName.c_str());
    }
    else if (info.status == firebase_fcs_download_status_download)
    {
        Serial.printf("Downloaded %d%s, Elapsed time %d ms\n", (int)info.progress, "%", info.elapsedTime);
    }
    else if (info.status == firebase_fcs_download_status_complete)
    {
        Serial.println("Download completed\n");
    }
    else if (info.status == firebase_fcs_download_status_error)
    {
        Serial.printf("Download failed, %s\n", info.errorMsg.c_str());
    }
}

void ReadFile(const char *path) {
  Serial.printf("Reading file: %s\n", path);
  File file = LittleFS.open(path, "r");
  if (!file) {
  Serial.println("Failed to open file for reading");
  return;
  }
  Serial.print("Read from file: \n");
  while (file.available()) {Serial.write(file.read()); }
  file.close();
}

void processHexRecord(const char *record)
{
  // Assuming the record is in Intel Hex format with a colon at the beginning
  // You may want to perform additional validation depending on your requirements

  // Extract the data part of the record (excluding the colon)
  const char *data = record ;

  // Calculate the length of the data
  size_t dataLength = strlen(data);

  // Print the address and data of the record
 // Serial.printf("Address: %.*s, Data: %.*s\n", 8, data, dataLength - 8, data + 8);
  
   Serial.printf("%s\n",data);
   UART_TransimiteString2(data);
    UART_ReceiveACK0();
    UART_FreeBuffer0(); // free buffer
}

void BootloaderSendData(const char *path)
{
  File file = LittleFS.open(path, "r");

  while (file.available())
  {
    char record[128]={0}; // Adjust the size as needed
    file.readBytesUntil('\n', record, sizeof(record));

    // Process the current line (record)
    processHexRecord(record);
  }

  // Close the file after reading
  file.close();
}


bool WaitAcception(void)
{
  char Data;
  UART_ReceiveChar(&Data);
  if(Data=='T')
    return true;
  else
    return false;
}

bool readBooleanData(FirebaseData fbdo,const char *path) 
{
  bool value=false;
  if (Firebase.ready()) {
    if (Firebase.RTDB.getBool(&fbdo,path)) {
      value = fbdo.boolData();
    } else {
      Serial.println("Failed to read from database");
      Serial.println(fbdo.errorReason());
    }
  }
  return value;
}

void writeBooleanData(FirebaseData fbdo,const char *path,bool data) {
  if (Firebase.ready()) {
    if (Firebase.RTDB.setBool(&fbdo,path,data)) {
      Serial.println("Boolean data written to database");
    } else {
      Serial.println("Failed to write to database");
      Serial.println(fbdo.errorReason());
    }
  }
}