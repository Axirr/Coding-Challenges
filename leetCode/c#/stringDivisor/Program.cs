using System;
using System.Diagnostics;

namespace stringDivisor {
    public class Program {
        public static void Main(string[] args) {
            string str1;
            string str2;
            string resultString;
            Solution sol = new Solution();

            str1 = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            str2 = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
            resultString = sol.GcdOfStrings(str1, str2);
            Console.WriteLine(resultString);
            Debug.Assert(resultString == "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

            str1 = "ABCABC";
            str2 = "ABC";
            resultString = sol.GcdOfStrings(str1, str2);
            Console.WriteLine(resultString);
            Debug.Assert(resultString == "ABC");

            str1 = "ABABAB";
            str2 = "ABAB";
            resultString = sol.GcdOfStrings(str1, str2);
            Console.WriteLine(resultString);
            Debug.Assert(resultString == "AB");

            str1 = "LEET";
            str2 = "CODE";
            resultString = sol.GcdOfStrings(str1, str2);
            Console.WriteLine(resultString);
            Debug.Assert(resultString == "");

        }
    }

    public class Solution {
        public string GcdOfStrings(string str1, string str2) {
            string longString = str1;
            string shortString = str2;
            if (str2.Length > str1.Length)  {
                longString = str2;
                shortString = str1;
            }

            for (int i=0; i < longString.Length; i++) {
                int shortIndex = i % shortString.Length;
                if (longString[i] != shortString[shortIndex]) {
                    return "";
                }
            }

            int currentLen = shortString.Length;
            while (currentLen > 0) {
                if (longString.Length % currentLen == 0 && shortString.Length % currentLen == 0)  { return shortString.Substring(0, currentLen); }
                currentLen -= 1;
            }

            return shortString.Substring(0,1);
        }
    }
}

/*
Data range/assumptions:
str1 and str2 length n: [1, 1000]
All English uppercase letters
*/

/*
Tests:
n = 1
n = 1000
instance of divisor but not fully made of divisor
empty divisor
single letter divisor
Divisor is shorter than either word (E.g. abc divisor for abcabc and abcabc)
*/

/*
Ideas:

Naive:
    Necessary conditions:
        Strings must be equal for entire length of shortest
        And equal for length after that (just restart traversal of short again)
        That determines that shortest is at least a divisor
    Then, for each substring in shortest (max size n/2), recursively see if (shortString, subString)
        If so, keep as maxString
    Take max len

Problem: want the longest, but need to ensure it works

Better:
    For divisor of single string, must have equal counts of each letter
    And they have to show up in the same order
        E.g. abccba has same counts, not same letters
    For two strings, sets of equal count letters have to be the same

    Shortest string is theoretical longest divisor
    Determine if shortest string contains duplicates
        If letter exists in set already, run recursively on current word
            For each letter in set, 
*/