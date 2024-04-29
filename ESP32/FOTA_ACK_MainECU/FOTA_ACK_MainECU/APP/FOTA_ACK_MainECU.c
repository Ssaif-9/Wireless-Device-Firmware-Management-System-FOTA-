/*
 * FOTA_ACK_MainECU.c
 *
 * Created: 25-Apr-24 4:12:47 PM
 *  Author: Seif Eldin Sultan
 */ 


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

void ACK_a (void);
//void ACK_e (void);

int main(void)
{
	GLBI_Enable();
	UART_init();
	//LED_init(DIO_PORTC,DIO_PIN2);
	//LED_init(DIO_PORTD,DIO_PIN3);
	LCD_init();
	
	EXTI_Enable(EXTI_INT0,EXTI_RISING_EDGE);
	//EXTI_Enable(EXTI_INT2,EXTI_RISING_EDGE);
	
	EXTI_SetCallBackInt0(&ACK_a);
	//EXTI_SetCallBackInt2(&ACK_e);
	
    while(1)
    {
    
    }
}
void ACK_a (void)
{
	UART_TransmiteChar('A');
	//LED_Toggle(DIO_PORTC,DIO_PIN2);
	LCD_sendChar('A');
}

// void ACK_e (void)
// {
// 	UART_TransmiteChar('e');
// 	LED_Toggle(DIO_PORTD,DIO_PIN3);
// 	//LCD_sendChar('e');
// }