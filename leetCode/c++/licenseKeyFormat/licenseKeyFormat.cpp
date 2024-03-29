#include <string>
#include <iostream>
using namespace std;

class Solution {
public:
    string licenseKeyFormatting(string s, int k) {
        int dashCount = 0;
        char letter; 
        for (unsigned int i = 0; i < s.length(); i++) {
            letter = s[i];
            if (letter == '-') {  dashCount++;  }
        }

        int letterStrLength = s.length() - dashCount;
        int firstGroupSize = letterStrLength % k; 
        int count = firstGroupSize;
        if (count == 0) {  count = k;  }

        string resultString = "";
        for (unsigned int i = 0; i < s.length(); i++) {
            letter = s[i];
            if (letter == '-') {  continue;  }
            else {
                if (resultString.length() == count) {
                    resultString += "-";
                    // + 1 because string has a dash addded to it each time
                    count += k + 1;
                }
                if (islower(letter)) {  letter = toupper(letter);  }
                resultString += letter;
            }
        }

        return resultString;
    }
};

int main() {
    Solution mySolution = Solution();
    string myString = "1ad-76-v3nmlw";
    string resultString;
    resultString = mySolution.licenseKeyFormatting(myString, 3);
    cout << resultString << '\n';
    myString = "abcdef";
    resultString = mySolution.licenseKeyFormatting(myString, 3);
    cout << resultString << '\n';

    return 0;
}

/*
Data range/assumptions:
Non-empty
Could have no dashes
Assume dashes separate valid groups
    E.g. no --
Large length
Group size can also be large
*/

/*
Test cases:
No dashes
All lowercase
Mixed case
*/

/*
Naive:
    Construct string of only alphanumeric
    From string length, can calc number of groups
    Modulus = size of first group
        If 0, don't deal with
    Go through string, inserting dash every k spots

    Sanity check:
        Does modulus work like that?
            E.g. 8, group size 3
                8 / 3 = 2
                8 % 3 = 2
                So first dash inserted at 2, then 3 larger (5)
*/