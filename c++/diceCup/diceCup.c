#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

bool isInArray(int* myArray,int arrayLength,int value);

int main() {
    int numFaces1;
    int numFaces2;
    int* sums;
    scanf("%d %d", &numFaces1, &numFaces2);
    int numCombinations = numFaces1 * numFaces2;
    sums = (int*) malloc(numCombinations * sizeof(int));
    for (int i = 0; i < numFaces1; i++) {
        for (int j = 0; j < numFaces2; j++) {
            sums[i * numFaces2 + j] = (i + 1) + (j + 1);
        }
    }
    int maxCount = 0;
    int* maxArray = malloc(numCombinations);
    int indexMaxArray = 0;
    int count = 0;
    int currentNumber;
    for (int i = 0; i < numCombinations; i++) {
        currentNumber = sums[i];
        count = 1;
        for (int j = 0; j < numCombinations; j++) {
            if (currentNumber == sums[j]) {
                count++;
            }
        }
        if (count < maxCount || (indexMaxArray > 0 && isInArray(maxArray, indexMaxArray, currentNumber))) {
            continue;
        } else {
            if (count > maxCount) {
                maxCount = count;
                indexMaxArray = 0;
            }
            maxArray[indexMaxArray] = currentNumber;
            indexMaxArray++;
        }
    }
    for (int i = 0; i < indexMaxArray; i++) {
        printf("%d\n", maxArray[i]);
    }

    return 0;
}

bool isInArray(int* myArray,int arrayLength,int value) {
    bool isIn = false;
    for (int i = 0; i < arrayLength; i++) {
        if (myArray[i] == value) {
            isIn = true;
            break;
        }
    }
    return isIn;
}