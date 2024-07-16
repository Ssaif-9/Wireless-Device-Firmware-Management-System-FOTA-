/* USER CODE BEGIN Header */
/*********************************************************************************************************
 * ********************************************************************************************************
AUTHOR  : MARK AKRAM SALAH
MICRO   : STM32F103C8T6
LAYER   : APPLICATION
DRIVER  : FOTA_PROJECT
File    : MAIN.C
Version : 1.0
********************************************************************************************************
**********************************************************************************************************/




/*#####################################################################################################*/
/*#####################################################################################################*/

/*******************************************************************************************************/
/*                                      BOOTLOADER Implementations                                      */
/*******************************************************************************************************/

/*#####################################################################################################*/
/*#####################################################################################################*/





/*******************************************************************************************************/
/*                                         INCLUDES                                                    */
/*******************************************************************************************************/
#include "main.h"

/*******************************************************************************************************/
/*                                      MCAL Components                                                */
/*******************************************************************************************************/

#include "1- MCAL/08-FPEC/FPEC_interface.h"


/*******************************************************************************************************/
/*                                      HAL Components                                                */
/*******************************************************************************************************/

#include "2- HAL/06- DC Motor/DC_interface.h"

/*******************************************************************************************************/
/*******************************************************************************************************/

/*******************************************************************************************************/
/*                                      BOOTLOADER_FLAG                                                */
/*******************************************************************************************************/

#define BOOT_u8REQUESTFLAG					0x0801E000                                   //page 120 request flag
#define READ_REQUEST_FLAG					(*((volatile u16*)0x0801E000))

/*******************************************************************************************************/
/*                                      Critacal Mode                                                */
/*******************************************************************************************************/

#define Safe_Mode 'S'
#define Critical_Mode 'C'


/*******************************************************************************************************/
/*                                      CAN & Usart INSTANCE                                                   */
/*******************************************************************************************************/

CAN_HandleTypeDef hcan;

UART_HandleTypeDef huart1;


/*******************************************************************************************************/
/*                                      PRIVATE PROTOTYPE FUNCTIONS                                    */
/*******************************************************************************************************/


void SystemClock_Config(void);
static void MX_GPIO_Init(void);
static void MX_USART1_UART_Init(void);
static void MX_CAN_Init(void);


/*******************************************************************************************************/
/*******************************************************************************************************/


/*******************************************************************************************************/
/*                                      GLOBAL VARIABLES                                               */
/*******************************************************************************************************/

uint8_t rx='0';
uint8_t Mode=Safe_Mode;

CAN_RxHeaderTypeDef   RxHeader;
CAN_TxHeaderTypeDef   TxHeader;

uint32_t              TxMailbox;

uint8_t               TxData[8];
uint8_t               RxData[8];

/*******************************************************************************************************/
/*******************************************************************************************************/

/*******************************************************************************************************/
/*                                      HAL_CAN_RxFifo0MsgPendingCallback                                             */
/*-----------------------------------------------------------------------------------------------------*/
/* 1- Function Description ->  Can callback calls when APPLICATION 1 Get Update trigger  to enter bootloader mode   */
/* 2- Function Input       -> hcan								                           */
/* 3- Function Return      -> No Thing                                                                 */
/*******************************************************************************************************/

void HAL_CAN_RxFifo0MsgPendingCallback(CAN_HandleTypeDef *hcan)
{
	 HAL_CAN_GetRxMessage(hcan, CAN_RX_FIFO0, &RxHeader, RxData);

	  uint16_t Local_u16Data=0;

	  	if(RxHeader.data[0]=='u')
	  	{


	  		FPEC_voidFlashPageErase(120);
			FPEC_voidFlashWrite(BOOT_u8REQUESTFLAG,&Local_u16Data,1);
			NVIC_SystemReset();

	  	}

}




/*******************************************************************************************************/
/*                                            MAIN PROGRAM                                             */
/*******************************************************************************************************/


