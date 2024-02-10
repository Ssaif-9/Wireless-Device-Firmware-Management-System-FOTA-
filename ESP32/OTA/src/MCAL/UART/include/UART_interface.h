#ifndef UART_INTERFACE_H
#define UART_INTERFACE_H

void UART_INIT2                    (void);

void UART0_FreeBuffer              (void);

void UART0_ReceiveChar             (char *Data);
void UART2_ReceiveChar             (char *Data);

void UART0_TransimiteChar          (char Data);
void UART2_TransimiteChar          (char Data);

void UART0_TransimiteString       (const char *Data);
void UART2_TransimiteString       (const char *Data);





#endif // UART_INTERFACE_H