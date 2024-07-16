################################################################################
# Automatically-generated file. Do not edit!
# Toolchain: GNU Tools for STM32 (12.3.rel1)
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../Core/Inc/1-\ MCAL/2-\ GPIO/GPIO_program.c 

OBJS += \
./Core/Inc/1-\ MCAL/2-\ GPIO/GPIO_program.o 

C_DEPS += \
./Core/Inc/1-\ MCAL/2-\ GPIO/GPIO_program.d 


# Each subdirectory must supply rules for building sources it contributes
Core/Inc/1-\ MCAL/2-\ GPIO/GPIO_program.o: ../Core/Inc/1-\ MCAL/2-\ GPIO/GPIO_program.c Core/Inc/1-\ MCAL/2-\ GPIO/subdir.mk
	arm-none-eabi-gcc "$<" -mcpu=cortex-m3 -std=gnu11 -g3 -DDEBUG -DUSE_HAL_DRIVER -DSTM32F103xB -c -I../Core/Inc -I../Drivers/STM32F1xx_HAL_Driver/Inc/Legacy -I../Drivers/STM32F1xx_HAL_Driver/Inc -I../Drivers/CMSIS/Device/ST/STM32F1xx/Include -I../Drivers/CMSIS/Include -O0 -ffunction-sections -fdata-sections -Wall -fstack-usage -fcyclomatic-complexity -MMD -MP -MF"Core/Inc/1- MCAL/2- GPIO/GPIO_program.d" -MT"$@" --specs=nano.specs -mfloat-abi=soft -mthumb -o "$@"

clean: clean-Core-2f-Inc-2f-1-2d--20-MCAL-2f-2-2d--20-GPIO

clean-Core-2f-Inc-2f-1-2d--20-MCAL-2f-2-2d--20-GPIO:
	-$(RM) ./Core/Inc/1-\ MCAL/2-\ GPIO/GPIO_program.cyclo ./Core/Inc/1-\ MCAL/2-\ GPIO/GPIO_program.d ./Core/Inc/1-\ MCAL/2-\ GPIO/GPIO_program.o ./Core/Inc/1-\ MCAL/2-\ GPIO/GPIO_program.su

.PHONY: clean-Core-2f-Inc-2f-1-2d--20-MCAL-2f-2-2d--20-GPIO