int main(void)
{


/*******************************************************************************************************/
/*                                      Initializations                                                */
/*******************************************************************************************************/

  HAL_Init();

  SystemClock_Config();

  MX_GPIO_Init();
  MX_USART1_UART_Init();
  MX_CAN_Init();

/*******************************************************************************************************/
/*******************************************************************************************************/



 /*******************************************************************************************************/
 /*                                      CAN_START                                                     */
 /*******************************************************************************************************/

  HAL_CAN_Start(&hcan);
  HAL_CAN_ActivateNotification(&hcan, CAN_IT_RX_FIFO0_MSG_PENDING);

/*******************************************************************************************************/
/*******************************************************************************************************/

  while (1)
  {
 /*******************************************************************************************************/
 /*                                      Receive Direction via bluetooth &Execute it                                            */
 /*******************************************************************************************************/

	  HAL_UART_Receive(&huart1, &rx, 1, HAL_MAX_DELAY);

	  switch(rx)
	  {
	  	 case 'F': backward();  Mode=Critical_Mode;  break;
	  	 case 'B': forward(); Mode=Critical_Mode;break;
	  	 case 'L': right();     Mode=Critical_Mode; break;
	  	 case 'R': left();    Mode=Critical_Mode;   break;
	     case 'S': stop();     Mode=Safe_Mode;   break;

	  }



	  HAL_GPIO_TogglePin(GPIOB, GPIO_PIN_10);

  }

}

/*******************************************************************************************************/
/*                                     SystemClock_Config                                              */
/*******************************************************************************************************/
void SystemClock_Config(void)
{
  RCC_OscInitTypeDef RCC_OscInitStruct = {0};
  RCC_ClkInitTypeDef RCC_ClkInitStruct = {0};

  RCC_OscInitStruct.OscillatorType = RCC_OSCILLATORTYPE_HSE;
  RCC_OscInitStruct.HSEState = RCC_HSE_ON;
  RCC_OscInitStruct.HSEPredivValue = RCC_HSE_PREDIV_DIV1;
  RCC_OscInitStruct.HSIState = RCC_HSI_ON;
  RCC_OscInitStruct.PLL.PLLState = RCC_PLL_ON;
  RCC_OscInitStruct.PLL.PLLSource = RCC_PLLSOURCE_HSE;
  RCC_OscInitStruct.PLL.PLLMUL = RCC_PLL_MUL9;
  if (HAL_RCC_OscConfig(&RCC_OscInitStruct) != HAL_OK)
  {
    Error_Handler();
  }

  RCC_ClkInitStruct.ClockType = RCC_CLOCKTYPE_HCLK|RCC_CLOCKTYPE_SYSCLK
                              |RCC_CLOCKTYPE_PCLK1|RCC_CLOCKTYPE_PCLK2;
  RCC_ClkInitStruct.SYSCLKSource = RCC_SYSCLKSOURCE_PLLCLK;
  RCC_ClkInitStruct.AHBCLKDivider = RCC_SYSCLK_DIV1;
  RCC_ClkInitStruct.APB1CLKDivider = RCC_HCLK_DIV2;
  RCC_ClkInitStruct.APB2CLKDivider = RCC_HCLK_DIV1;

  if (HAL_RCC_ClockConfig(&RCC_ClkInitStruct, FLASH_LATENCY_2) != HAL_OK)
  {
    Error_Handler();
  }
}

/*******************************************************************************************************/
/*                                     MX_CAN_Init                                                     */
/*******************************************************************************************************/
static void MX_CAN_Init(void)
{


  hcan.Instance = CAN1;
  hcan.Init.Prescaler = 18;
  hcan.Init.Mode = CAN_MODE_NORMAL;
  hcan.Init.SyncJumpWidth = CAN_SJW_1TQ;
  hcan.Init.TimeSeg1 = CAN_BS1_2TQ;
  hcan.Init.TimeSeg2 = CAN_BS2_1TQ;
  hcan.Init.TimeTriggeredMode = DISABLE;
  hcan.Init.AutoBusOff = DISABLE;
  hcan.Init.AutoWakeUp = DISABLE;
  hcan.Init.AutoRetransmission = DISABLE;
  hcan.Init.ReceiveFifoLocked = DISABLE;
  hcan.Init.TransmitFifoPriority = DISABLE;
  if (HAL_CAN_Init(&hcan) != HAL_OK)
  {
    Error_Handler();
  }

  CAN_FilterTypeDef canfilterconfig;

   canfilterconfig.FilterActivation = CAN_FILTER_ENABLE;
   canfilterconfig.FilterBank = 1;  // which filter bank to use from the assigned ones
   canfilterconfig.FilterFIFOAssignment = CAN_RX_FIFO0;
   canfilterconfig.FilterIdHigh = 0x38<<5;
   canfilterconfig.FilterIdLow = 0x0000;
   canfilterconfig.FilterMaskIdHigh = 0x38<<5;
   canfilterconfig.FilterMaskIdLow = 0x0000;
   canfilterconfig.FilterMode = CAN_FILTERMODE_IDMASK;
   canfilterconfig.FilterScale = CAN_FILTERSCALE_32BIT;
   canfilterconfig.SlaveStartFilterBank = 0;  // how many filters to assign to the CAN2 (slave can)

   HAL_CAN_ConfigFilter(&hcan, &canfilterconfig);


}


