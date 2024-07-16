/*
 * HexParser.c
 *
 *  Created on: Sep 11, 2023
 *      Author: adham
 */
/*************************************Includes*********************************/
#include"3- LIB/STD_TYPES.h"
#include"3- LIB/BIT_MATH.h"
#include"HexParser.h"
#include"1- MCAL/08-FPEC/FPEC_interface.h"

/******************************************************************************/

#define FLASH_BASE_ADDR     0x08000000

u32 address = 0x08000000 ;
u16 DataBuffer[100] ;

void HexParser_vEraseAppArea(void)
{
	MCALFMI_vMassErase_part();
}

u8 HexParser_uint8_tAscii2Hex(u8 A_uint8_tAscii)
{
	u8 L_uint8_tHexValue = 0;

	if(A_uint8_tAscii >= '0' && A_uint8_tAscii <= '9')
	{
		L_uint8_tHexValue = A_uint8_tAscii - '0' ;
	}
	else if(A_uint8_tAscii >= 'A' && A_uint8_tAscii <='F')
	{
		L_uint8_tHexValue = A_uint8_tAscii - 55 ; // 55='A'-10
	}
	return L_uint8_tHexValue;
}


void HexParser_vParseData(u8 A_puint8_tData[])
{
	/* charachter Count variables */
	u8 CC_high, CC_low, CC ;

	/* 4 digits for conversion */
	u8 digit0,digit1,digit2,digit3 ;

	/* Address variable */


	/* 1- convert charachter count */
	CC_high = HexParser_uint8_tAscii2Hex(A_puint8_tData[1]);
	CC_low = HexParser_uint8_tAscii2Hex(A_puint8_tData[2]);
	CC = (CC_high<<4)|CC_low ;

	/* 2- convert Address */
	digit0 = HexParser_uint8_tAscii2Hex(A_puint8_tData[3]);
	digit1 = HexParser_uint8_tAscii2Hex(A_puint8_tData[4]);
	digit2 = HexParser_uint8_tAscii2Hex(A_puint8_tData[5]);
	digit3 = HexParser_uint8_tAscii2Hex(A_puint8_tData[6]);


	address &= 0xFFF0000;
	address = (FLASH_BASE_ADDR) |
			  (digit0 << 12)    |
			  (digit1 << 8 )    |
			  (digit2 << 4 )    |
			  (digit3 << 0 );

	for(u8 i=0; i<(CC/2) ; i++)
	{
		digit0 = HexParser_uint8_tAscii2Hex(A_puint8_tData[(4*i)+9]);
		digit1 = HexParser_uint8_tAscii2Hex(A_puint8_tData[(4*i)+10]);
		digit2 = HexParser_uint8_tAscii2Hex(A_puint8_tData[(4*i)+11]);
		digit3 = HexParser_uint8_tAscii2Hex(A_puint8_tData[(4*i)+12]);

		DataBuffer[i] = (digit0 << 12)    |
				        (digit1 << 8 )    |
				        (digit2 << 4 )    |
				        (digit3 << 0 );

	}

	FPEC_voidFlashWrite(address,DataBuffer, CC/2); /*Half word*/

}



