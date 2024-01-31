#include <Arduino.h>

#include "UART_config.h"
#include "UART_interface.h"


void UART_INIT2(void)
{
    Serial2.begin(BOUD_RATE, SERIAL_8N1, UART2_RX_PIN, UART2_TX_PIN);
}
void UART_FreeBuffer0(void)
{
    Serial.read();
}

void UART_ReceiveACK0(void)
{
    while(!Serial.available())  //wait NULL in uart0 
         {}
         UART_FreeBuffer0();
}

void UART_TransimiteString2(const char *Data)
{
    Serial2.println(Data);
}

void UART_ReceiveChar(char* Data)
{
     Serial.print("Wait Accept from HMI");
    unsigned long ms = millis();
    while (!Serial.available())
    {
        Serial.print(".");
        delay(300);
    }
    if (Serial.available() > 0) 
    {
         *Data = Serial.read();
         UART_FreeBuffer0();
    }
}

void UART_TransimiteNotification(void)
{
    Serial2.write('R');
    Serial.println("Notification send. ");
}