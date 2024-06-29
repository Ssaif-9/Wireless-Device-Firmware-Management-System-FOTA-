#ifndef DECRYPTION_H_
#define DECRYPTION_H_

#include "mbedtls/aes.h"
#include <Arduino.h>
#include "Debug.h"
#include "Arduino.h"
#include "FS.h"
#include "LITTLEFS.h"
#include<vector>
#include "mbedtls/md.h"


//#define CIPHER_KEY "fotaprojectfotaa"

// Global variables
//extern const unsigned char *privateCipherKey;
//extern const unsigned char *HMAC_Key;
// Function prototypes

//void setKey(char *key);
//char *getKey();

void decrypt(unsigned char *cipherText,const char *key, unsigned char *outputBuffer);

String decryptBuffer(String cipherText,const char *key);

String decryptString(String cipherText,const char *key);

String decryptString(String cipherText);

void HMAC_File(const char *HEX_file, const char *LocalDigest_File);


#endif /* DECRYPTION_H_ */
