#include <string>
#include <iostream>
using namespace std;

class Solution {
public:
    int lengthOfLastWord(string s) {
        int resultLength = -1;
        int startWordIndex = 0;
        char myChar;
        // Single traversal
        for (unsigned int i = 0; i < (s.length() - 1); i++) {
            myChar = s[i];
            // if (myChar == ' ' && i != s.length() - 1) {  startWordIndex = i + 1;  }
            if (myChar == ' ') {
                if (s[i + 1] != ' ') {
                    startWordIndex = i + 1;
                    resultLength = -1;
                } else if (resultLength == -1) {
                    resultLength = i - startWordIndex;
                }
            }
        }
        if (resultLength == -1) {
            resultLength = s.length() - startWordIndex;
            if (s[s.length() - 1] == ' ') {  resultLength -= 1;  }
        }
        return resultLength;
    }
};

int main() {
    Solution mySolution = Solution();
    string myString = "Hello world!";
    int resultLength = mySolution.lengthOfLastWord(myString);
    printf("%d\n", resultLength);
    myString = "a";
    resultLength = mySolution.lengthOfLastWord(myString);
    printf("%d\n", resultLength);
    myString = " a";
    resultLength = mySolution.lengthOfLastWord(myString);
    printf("%d\n", resultLength);
    myString = "a ";
    resultLength = mySolution.lengthOfLastWord(myString);
    printf("%d\n", resultLength);
    myString = "world!";
    resultLength = mySolution.lengthOfLastWord(myString);
    printf("%d\n", resultLength);
    myString = "  hello world   ";
    resultLength = mySolution.lengthOfLastWord(myString);
    printf("%d\n", resultLength);
    return 0;
}

/*
Data range/assumptions:
Non-empty, with at least one valid word
*/

/*
Important test cases:
Single word (so no spaces)
Multiple spaces
Leading spaces
Trailing spaces
Multipler leading or trailing spaces
*/