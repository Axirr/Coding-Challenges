// See https://aka.ms/new-console-template for more information
class Program {
    public static void Main (string[] args) {
        Solution mySol = new Solution();
        int resultInt = mySol.RomanToInt("I");
        Console.WriteLine(resultInt);
        resultInt = mySol.RomanToInt("IV");
        Console.WriteLine(resultInt);
    }

    public class Solution {
        public int RomanToInt(string s) {
            int resultSum = ValueForChar(s[0]);
            int addValue = 0;
            int i;
            char currentLetter;
            char prevLetter = s[0];
            for (i = 1; i < s.Length; i++) {
                currentLetter = s[i];
                addValue = ValueForChar(currentLetter);
                resultSum += addValue;
                if (currentLetter == 'V' | currentLetter == 'X') {
                    if (prevLetter == 'I') {  resultSum -= 2 * ValueForChar('I');  }
                } else if (currentLetter == 'L' | currentLetter == 'C') {
                    if (prevLetter == 'X') {  resultSum -= 2 * ValueForChar('X');  }
                } else if (currentLetter == 'D' | currentLetter == 'M') {
                    if (prevLetter == 'C') {  resultSum -= 2 * ValueForChar('C');  }
                }
                prevLetter = currentLetter;
            }
            return resultSum;
        }

        public int ValueForChar(char currentLetter) {
            int addValue = 0;
            switch (currentLetter) {
                case 'I':
                    addValue = 1;
                    break;
                case 'V':
                    addValue = 5;
                    break;
                case 'X':
                    addValue = 10;
                    break;
                case 'L':
                    addValue = 50;
                    break;
                case 'C':
                    addValue = 100;
                    break;
                case 'D':
                    addValue = 500;
                    break;
                case 'M':
                    addValue = 1000;
                    break;
                default:
                    Console.WriteLine("UNKNOWN");
                    break;
            }
            return addValue;
        }
    }
}

/*
Data range/assumptions:
Non-empty
Valid Roman numeral
Small max length
*/

/*
Test cases:
Single digit
Combination numerals (e.g. IV IX)
Largest number
IIX
    Not valid
Uneven, with a single and a pair?
    MIX
*/

/*
Naive:
    switch statement on roman numeral pairs
        If pair, add value and increment by 2
        If not, add the values of each
    WRONG

Letter by letter:
    If possible to pair, check preceding [V X L C D M]
        If pair, subtract value of first (which was previously added)
    Else
        Add letter value to sum
*/