using System;
using System.Diagnostics;
using System.Collections.Generic;
using System.Text;

class Program {
    public static void Main(string[] args) {
        Solution sol = new Solution();
        string a;
        string b;
        string addedString;

        a = "11";
        b = "1";
        addedString = sol.AddBinary(a, b);
        Console.WriteLine(addedString);
        Debug.Assert(addedString == "100");

        a = "1111";
        b = "1111";
        addedString = sol.AddBinary(a, b);
        Console.WriteLine(addedString);
        Debug.Assert(addedString == "11110");
    }

}
public class Solution {
    public string AddBinary(string a, string b) {
        char[] sbAddredString = new char[Math.Max(a.Length, b.Length)];
        string shortestString = a;
        string longestString = b;
        if (b.Length < a.Length) { shortestString = b; longestString = a; }
        string zeroesToAdd = new String('0', longestString.Length - shortestString.Length);
        shortestString = zeroesToAdd + shortestString;

        int carry = 0;
        for (int i=longestString.Length - 1; i >= 0; i--) {
            char addedChar;
            if (carry == 1) {
                if (longestString[i] == '1' && shortestString[i] == '1') { addedChar = '1'; carry = 1;}
                else if (longestString[i] == '1' && shortestString[i] == '0' || (longestString[i] == '0' && shortestString[i] == '1')) { addedChar = '0'; carry = 1; }
                else { addedChar = '1'; carry = 0; }
            } else {
                if (longestString[i] == '1' && shortestString[i] == '1') { addedChar = '0'; carry = 1;}
                else if (longestString[i] == '1' && shortestString[i] == '0' || (longestString[i] == '0' && shortestString[i] == '1')) { addedChar = '1'; carry = 0; }
                else { addedChar = '0'; carry = 0; }
            }
            sbAddredString[i] = addedChar;
        }
        StringBuilder sb = new StringBuilder();
        if (carry == 1) { sb.Append('1'); }
        foreach (char myChar in sbAddredString) { sb.Append(myChar); }

        return sb.ToString();
    }
}

/*
Data range/assumptions:
string length n: [1, 10^4]
no leading zeroes
string lengths can vary
*/

/*
Tests:
n = 1
n = 10 ^4
different string lengths
*/

/*
Ideas:

Naive:
    Pad shortest with leading zeroes
    Add digits together, with a carry
    If last carry is 1, prepend "1"
    Time complexity: O(n)

Logic function for bit adding:
Carry 1 2       Final FinalCarry
0   0   0       0       0
0   0   1       1
*/