/*
 * FOTA_ACK_MainECU.c
 *
 * Created: 25-Apr-24 4:12:47 PM
 *  Author: Seif Eldin Sultan
 */ 

#define F_CPU 16000000U
#include <avr/delay.h>
#include "../lib/STD_TYPE.h"
#include "../lib/BIT_MATH.h"

#include "../MCAL/UART/UART_config.h"
#include "../MCAL/UART/UART_interface.h"
#include "../MCAL/UART/UART_private.h"

#include "../MCAL/DIO/DIO_config.h"
#include "../MCAL/DIO/DIO_interface.h"
#include "../MCAL/DIO/DIO_private.h"

#include "../MCAL/E_INT/EXTI_config.h"
#include "../MCAL/E_INT/EXTI_interface.h"
#include "../MCAL/E_INT/EXTI_private.h"

#include "../MCAL/G_INT/GLBI_config.h"
#include "../MCAL/G_INT/GLBI_interfase.h"
#include "../MCAL/G_INT/GLBI_private.h"

void ACK_A (void);

int main(void)
{
	u8 NOTI;
	u8 Accept='y';
	u8 NotifyFlag;
	
	GLBI_Enable();
	UART_init();
	LCD_init();
	
	EXTI_Enable(EXTI_INT0,EXTI_RISING_EDGE);
	
	EXTI_SetCallBackInt0(&ACK_A);
	
    while(1)
    {
	
		UART_ReceiveChar(&NOTI);
		LCD_sendChar(NOTI);
		
		if (NOTI=='N')
		{
			UART_TransmiteChar(Accept);
			LCD_GoToLocation(1,2);
			LCD_sendChar(Accept);
		}
		
	}	  
}
void ACK_A(void)
{
	UART_TransmiteChar('A');
	LCD_sendChar('A');
}
