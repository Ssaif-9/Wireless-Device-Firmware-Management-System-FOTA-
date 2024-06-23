#ifndef DECRYPTION_H_
#define DECRYPTION_H_

#include "mbedtls/aes.h"
#include <Arduino.h>


// Define constants
#define CIPHER_DEBUG 0
#define CIPHER_KEY "abcdefghijklmnop"

// Global variables
extern char *privateCipherKey;

// Function prototypes

void setKey(char *key);
char *getKey();

void decrypt(unsigned char *cipherText, char *key, unsigned char *outputBuffer);
void decrypt(unsigned char *cipherText, unsigned char *outputBuffer);

String decryptBuffer(String cipherText, char *key);
String decryptBuffer(String cipherText);

String decryptString(String cipherText, char *key);
String decryptString(String cipherText);

#endif /* DECRYPTION_H_ */
