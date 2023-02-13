#include <iostream>
#include <string>

using namespace std;

int main() {
    string currentVoice;
    string doctorVoice;
    cin >> currentVoice;
    cin >> doctorVoice;
    if (currentVoice.size() >= doctorVoice.size()) {
        cout << "go";
    } else {
        cout << "no";
    }
}
