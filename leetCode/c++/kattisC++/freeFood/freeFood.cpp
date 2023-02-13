#include <iostream>

using namespace std;

int main() {
    int testCases;
    cin >> testCases;
    int start;
    int end;
    bool daysWithFood [365];
    for (int i = 0; i < 365; i++) {
        daysWithFood[i] = false;
    }
    for (int i = 0; i < testCases; i++) {
        cin >> start;
        cin >> end;
        for (int j = start; j <= end; j++) {
            daysWithFood[j - 1] = true;
        }
    }
    int count = 0;
    for (int i = 0; i < 365; i++) {
        if (daysWithFood[i]) { count++; }
    }
    cout << count << "\n";
}
