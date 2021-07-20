#include <iostream>

using namespace std;

int main() {
    int left;
    int middle;
    int right;
    cin >> left >> middle >> right;
    int maxMoves = 0;
    //if ((right - middle) > 1 || (middle - left) > 1) {
    int leftMoveSpace = right - (middle + 1);
    int rightMoveSpace = (middle - 1) - left;
    if (leftMoveSpace > rightMoveSpace) {
        maxMoves = leftMoveSpace;
    } else { maxMoves = rightMoveSpace; }
    //}
    cout << maxMoves;
}
