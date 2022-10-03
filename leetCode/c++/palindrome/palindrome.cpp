#include <iostream>
#include <string>

class Solution {
public:
    bool isPalindrome(int x) {
        if (x < 0) {  return false;  }
        std::string convertedString = std::to_string(x);
        int front = 0;
        int back = convertedString.length() - 1;
        while (front < back) {
            if (convertedString[front] != convertedString[back]) {  return false;  }
            front += 1;
            back -= 1;
        }
        
        return true;
    }
};

/*
Data range/assumptions:
Non-empty
*/

/*
Important test cases:
Negative but otherwise valid palindrome
    Reject
Even length
Odd length
*/

/*
Naive:
    Convert to string
    Check back against front until != or front >= back

Non-conversion way:
    Calculate total digits by subtracting powers of 10 until negative
    Get digits from modulus operation
        % 10 gets last digit
        Front
            Floor divide so that last digit is relevant one
            // 10000        % 10
            // 1000         % 10
        Back:
            Floor divide so that last digit is relvant one
            // 1        % 10
            // 10       % 10
            ...
*/