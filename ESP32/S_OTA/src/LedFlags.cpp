#include "LedFlags.h"
#include <Arduino.h>
void LED_SetUP(void)
{
    pinMode(ConnectionLed, OUTPUT);
    pinMode(NotificationLed, OUTPUT);
    pinMode(AcceptionModeLed, OUTPUT);
    pinMode(RejectionModeLed, OUTPUT);

    digitalWrite(ConnectionLed, LOW);
    digitalWrite(NotificationLed, LOW);
    digitalWrite(AcceptionModeLed, LOW);
    digitalWrite(RejectionModeLed, LOW);

}


void LEDUpdateFlag(int FlagID)
{
  switch (FlagID) 
  {
    case ConnectionLoading :
      digitalWrite(ConnectionLed, HIGH);
      digitalWrite(NotificationLed, LOW);
      digitalWrite(AcceptionModeLed, LOW);
      digitalWrite(RejectionModeLed, LOW);
      break;

    case ConnectionDone  :
    case ReceiveNotification:
    case InitioalStatue:
      digitalWrite(ConnectionLed, LOW);
      digitalWrite(NotificationLed, LOW);
      digitalWrite(AcceptionModeLed, LOW);
      digitalWrite(RejectionModeLed, LOW);
      break;

    case FilesSecure :
      digitalWrite(ConnectionLed, LOW);
      digitalWrite(NotificationLed, LOW);
      digitalWrite(AcceptionModeLed, HIGH);
      digitalWrite(RejectionModeLed, LOW);
      break;

    case FilesNotSecure:
      digitalWrite(ConnectionLed, LOW);
      digitalWrite(NotificationLed, LOW);
      digitalWrite(AcceptionModeLed, LOW);
      digitalWrite(RejectionModeLed, HIGH);
      break;

    case SendNotification:
      digitalWrite(ConnectionLed, LOW);
      digitalWrite(NotificationLed, HIGH);
      digitalWrite(AcceptionModeLed, LOW);
      digitalWrite(RejectionModeLed, LOW);
      break;
    
    case StartUpdateProgress:
      digitalWrite(ConnectionLed, LOW);
      digitalWrite(NotificationLed, HIGH);
      digitalWrite(AcceptionModeLed, HIGH);
      digitalWrite(RejectionModeLed, HIGH);
      break;

      case ALLDone :
      digitalWrite(ConnectionLed, LOW);
      digitalWrite(NotificationLed, LOW);
      digitalWrite(AcceptionModeLed, LOW);
      digitalWrite(RejectionModeLed, LOW);
      delay(300);
      digitalWrite(ConnectionLed, LOW);
      digitalWrite(NotificationLed, HIGH);
      digitalWrite(AcceptionModeLed, HIGH);
      digitalWrite(RejectionModeLed, HIGH);
      delay(300);

      break;

      default:
        break;
  }
}