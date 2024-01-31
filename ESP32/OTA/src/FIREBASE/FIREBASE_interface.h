#ifndef FIREBASE_INTERFACE_H
#define FIREBASE_INTERFACE_H

#include <Firebase_ESP_Client.h>

void FIREBASE_INIT        (void);
void fcsDownloadCallback  (FCS_DownloadStatusInfo info);
void ReadFile             (const char *path);
void BootloaderSendData   (const char *path);
void processHexRecord     (const char *record);

bool readBooleanData      (FirebaseData fbdo, const char *path);
void writeBooleanData     (FirebaseData fbdo, const char *path, bool data);

bool WaitAcception        (void);

#endif // FIREBASE_INTERFACE_H