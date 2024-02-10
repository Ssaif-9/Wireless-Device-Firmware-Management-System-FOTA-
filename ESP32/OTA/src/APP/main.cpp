#include <Arduino.h>

#include "../MCAL/UART/include/UART_interface.h"
#include "../HAL/WIFI/include/WIFI_interface.h"
#include "../HAL/FIREBASE/include/FIREBASE_interface.h"

bool WaitReply     (void);
bool ReceiveReply  (char *Reply);

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
    char HMI_REPLY;

    // Firebase.ready() should be called repeatedly to handle authentication tasks.

    if(readBooleanData(fbdo_RTDB_READ,"/KIA/777/2020") == false )
    {
        Serial.println("\nNo Update Available.\n");
    }
    else
    {
        UART0_TransimiteChar('N'); // Send Notification to HMI
        UART0_FreeBuffer();
        Serial.println("Notification send. ");

        if (ReceiveReply(&HMI_REPLY) == true)
        {
            if (Firebase.ready() && !taskCompleted)
         {
             taskCompleted = true;
             Serial.println("\nCheck file...\n");

             // The file systems for flash and SD/SDMMC can be changed in FirebaseFS.h.
            if (!Firebase.Storage.download(&fbdo, STORAGE_BUCKET_ID /* Firebase Storage bucket id */, "KIA/777/2020/version.hex" /* path of remote file stored in the bucket */, "/Update.txt" /* path to local file */, mem_storage_type_flash /* memory storage type, mem_storage_type_flash and mem_storage_type_sd */, fcsDownloadCallback /* callback function */))
                 {Serial.println(fbdo.errorReason());} 
            Serial.println("update available.\n   \nDownload file...\n");
            ReadFile("/Update.txt");
            Serial.println("\n");
            BootloaderSendData("/Update.txt");
            writeBooleanData(fbdo_RTDB_WRITE, "/KIA/777/2020", false);
            Serial.println("All Updated!!\n");
           } 
        }
        else
        {
            writeBooleanData(fbdo_RTDB_WRITE, "/KIA/777/2020", false);
        }
    }
}

bool ReceiveReply(char *Reply)
{
    bool Value = false;

    Serial.print("Wait Accept from HMI");
    unsigned long ms = millis();
    while (!Serial.available()){
        Serial.print(".");
        delay(300);
        }

    UART0_ReceiveChar(Reply);
    switch (*Reply)
    {
    case 'A':
        Serial.println("Accept Update!!\n");
        Value =true;
        break;

    case 'W':
        Serial.println("Not Now !!\n");
        Value=WaitReply();
        break;

    case 'I':
        Serial.println("Ignore Update!!\n");
        Value= false;
        break;
    
    default:
        break;
    }
    UART0_FreeBuffer();
    return Value;
}

bool WaitReply(void)
{
    char W_Reply;
    bool W_Value = false;

    Serial.print("\nWait Accept from HMI");
    unsigned long ms = millis();
    while (!Serial.available()){
        Serial.print(".");
        delay(300);
        }

    UART0_ReceiveChar(&W_Reply);
    switch (W_Reply)
    {
    case 'A':
        Serial.println("Accept Update!!\n");
        W_Value= true;
        break;
    case 'I':
        Serial.println("Ignore Update!!\n");
        W_Value= false;
        break;
    
    default:
        break;
    }
    UART0_FreeBuffer();
    return W_Value;
}