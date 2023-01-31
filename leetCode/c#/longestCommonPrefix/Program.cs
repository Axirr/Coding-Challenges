using System;
using System.Diagnostics;

namespace longestCommonPrefix {
    internal class Program {
        public static void Main(string[] args) {
            Solution sol = new Solution();
            string[] strs = new String[] { "flower","flow","flight" };
            string resultString = sol.LongestCommonPrefix(strs);
            Console.WriteLine(resultString);
            Debug.Assert(resultString == "fl");
        }
    } 

    public class Solution {
        public string LongestCommonPrefix(string[] strs) {
            if (strs.Length == 1) {
                return strs[0];
            }
            Array.Sort(strs, (x, y)=> x.Length.CompareTo(y.Length));
            string longestPrefix = strs[0];
            int longestMatchIndex = 0;
            for (int i = 0; i < longestPrefix.Length; i++) {
                char letter = longestPrefix[i];
                bool didBreak = false;
                for (int j = 1; j < strs.Length; j++) {
                    if (letter != strs[j][i]) {
                        didBreak = true;
                        break;
                    }
                }
                if (!didBreak) {
                    longestMatchIndex += 1;
                } else {
                    break;
                }
            }

            return longestPrefix.Substring(0, longestMatchIndex);
        }
    }
}