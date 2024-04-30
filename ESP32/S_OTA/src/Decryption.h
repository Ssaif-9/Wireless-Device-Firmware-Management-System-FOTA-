#ifndef CIPHER_H_
#define CIPHER_H_

#include <Arduino.h>

#include "mbedtls/aes.h"

#define CIPHER_KEY                    "fotaprojectfotaa"

void decrypt(unsigned char *cipherText, char *key, unsigned char *outputBuffer);

String decryptBuffer(String cipherText, char *key);

String decryptString(String cipherText, char * key);

#endif /* CIPHER_H_ */
