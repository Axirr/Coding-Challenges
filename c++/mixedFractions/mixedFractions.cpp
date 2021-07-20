#include <iostream>

using namespace std;

int main() {
    int numer;
    int denom;
    cin >> numer;
    cin >> denom;
    while (numer != 0 && denom != 0) {
        int whole = 0;
        while (numer >= denom) {
            numer -= denom;
            whole += 1;
        }
        cout << whole << " " << numer << " / " << denom;
        cout << "\n";
        cin >> numer;
        cin >> denom;
    }
}
