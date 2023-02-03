using System;
using System.Diagnostics;
using System.Collections.Generic;

namespace zizazConversion {
    class Program {
        public static void Main(string[] args) {
            string s;
            int numRows;
            string resultString;
            Solution sol = new Solution();

            s = "PAYPALISHIRING";
            numRows = 4;
            resultString = sol.Convert(s, numRows);
            Console.WriteLine(resultString);
            Debug.Assert(resultString == "PINALSIGYAHRPI");

            s = "PAYPALISHIRING";
            numRows = 3;
            resultString = sol.Convert(s, numRows);
            Console.WriteLine(resultString);
            Debug.Assert(resultString == "PAHNAPLSIIGYIR");

            s = "A";
            numRows = 1;
            resultString = sol.Convert(s, numRows);
            Console.WriteLine(resultString);
            Debug.Assert(resultString == "A");
        }
        public class Solution {
            public string Convert(string s, int numRows) {
                if (s.Length == 1 || numRows == 1)  { return s; }

                char[] charArray = new char[s.Length];
                int arrayIndex = 0;
                int normalJumpDistance = numRows + Math.Max(0, numRows - 2);

                for (int currentRow=0; currentRow < numRows; currentRow++) {
                    int currentIndex = currentRow;
                    while (currentIndex < s.Length) {
                        charArray[arrayIndex] = s[currentIndex];
                        arrayIndex += 1;
                        if (currentRow > 0 && currentRow < numRows - 1) {
                            int potentialNewIndex = currentIndex + normalJumpDistance - (currentRow * 2);
                            if (potentialNewIndex < s.Length) {
                                char newChar = s[potentialNewIndex];
                                charArray[arrayIndex] = newChar;
                                arrayIndex += 1;
                            }
                        }
                        currentIndex += normalJumpDistance;
                    }
                }

                return new String(charArray);
            }
        }
    }
}

/*
Data range/assumptions:
s length n: [1, 1000]
numrows k: [1, 1000]
lowercase letters and . ,
*/

/*
Tests:
n = 1
n = 1000
k = 1
k = 1000
include .
include ,
*/

/*
Ideas:

vertical length = k
only inner rows get diagonals so = min(0, k - 2)
So total offset is k + (k - 2) between letters in vertical rows
And offset reduces by 1 for each of the internal rows
    Reudces by row number
    E.g. k = 4, top row is 6 ([0, 7, 12, ...])
        second is 6
    if row number in [1,k-1], we need to add the middle one between each normal column
        [1, 6, 8, 13, 15, ...]
*/