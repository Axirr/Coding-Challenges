#include <iostream>

using namespace std;

int main() {
    int numTestCases;
    cin >> numTestCases;
    for (int i = 0; i < numTestCases; i++) {
        int calorieNeed;
        cin >> calorieNeed;
        int total = 0;
        int count = 0;
        while (total < calorieNeed) {
            count += 1;
            total += 400;
        }
        cout << count << "\n";
    }
}
