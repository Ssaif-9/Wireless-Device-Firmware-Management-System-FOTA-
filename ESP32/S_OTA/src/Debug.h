#ifndef DEBUG_H_
#define DEBUG_H_

#define debug(x)              Serial.print(x)
#define debugf(x,y)           Serial.printf(x,y)
#define debugln(x)            Serial.println(x)
 
#define Transmit(x)         Serial2.write(x)
#define Receive()           Serial2.read()
#endif
