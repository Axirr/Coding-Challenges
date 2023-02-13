#include <iostream>
#include <string>
#include <vector>
#include <cmath>
#include <iomanip>

using namespace std;

int main() {
    int numPoints;
    cin >> numPoints;
    int startX;
    int startY;
    double total;
    vector<int> startVertex (2);
    vector<int> firstVertex (2);
    vector<int> secondVertex (2);
    while (numPoints != 0) {
        cin >> startX;
        cin >> startY;
        startVertex[0] = startX;
        startVertex[1] = startY;
        firstVertex[0] = startX;
        firstVertex[1] = startY;
        total = 0;
        for (int i = 0; i < (numPoints - 1); i++) {
            cin >> startX;
            cin >> startY;
            secondVertex[0] = startX;
            secondVertex[1] = startY;
            total += 0.5 * (firstVertex[0]*secondVertex[1] - firstVertex[1]*secondVertex[0]);
            firstVertex[0] = secondVertex[0];
            firstVertex[1] = secondVertex[1];
        }
        total += 0.5 * (firstVertex[0]*startVertex[1] - firstVertex[1]*startVertex[0]);
        if (total > 0) {
            cout << "CCW ";
        } else {
            cout << "CW ";
        }
        cout << fixed;
        cout << setprecision(1) << abs(total);
        cout << "\n";
        cin >> numPoints;
    }
}
