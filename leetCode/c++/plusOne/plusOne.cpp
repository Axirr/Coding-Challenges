#include <vector>

class Solution {
public:
    std::vector<int> plusOne(std::vector<int>& digits) {
        if (digits.size() == 1) {
            if (digits[0] == 9) {
                digits = {1,0};
            } else {
                digits[0] += 1;
            }
            return digits;
        }
        
        int originalSecondLastDigit = digits[1];
        for (int i = digits.size() - 1; i > 0; i--) {
            if (digits[i] != 9) {
                digits[i] += 1;
                break;
            }
            digits[i] = 0;
        }

        // Rollover in last digit
        if (digits[1] == 0 && digits[1] != originalSecondLastDigit) {
            if (digits[0] == 9) {
                digits[0] = 0;
                digits.insert(digits.begin(), 1);
            } else {
                digits[0] += 1;
            }
        }

        return digits;
    }
};

/*
Data range/assumptions:
Array has at least one digit
*/

/*
Important test cases:
Single digit
Rollover e.g. xxxx9
Multiple rollover xxxxx99
Final digit rollover
*/

/*
Naive:
    Start at last digit
    If not 9, add one and break
    Else, set 0, move to next one

    Will handle final rollover fine
*/