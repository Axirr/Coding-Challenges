#include <iostream>
#include <string>
#include <map>

using namespace std;

int main() {
    map<string, string> possibleValues;
    for (int i = 0; i <= 20; i++) {
        for (int j = 1; j <= 3; j++) {
            string numberWord = to_string(i*j);
            if (possibleValues.find(numberWord) == possibleValues.end()) {
                string word;
                switch(j) {
                    case 1 : word = "single ";
                            break;
                    case 2 : word = "double ";
                            break;
                    case 3 : word = "triple ";
                            break;
                }
                word = word + to_string(i);
                possibleValues.insert(pair<string,string>(numberWord, word)); 
            }
        }
    }
    int target;
    string wordTarget;
    cin >> target;
    wordTarget = to_string(target);
    if (target <= 60) {
        map<string,string>::iterator it;
        it = possibleValues.find(wordTarget); 
        if (it != possibleValues.end()) {
            cout << possibleValues[wordTarget];
            return 0;
        }
    }
    if (target <= 120) {
        for (int i = 0; i <= 60; i++) {
            string subtarget = to_string(target - i);
            string wordI = to_string(i);
            map<string,string>::iterator it1;
            map<string,string>::iterator it2;
            it1 = possibleValues.find(wordI);
            it2 = possibleValues.find(subtarget);
            if (it1 != possibleValues.end() && it2 != possibleValues.end()) {
                cout << possibleValues[wordI] << "\n";
                cout << possibleValues[subtarget] << "\n";
                return 0;
            }
        }
    }
    for (int i = 0; i <= 60; i++) {
        for (int j = 0; j <= (target - i); j++) {
            string subtarget = to_string(target - j - i);
            string wordI = to_string(i);
            string wordJ = to_string(j);
            map<string,string>::iterator it1;
            map<string,string>::iterator it2;
            map<string,string>::iterator it3;
            it1 = possibleValues.find(wordI);
            it2 = possibleValues.find(subtarget);
            it3 = possibleValues.find(wordJ);
            if (it1 != possibleValues.end() && it2 != possibleValues.end() && it3 != possibleValues.end()) {
                cout << possibleValues[wordI] << "\n";
                cout << possibleValues[subtarget] << "\n";
                cout << possibleValues[wordJ] << "\n";
                return 0;
            }
        }
    }
    cout << "impossible";
}
