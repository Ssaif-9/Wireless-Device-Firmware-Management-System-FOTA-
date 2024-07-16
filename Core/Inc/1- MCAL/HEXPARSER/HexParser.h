/*
 * HexParser.h
 *
 *  Created on: Sep 11, 2023
 *      Author: adham
 */

#ifndef APP_HEXPARSER_HEXPARSER_H_
#define APP_HEXPARSER_HEXPARSER_H_
#include"3- LIB/STD_TYPES.h"
/***************************************************************/
void HexParser_vParseData(u8 A_pu8Data[]);
u8 HexParser_uint8_tAscii2Hex(u8 A_uint8_tAscii);
void HexParser_vEraseAppArea(void);

/***************************************************************/
#define FLASH_APP_START_ADDRESS			0x0800C800
#endif /* APP_HEXPARSER_HEXPARSER_H_ */
