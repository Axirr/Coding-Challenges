#include <string>
#include <iostream>

class Solution {
public:
    std::string breakPalindrome(std::string palindrome) {
        if (palindrome.length() == 1) {  return "";  }
        bool didReplace = false;
        unsigned int stringIndex;
        char replaceLetter = 'a';
        while (true) {
            // Only need to look at first half, and not the middle (for odd length) since changing that won't make non-palindrome
            if (replaceLetter == 'a') {
                for (stringIndex = 0; stringIndex < (palindrome.length() / 2); stringIndex++) {
                    if (palindrome[stringIndex] != replaceLetter) {
                        palindrome[stringIndex] = replaceLetter;
                        didReplace = true;
                        break;
                    }
                }
            } else {
                // Second pass done backwards, in back half, because b should be as far back as possible for lexographical minimum
                // Either has to be 'a' or 'b' as replacement letter, since if 'a' doesn't work then 'b' must
                for (stringIndex = palindrome.length() - 1; stringIndex >= (palindrome.length() / 2 + palindrome.length() % 2); stringIndex++) {
                    if (palindrome[stringIndex] != replaceLetter) {
                        palindrome[stringIndex] = replaceLetter;
                        break;
                    }
                }
                break;
            }
            if (didReplace) { break;  }
            replaceLetter = 'b';
        }
        return palindrome;
    }
};

int main() {
    Solution mySol = Solution();
    std::string resultString = mySol.breakPalindrome("abccba");
    std::cout << resultString << '\n';
    resultString = mySol.breakPalindrome("aa");
    std::cout << resultString << '\n';
    return 0;
}

/*
Data range/assumptions:
Non-empty string
Lowercase letters
Valid palindrome
*/

/*
Test cases:
Single letter
    Return empty string
All 'aaaa'
aaaaaddaaaaa
    Should replace d, not one of the prefix 'a'
*/

/*
Naive:
    For each letter
        Try to replace with lowest letter
        If still palindrome, move to next letter
    If couldn't replace, go to next letter

    Time complexity:
        First pass n
        But second pass (i.e. replace with 'b') should be possible
        Worst cast 2n?
    Good enough
*/