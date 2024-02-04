#ifndef UART_INTERFACE_H
#define UART_INTERFACE_H

void UART_INIT2                    (void);
void UART_FreeBuffer0              (void);
void UART_ReceiveACK0              (void);
void UART_TransimiteString2        (const char *Data);

void UART_ReceiveChar              (char *Data);
void UART_TransimiteNotification   (void);

#endif // UART_INTERFACE_H