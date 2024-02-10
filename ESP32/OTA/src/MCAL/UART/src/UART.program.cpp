#include <Arduino.h>

#include "../include/UART_config.h"
#include "../include/UART_interface.h"


void UART_INIT2(void)
{
    Serial2.begin(BOUD_RATE, SERIAL_8N1, UART2_RX_PIN, UART2_TX_PIN);
}

void UART0_FreeBuffer(void)
{
    Serial.read();
}

void UART0_ReceiveChar(char* Data)
{
    if (Serial.available() > 0) 
    {
         *Data = Serial.read();
         Serial.read();
    }
}

void UART2_ReceiveChar(char* Data)
{
    if (Serial2.available() > 0) 
    {
         *Data = Serial2.read();
         Serial2.read();
    }
}

void UART0_TransimiteChar(char Data)
{
    Serial.write(Data);
}

void UART2_TransimiteChar(char Data)
{
    Serial2.write(Data);
}

void UART0_TransimiteString(const char *Data)
{
    Serial.println(Data);
}

void UART2_TransimiteString(const char *Data)
{
    Serial2.println(Data);
}