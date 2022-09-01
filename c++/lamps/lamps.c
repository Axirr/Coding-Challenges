#include <stdio.h>

int main() {
    int dailyHours;
    int powerCost;

    int INC_POWER = 60;
    int INC_LIFE = 1000;
    int INC_PRICE = 5;
    
    int LED_POWER = 11;
    // int LED_PRICE = 60;

    scanf("%d", &dailyHours);
    scanf("%d", &powerCost);

    int totalDays = 0;
    int hoursOnBulb = 0;
    float costInc = 5;
    float costLed = 60;
    while (costInc <= costLed) {
        totalDays += 1;
        hoursOnBulb += dailyHours;
        costInc += INC_POWER * powerCost * dailyHours / 100000.0;
        costLed += LED_POWER * powerCost * dailyHours / 100000.0;
        if (hoursOnBulb > INC_LIFE) {
            costInc += INC_PRICE;
            hoursOnBulb -= INC_LIFE;
        }
        //printf("Current costInc is %f\n", costInc);
        //printf("Current costLed is %f\n", costLed);
    }

    printf("%d\n", totalDays);

    return 0;
}