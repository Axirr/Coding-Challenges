#include <iostream>

using namespace std;

int main() {
    int inputSize = 10;
    int counter = 0;
    int input;
    int storedValues[inputSize];
    bool distinct;
    for (int i = 0; i < inputSize; i++) {
        distinct = true;
        cin >> input;
        input = input % 42;
        for (int j = 0; j < counter; j++) {
            if (input == storedValues[j]) { 
                distinct = false; 
                break;
            } 
        }
        if (distinct) {
            storedValues[counter] = input;
            counter++;
        }
    }
    cout << counter;
}
