
#ifndef LEDFLAGS_H_
#define LEDFLAGS_H_

#define ConnectionLoading      1
#define ConnectionDone         2
#define FilesSecure            3
#define FilesNotSecure         4
#define SendNotification       5
#define ReceiveNotification    6
#define StartUpdateProgress    7
#define ALLDone                8
#define InitioalStatue         9



const int ConnectionLed = 2;
const int NotificationLed=23;
const int AcceptionModeLed=18;
const int RejectionModeLed=19;

void LED_SetUP(void);

void LEDUpdateFlag(int FlagID);

#endif