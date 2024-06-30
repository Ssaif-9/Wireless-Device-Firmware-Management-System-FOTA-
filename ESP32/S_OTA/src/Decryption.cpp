#include "Decryption.h"



const char *privateCipherKey = "fotaprojectfotaa";
const char *HMAC_Key = "fotaprojectfotaa";
/*
void setKey(char * key) 
{
    privateCipherKey = key;
    HMAC_Key = key;
}

char * getKey() 
{
  return privateCipherKey;
}
*/
void decrypt(unsigned char * cipherText,const char * key, unsigned char * outputBuffer) 
{
  // encrypt ciphered chipherText buffer of length 16 characters to plain text
  mbedtls_aes_context aes;
 
  mbedtls_aes_init( &aes );
  mbedtls_aes_setkey_dec( &aes, (const unsigned char*) key, strlen(key) * 8 );
  mbedtls_aes_crypt_ecb(&aes, MBEDTLS_AES_DECRYPT, (const unsigned char*)cipherText, outputBuffer);
  mbedtls_aes_free( &aes );
}




String decryptBuffer(String cipherText,const char * key) 
{
  // returns decrypted String of ciphered text (length: 16 characters)
  String decipheredTextString = "";
  unsigned char cipherTextOutput[16];
  unsigned char decipheredTextOutput[16];

  for (int i = 0; i < 16; i++) {
    cipherTextOutput[i] = (char)cipherText[i];
  }
  
  decrypt(cipherTextOutput, key, decipheredTextOutput);

  for (int i = 0; i < 16; i++) {
    decipheredTextString = decipheredTextString + (char)decipheredTextOutput[i];

    if(decipheredTextString[i] == '\0') {
        break;
    }
  }

  return decipheredTextString;
}



String decryptString(String cipherText, const char * key) {
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
  return decryptString(cipherText,privateCipherKey);
}


void HMAC_File(const char *HEX_file, const char *LocalDigest_File) {
    // Initialize LittleFS
    if (!LittleFS.begin()) {
        debugln("Failed to initialize LittleFS");
        return;
    }

    // Open the decrypted file for reading
    File Decrypted_File = LittleFS.open(HEX_file, "r");
    if (!Decrypted_File) {
        debugf("Failed to open input file: %s\n", HEX_file);
        return;
    }
    size_t Decryption_FileSize = Decrypted_File.size();

    String TextString = "";
    while (Decrypted_File.available()) 
    {
        String line = Decrypted_File.readStringUntil('\n');
        line.trim();
        TextString += line;
    }
    //debugln("Content of the file in one line from string:");
    //debugln(TextString);

 
    size_t TextStringLength = TextString.length();

    // Use a vector for automatic memory management
    std::vector<uint8_t> Decryption_buffer(TextStringLength);
    
    for (size_t i = 0; i < TextStringLength; ++i)
     {
        Decryption_buffer[i] = TextString[i];
    }
    size_t Decryption_BufferSize = Decryption_buffer.size();
     

    /*debugln("Content of the file in one line from buffer:");
    for (size_t i = 0; i < Decryption_buffer.size(); ++i) {
        debug((char)Decryption_buffer[i]); // Print each byte as character
    }
    debugln(); // New line for clarity
*/
    Decrypted_File.close();

     // Initialize HMAC context
     uint8_t HmacBuffer[32];
     mbedtls_md_context_t ctxx;
     mbedtls_md_type_t md_type = MBEDTLS_MD_SHA256;
     const mbedtls_md_info_t *md_info = mbedtls_md_info_from_type(md_type);

     mbedtls_md_init(&ctxx);
     if (mbedtls_md_setup(&ctxx, md_info, 1) != 0)
     {
       debugln("Failed to setup mbedtls_md context");
       return;
    }

   if (mbedtls_md_hmac_starts(&ctxx, (const unsigned char *)HMAC_Key, strlen(HMAC_Key)) != 0) {
    debugln("Failed to start HMAC");
    mbedtls_md_free(&ctxx);
    return;
}

    if (mbedtls_md_hmac_update(&ctxx, Decryption_buffer.data(), Decryption_BufferSize) != 0) {
        debugln("Failed to update HMAC");
        mbedtls_md_free(&ctxx);
        return;
    }

    if (mbedtls_md_hmac_finish(&ctxx, HmacBuffer) != 0) {
        debugln("Failed to finish HMAC");
        mbedtls_md_free(&ctxx);
        return;
    }

    mbedtls_md_free(&ctxx);

    // Write the hash to the output file
    File Digest_File = LittleFS.open(LocalDigest_File, "w");

    if (!Digest_File) {
        debugf("Failed to open output file: %s\n", LocalDigest_File);
        return;
    }

    for (int i = 0; i < sizeof(HmacBuffer); i++)
     {
         Digest_File.printf("%02x", HmacBuffer[i]);
    }

    Digest_File.close();

    debugln("HMAC SHA-256 computed and written to file");
}