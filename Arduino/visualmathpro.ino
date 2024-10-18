#include <Stepper.h>
#define IN1 8
#define IN2 9
#define IN3 10
#define IN4 11
int motorSpeed = 10;
Stepper stepper1(2048, 8, 10, 9, 11);
int directionPin = 2;
int stepPin = 3;

void setup() {
  // put your setup code here, to run once:
  stepper1.setSpeed(8);
  Serial.begin(9600);
  pinMode(directionPin, OUTPUT);
  pinMode(stepPin, OUTPUT);
  pinMode(13,OUTPUT);
  digitalWrite(13,LOW);
  for (int i =22; i<39; i++){
    pinMode(i, OUTPUT);
  }
  digitalWrite(directionPin, HIGH); // sets direction; LOW = TOWARD STEPPER, HIGH = AWAY FROM STEPPER
}

// runs once for each function launch
void loop() {
    int stepsArray[17][17];
    int currSteps;
    int numSatisfied;
    //checking for serial input
    
    if (Serial.available() > 0) {
      
    /// Read the number of elements in the array
    int numElements;
    while (Serial.available() < sizeof(int)) {
      // Wait until we have received a complete unsigned int for the array size
    }
    Serial.readBytes((char*)&numElements, sizeof(int));

    // Dynamically allocate an array to hold the incoming unsigned ints
    int *inlineArray = new int[numElements];

    // Read the array of unsigned ints from Serial
    for (int i = 0; i < numElements; i++) {
      while (Serial.available() < sizeof(int)) {
        // Wait until we have received a complete unsigned int
      }
      Serial.readBytes((char*)&inlineArray[i], sizeof(int));
    }

    for (int i=0;i<17; i++){
      for (int j=0;j<17;j++){
        stepsArray[i][j] = inlineArray[17*i+j] + 2048*1.1;
      }
    }
      // outer loop (each iteration = one row)
      for (int row = 0; row < 17; row++){
        for (int i = 0; i < 17; i++){
          digitalWrite(22+i, HIGH);
        }
        currSteps = 0;
        numSatisfied = 0;
        // inner loop (each iteration = one pin to be set to a specific z-value)
          while (numSatisfied < 17 && currSteps <= 4*2048) {
            for (int j = 0; j < 17; j++) {
              if (currSteps == stepsArray[row][j]){
                digitalWrite(22+j, LOW);
                numSatisfied++;
              }
            }
            stepper1.step(1);
            currSteps++;
          }
        digitalWrite(13,LOW);
        currSteps = 0;
        numSatisfied = 0;
        for (int i = 0; i < 17; i++){
          digitalWrite(22+i, HIGH);
        }
        // inner loop (each iteration = one pin to be set to a specific z-value)
          while (numSatisfied < 17) {
            stepper1.step(-1);
            currSteps++;
         
            for (int j = 0; j < 17; j++) {
              if (currSteps == stepsArray[row][j]){
                digitalWrite(22+j, LOW);
                numSatisfied++;
              }
           }
        }
       
       
        // move slider by 1 row **SHOULD DO THIS 16 TIMES NOT 17
            if (row != 16){
            for (int j = 0; j < 3200*4.06; j++){ //  0.19 INCHES PER ROTATION       int j = 0; j < 3200*4.00917299; j++
              digitalWrite(stepPin, LOW);
              digitalWrite(stepPin, HIGH); // 1 step
              delayMicroseconds(100);
               }
            }
            else {
              digitalWrite(directionPin, LOW); // sets direction; LOW = TOWARD STEPPER, HIGH = AWAY FROM STEPPER
              for (int j = 0; j < 3200*4.06*16; j++){ //  0.19 INCHES PER ROTATION     int j = 0; j < 3200*4.00917299*16; j++
                digitalWrite(stepPin, LOW);
                digitalWrite(stepPin, HIGH); // 1 step
                delayMicroseconds(100);
                }
                digitalWrite(directionPin, HIGH);
            }
      }
    }
   
}
