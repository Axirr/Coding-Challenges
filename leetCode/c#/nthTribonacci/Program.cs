using System;
using System.Collections.Generic;
using System.Diagnostics;

namespace nthTribonacci {
    internal class Program
    {
        static void Main(string[] args)
        {
            int n = 4;
            Solution sol = new Solution();
            int nthTerm = sol.Tribonacci(n);
            Console.WriteLine(nthTerm);
            Debug.Assert(nthTerm == 4);
            n = 25;
            nthTerm = sol.Tribonacci(n);
            Console.WriteLine(nthTerm);
            Debug.Assert(nthTerm == 1389537);
        }
    }
    public class Solution {
        public int Tribonacci(int n) {
            List<int> partialResults = new List<int>() {0, 1, 1};
            // partialResults.Add(0);
            // partialResults.Add(1);
            // partialResults.Add(1);

            if (n < 3) { return partialResults[n]; }

            for (int i = 3; i <= n; i++) {
                int triSum = 0;
                triSum += partialResults[partialResults.Count - 1];
                triSum += partialResults[partialResults.Count - 2];
                triSum += partialResults[partialResults.Count - 3];
                partialResults.Add(triSum);
            }

            return partialResults[n];
        }
    }
}


/*
Idea:

Dyanmic programming tabulation up to n
*/