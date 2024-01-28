#ifndef UART_INTERFACE_H
#define UART_INTERFACE_H

void UART_INIT2               (void);
void UART_FreeBuffer0         (void);
void UART_ReceiveACK0         (void);
void UART_TransimiteString2   (const char *Data);

#endif // UART_INTERFACE_H