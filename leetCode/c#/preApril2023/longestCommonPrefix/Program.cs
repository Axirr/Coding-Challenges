using System;
using System.Diagnostics;
using System.Linq;

namespace longestCommonPrefix {
    internal class Program {
        public static void Main(string[] args) {
            Solution sol = new Solution();
            string[] strs = new String[0];
            string resultString = "Hello";

            strs = new String[] { "flower","flow","flight" };
            resultString = sol.LongestCommonPrefix(strs);
            Console.WriteLine(resultString);
            Debug.Assert(resultString == "fl");

            strs = new String[] { "reflower","flow","flight" };
            resultString = sol.LongestCommonPrefix(strs);
            Console.WriteLine(resultString);
            Debug.Assert(resultString == "");
        }
    } 

    public class Solution {
        public string LongestCommonPrefix(string[] strs) {
            if (strs.Length == 1)  { return strs[0]; }

            string shortestWord = strs[0];
            foreach (var myStr in strs)  { if (myStr.Length < shortestWord.Length)  { shortestWord = myStr; }}

            int longestMatchIndex = 0;
            for (int i = 0; i < shortestWord.Length; i++) {
                char letter = shortestWord[i];
                for (int j = 0; j < strs.Length; j++) {
                    if (letter != strs[j][i]) {
                        return shortestWord.Substring(0, longestMatchIndex);
                    }
                }
                longestMatchIndex += 1;
            }

            return shortestWord.Substring(0, longestMatchIndex);
        }
    }
}