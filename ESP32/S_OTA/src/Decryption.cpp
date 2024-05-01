#include "Decryption.h"


void decrypt(unsigned char * cipherText, char * key, unsigned char * outputBuffer) {
  // encrypt ciphered chipherText buffer of length 16 characters to plain text
  mbedtls_aes_context aes;
 
  mbedtls_aes_init( &aes );
  mbedtls_aes_setkey_dec( &aes, (const unsigned char*) key, strlen(key) * 8 );
  mbedtls_aes_crypt_ecb(&aes, MBEDTLS_AES_DECRYPT, (const unsigned char*)cipherText, outputBuffer);
  mbedtls_aes_free( &aes );
}
/*

 String decryptBuffer(String cipherText, char *key)
 {

 }

String decryptString(String cipherText, char * key)
{

}

*/