#include "Debug.h"
#include "Server.h"
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
//Provide the token generation process info.
#include <addons/TokenHelper.h>
#include <addons/RTDBHelper.h>

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
FirebaseJson json;

int Global_App1ServerVersion;
int Global_App1CarVersion;
//int Global_App2ServerVersion;
//int Global_App2CarVersion;
int Last_Notification;

bool taskCompleted = false;
unsigned long sendDataPrevMillis = 0;
int Version_int;
bool signupOK = false;

void Wifi_Connect(void)
{
  Serial.begin(115200);
  Serial2.begin(115200, SERIAL_8N1, RXD2, TXD2);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  debug("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    debug(".");
    delay(300);
  }
  debugln();
  debug("Connected with IP: ");
  debugln(WiFi.localIP());
  debugln();
}

void Server_Connect(void)
{
  debugf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);

  /* Assign the api key (required) */
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;

  /* Assign the user sign in credentials */
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  /*
  if (Firebase.signUp(&config, &auth, "", ""))
  {
     Serial.println("ok");
     signupOK = true;
  }

  else {
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }
*/

  /* Assign the callback function for the long running token generation task */
  
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h
   
  Firebase.reconnectWiFi(true);

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
       debugln("Download completed\n");
    }
    else if (info.status == firebase_fcs_download_status_error)
    {
        debugf("Download failed, %s\n", info.errorMsg.c_str());
    }
}

void Server_Download(String file)
{
  char test;
  if (Firebase.ready() && !taskCompleted)
  {
    taskCompleted = true;
    test = Firebase.Storage.download(&fbdo, STORAGE_BUCKET_ID /* Firebase Storage bucket id */, file /* path of remote file stored in the bucket */, "/TestStorage.hex" /* path to local file */, mem_storage_type_flash /* memory storage type, mem_storage_type_flash and mem_storage_type_sd */, fcsDownloadCallback);
    if (test == 0)
    {
      debugln("******************");
      debugln("Download Complete");
      debugln("******************");
    }
  }
}


void ReadFile(const char *path)
{
  Serial.printf("Reading file: %s\n", path);
  File file = LittleFS.open(path, "r");
  if (!file) {
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


int Version_Recieve(void)
{
  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 15000 || sendDataPrevMillis == 0))
  {
    sendDataPrevMillis = millis();
    if (Firebase.RTDB.getInt(&fbdo,"/alfa-romeo/mito/2016"))
    {
      if (fbdo.dataType() == "int")
      {
        Version_int = fbdo.intData();
        debug("Function Version = ");
        debugln(Version_int);
        return Version_int;
      }
    }
    else {
      Serial.println(fbdo.errorReason());
    }
  }
  return -1;
}



void UpdateCheck(void)
{
  debug("Global_App1CarVersion =");
  debugln(Global_App1CarVersion);
  debug("Global_App1ServerVersion =");
  debugln(Global_App1ServerVersion);
  debug("Last_Notification =");
  debugln(Last_Notification);
  debugln();

  if (Global_App1CarVersion == Global_App1ServerVersion)
	{
		Global_App1ServerVersion = Version_Recieve();             
	}
	else if (Global_App1ServerVersion > Global_App1CarVersion)
	{
		if (Last_Notification < Global_App1ServerVersion)
		{
			Serial.write(UPDATE_NOTIFICATION);
			Serial.write(UPDATE_NOTIFICATION);
			Last_Notification = Global_App1ServerVersion;          
		}
		if (Last_Notification == Global_App1ServerVersion)
		{
			Global_App1ServerVersion = Version_Recieve();
		}        
	}

  debug("Global_App1CarVersion =");
  debugln(Global_App1CarVersion);
  debug("Global_App1ServerVersion =");
  debugln(Global_App1ServerVersion);
  debug("Last_Notification =");
  debugln(Last_Notification);
}


