
#include "Debug.h"
#include "FireBase.h"
#include <WiFi.h>
#include <Firebase_ESP_Client.h>

#include <addons/TokenHelper.h>
#include <addons/RTDBHelper.h>


FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
FirebaseJson json;

static int Version;
int Target;

int Global_App1ServerVersion;
int Global_App1CarVersion;
int Last_APP1Notification;

int Global_App2ServerVersion;
int Global_App2CarVersion;
int Last_APP2Notification;

bool taskCompleted = false;
unsigned long sendDataPrevMillis = 0;


String UpdateInfo;

bool signupOK = false;

void Wifi_Connect(void)
{
  pinMode(ledPin, OUTPUT);

  Serial.begin(BAUD_RATE);
  Serial2.begin(BAUD_RATE, SERIAL_8N1, RXD2, TXD2);

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
  
  if (Firebase.signUp(&config, &auth, "", ""))
  {
     debugln("ok");
     signupOK = true;
  }
  else 
  {
    debugf("%s\n", config.signer.signupError.message.c_str());
  }


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

void Server_Download(const char *file)
{
  if (Firebase.ready() && !taskCompleted)
  {
    taskCompleted = true;
    if (Firebase.Storage.download(&fbdo, STORAGE_BUCKET_ID /* Firebase Storage bucket id */, file /* path of remote file stored in the bucket */, "/TestStorage.hex" /* path to local file */, mem_storage_type_flash /* memory storage type, mem_storage_type_flash and mem_storage_type_sd */,fcsDownloadCallback))
    {
      debugln("******************");
      debugln("Download Complete");
      debugln("******************");
    }
  }
}


int Version_Recieve(void)
{
  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 15000 || sendDataPrevMillis == 0))
  {
    sendDataPrevMillis = millis();
    if (Firebase.RTDB.getString(&fbdo,"/alfa-romeo/mito/2016"))
    {
      if (fbdo.dataType() == "String")
      {
        UpdateInfo = fbdo.stringData();


        int targetLength = 3;
        int versionLength = 3;

    String target = "";
    for (int i = 0; i < targetLength; ++i) 
    {
        target += UpdateInfo[i]; // Append characters to target string
    }

    String version = "";
    for (int i = targetLength; i < targetLength + versionLength; ++i) {
       version += UpdateInfo[i]; // Append characters to version string
    }

    Target = atoi(target.c_str());
    Version = atoi(version.c_str());

 
        debug("Target ECU : ");
        debugln(Target);
        debug("Function Version = ");
        debugln(Version);
        return Version;
      }
    }
    else 
    {
      debugln(fbdo.errorReason());
    }
  }
}

void UpdateCheck(void)
{
  if(1==Target)
  {
    if (Global_App1CarVersion == Global_App1ServerVersion)
	{
		Global_App1ServerVersion = Version_Recieve();             
	}
	else if (Global_App1ServerVersion > Global_App1CarVersion)
	{
		if (Last_APP1Notification < Global_App1ServerVersion)
		{
			Transmit(UPDATE_NOTIFICATION);
      debugln(UPDATE_NOTIFICATION);
      digitalWrite(ledPin, HIGH);
      Last_APP1Notification = Global_App1ServerVersion;
    }
		if (Last_APP1Notification == Global_App1ServerVersion)
		{
			Global_App1ServerVersion = Version_Recieve();
		}        
	}
  }
  else if (2==Target)
  {
     if (Global_App2CarVersion == Global_App2ServerVersion)
	{
		Global_App2ServerVersion = Version_Recieve();             
	}
	else if (Global_App2ServerVersion > Global_App2CarVersion)
	{
		if (Last_APP2Notification < Global_App2ServerVersion)
		{
			Transmit(UPDATE_NOTIFICATION);
      debugln(UPDATE_NOTIFICATION);
      digitalWrite(ledPin, HIGH);
      Last_APP2Notification = Global_App2ServerVersion;
    }
		if (Last_APP2Notification == Global_App2ServerVersion)
		{
			Global_App2ServerVersion = Version_Recieve();
		}        
	}

  }
  else 
  {
    debugln("Target not valid");
    Version_Recieve();
  }
}


