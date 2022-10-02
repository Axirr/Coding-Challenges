#include <iostream>
using namespace std;

void swapNumbers(int& x, int& y);

int main() {
    int x = 100;
    int y = 50;
    cout << x << "," << y << '\n';
    swapNumbers(x, y);
    cout << x << "," << y;

}

void swapNumbers(int& x, int& y) {
    int temp = x;
    x = y;
    y = temp;
}