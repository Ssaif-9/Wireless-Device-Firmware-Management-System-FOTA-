#include <Arduino.h>

#include "UART/UART_interface.h"
#include "WIFI/WIFI_interface.h"
#include "FIREBASE/FIREBASE_interface.h"

const char *STORAGE_BUCKET_ID = "fota-4ca08.appspot.com";


bool taskCompleted = false;

FirebaseData fbdo;
FirebaseData fbdo_RTDB_READ;
FirebaseData fbdo_RTDB_WRITE;

void setup()
{
    Serial.begin(115200);
    UART_INIT2();
    WIFI_INIT();
    FIREBASE_INIT();
    fbdo.setBSSLBufferSize(4096 /* Rx buffer size in bytes from 512 - 16384 */, 1024 /* Tx buffer size in bytes from 512 - 16384 */);
}

void loop()
{

    // Firebase.ready() should be called repeatedly to handle authentication tasks.

    if(readBooleanData(fbdo_RTDB_READ,"/BMW") == false )
    {
        Serial.println("\nNo Update Available.\n");
    }
    else
    {
        UART_TransimiteNotification();
        if (WaitAcception() == true)
        {
            if (Firebase.ready() && !taskCompleted)
         {
             taskCompleted = true;
             Serial.println("\nCheck file...\n");

             // The file systems for flash and SD/SDMMC can be changed in FirebaseFS.h.
            if (!Firebase.Storage.download(&fbdo, STORAGE_BUCKET_ID /* Firebase Storage bucket id */, "KIA/KIA.hex" /* path of remote file stored in the bucket */, "/Update.txt" /* path to local file */, mem_storage_type_flash /* memory storage type, mem_storage_type_flash and mem_storage_type_sd */, fcsDownloadCallback /* callback function */))
                 {Serial.println(fbdo.errorReason());} 
            Serial.println("update available.\n   \nDownload file...\n");
            ReadFile("/Update.txt");
            Serial.println("\n");
            BootloaderSendData("/Update.txt");
            writeBooleanData(fbdo_RTDB_WRITE, "/BMW", false);
           } 
        }
    }
}