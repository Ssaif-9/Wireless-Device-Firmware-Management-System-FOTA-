################################################################################
# Automatically-generated file. Do not edit!
# Toolchain: GNU Tools for STM32 (12.3.rel1)
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../Core/Inc/1-\ MCAL/HEXPARSER/HexParser.c 

OBJS += \
./Core/Inc/1-\ MCAL/HEXPARSER/HexParser.o 

C_DEPS += \
./Core/Inc/1-\ MCAL/HEXPARSER/HexParser.d 


# Each subdirectory must supply rules for building sources it contributes
Core/Inc/1-\ MCAL/HEXPARSER/HexParser.o: ../Core/Inc/1-\ MCAL/HEXPARSER/HexParser.c Core/Inc/1-\ MCAL/HEXPARSER/subdir.mk
	arm-none-eabi-gcc "$<" -mcpu=cortex-m3 -std=gnu11 -g3 -DDEBUG -DUSE_HAL_DRIVER -DSTM32F103xB -c -I../Core/Inc -I../Drivers/STM32F1xx_HAL_Driver/Inc/Legacy -I../Drivers/STM32F1xx_HAL_Driver/Inc -I../Drivers/CMSIS/Device/ST/STM32F1xx/Include -I../Drivers/CMSIS/Include -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -fcyclomatic-complexity -MMD -MP -MF"Core/Inc/1- MCAL/HEXPARSER/HexParser.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"

clean: clean-Core-2f-Inc-2f-1-2d--20-MCAL-2f-HEXPARSER

clean-Core-2f-Inc-2f-1-2d--20-MCAL-2f-HEXPARSER:
	-$(RM) ./Core/Inc/1-\ MCAL/HEXPARSER/HexParser.cyclo ./Core/Inc/1-\ MCAL/HEXPARSER/HexParser.d ./Core/Inc/1-\ MCAL/HEXPARSER/HexParser.o ./Core/Inc/1-\ MCAL/HEXPARSER/HexParser.su

.PHONY: clean-Core-2f-Inc-2f-1-2d--20-MCAL-2f-HEXPARSER

