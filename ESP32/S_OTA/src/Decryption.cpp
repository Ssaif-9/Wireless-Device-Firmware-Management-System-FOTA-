#include "Decryption.h"
#include "Debug.h"

void setKey(char * key) 
{
  // aes-128bit mode means that your cipher key can only be 16 characters long 
  // futhermore, only chracters in the cipher key are allowed, not numbers!
  // 16 characters + '\0'
  /*
  if( strlen(key) > 16 ) 
  {
    privateCipherKey = new char[17];
    (String(key).substring(0,16)).toCharArray(privateCipherKey, 17);
    
    #ifdef CIPHER_DEBUG
      debugln("[cipher] error: cipher key to long! Will be cutted to 16 characters.");
      debugln("[cipher] => " + String(key));
      debugln("[cipher] => " + String(privateCipherKey));
    #endif  
  } 
  else if( strlen(key) < 16 ) 
  {
    privateCipherKey = "abcdefghijklmnop";
    
    #ifdef CIPHER_DEBUG
      debugln("[cipher] error: cipher key to short! Standard cipher key will be used.");
    #endif
  } 
  else 
  {
    #ifdef CIPHER_DEBUG
      debugln("[cipher] cipher key length matched. Using this key.");
    #endif
    */
    privateCipherKey = key;
  }
/*}*/

char * getKey() 
{
  return privateCipherKey;
}

void decrypt(unsigned char * cipherText, char * key, unsigned char * outputBuffer) 
{
  // encrypt ciphered chipherText buffer of length 16 characters to plain text
  mbedtls_aes_context aes;
 
  mbedtls_aes_init( &aes );
  mbedtls_aes_setkey_dec( &aes, (const unsigned char*) key, strlen(key) * 8 );
  mbedtls_aes_crypt_ecb(&aes, MBEDTLS_AES_DECRYPT, (const unsigned char*)cipherText, outputBuffer);
  mbedtls_aes_free( &aes );
}

void decrypt(unsigned char * cipherText, unsigned char * outputBuffer) 
{
  decrypt(cipherText, getKey(), outputBuffer);
}


String decryptBuffer(String cipherText, char * key) 
{
  // returns decrypted String of ciphered text (length: 16 characters)
  String decipheredTextString = "";
  unsigned char cipherTextOutput[16];
  unsigned char decipheredTextOutput[16];

  for (int i = 0; i < 16; i++) 
  {
    cipherTextOutput[i] = (char)cipherText[i];
  }
  
  decrypt(cipherTextOutput, key, decipheredTextOutput);

  for (int i = 0; i < 16; i++) 
  {
    decipheredTextString = decipheredTextString + (char)decipheredTextOutput[i];

    if(decipheredTextString[i] == '\0') {
        break;
    }
  }

  return decipheredTextString;
}

String decryptBuffer(String cipherText) 
{
  return decryptBuffer(cipherText, getKey());
}

String decryptString(String cipherText, char * key) {
  // returns encrypted String of plainText with variable length
  constexpr int BUFF_SIZE=16;
  String buffer = "";
  String decipheredTextString = "";
  
  for(int block=0; block < cipherText.length()/BUFF_SIZE; block++) {
      for(int j = block*BUFF_SIZE; j < (block+1)*BUFF_SIZE; j++) {
        buffer += cipherText[j];
      }
      
      decipheredTextString += decryptBuffer(buffer, key);
      buffer = "";
  }

  return decipheredTextString;
}

String decryptString(String cipherText) 
{
  return decryptString(cipherText, getKey());
}