/*******************************************************************************************************/
/*                                     MX_USART1_UART_Init                                                    */
/*******************************************************************************************************/
static void MX_USART1_UART_Init(void)
{

  huart1.Instance = USART1;
  huart1.Init.BaudRate = 9600;
  huart1.Init.WordLength = UART_WORDLENGTH_8B;
  huart1.Init.StopBits = UART_STOPBITS_1;
  huart1.Init.Parity = UART_PARITY_NONE;
  huart1.Init.Mode = UART_MODE_TX_RX;
  huart1.Init.HwFlowCtl = UART_HWCONTROL_NONE;
  huart1.Init.OverSampling = UART_OVERSAMPLING_16;
  if (HAL_UART_Init(&huart1) != HAL_OK)
  {
    Error_Handler();
  }


}


/*******************************************************************************************************/
/*                                     MX_GPIO_Init                                                    */
/*******************************************************************************************************/
static void MX_GPIO_Init(void)
{
  GPIO_InitTypeDef GPIO_InitStruct = {0};

  /* GPIO Ports Clock Enable */
  __HAL_RCC_GPIOD_CLK_ENABLE();
  __HAL_RCC_GPIOA_CLK_ENABLE();
  __HAL_RCC_GPIOB_CLK_ENABLE();

  /*Configure GPIO pin Output Level */
  HAL_GPIO_WritePin(GPIOA, GPIO_PIN_0|GPIO_PIN_1|GPIO_PIN_2|GPIO_PIN_3
                          |GPIO_PIN_5|GPIO_PIN_6, GPIO_PIN_RESET);

  /*Configure GPIO pin Output Level */
  HAL_GPIO_WritePin(GPIOB, GPIO_PIN_10|GPIO_PIN_12|GPIO_PIN_13|GPIO_PIN_14
                          |GPIO_PIN_15, GPIO_PIN_RESET);

  /*Configure GPIO pins : PA0 PA1 PA2 PA3
                           PA5 PA6 */
  GPIO_InitStruct.Pin = GPIO_PIN_0|GPIO_PIN_1|GPIO_PIN_2|GPIO_PIN_3
                          |GPIO_PIN_5|GPIO_PIN_6;
  GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
  GPIO_InitStruct.Pull = GPIO_NOPULL;
  GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
  HAL_GPIO_Init(GPIOA, &GPIO_InitStruct);

  /*Configure GPIO pins : PB10 PB12 PB13 PB14
                           PB15 */
  GPIO_InitStruct.Pin = GPIO_PIN_10|GPIO_PIN_12|GPIO_PIN_13|GPIO_PIN_14
                          |GPIO_PIN_15;
  GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
  GPIO_InitStruct.Pull = GPIO_NOPULL;
  GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
  HAL_GPIO_Init(GPIOB, &GPIO_InitStruct);

}


void Error_Handler(void)
{
  /* USER CODE BEGIN Error_Handler_Debug */
  /* User can add his own implementation to report the HAL error return state */
  __disable_irq();
  while (1)
  {
  }
  /* USER CODE END Error_Handler_Debug */
}

#ifdef  USE_FULL_ASSERT
/**
  * @brief  Reports the name of the source file and the source line number
  *         where the assert_param error has occurred.
  * @param  file: pointer to the source file name
  * @param  line: assert_param error line source number
  * @retval None
  */
void assert_failed(uint8_t *file, uint32_t line)
{
  /* USER CODE BEGIN 6 */
  /* User can add his own implementation to report the file name and line number,
     ex: printf("Wrong parameters value: file %s on line %d\r\n", file, line) */
  /* USER CODE END 6 */
}
#endif /* USE_FULL_ASSERT */
