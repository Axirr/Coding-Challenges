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
            if (n < 3) {
                if (n == 0) { return 0; }
                if (n == 1 || n == 2) { return 1; }
            }

            int thirdLast = 0;
            int secondLast = 1;
            int last = 1;

            for (int i = 3; i <= n; i++) {
                int triSum = last + secondLast + thirdLast;
                thirdLast = secondLast;
                secondLast = last;
                last = triSum;
            }

            return last;
        }
    }
}


/*
Idea:

Dyanmic programming tabulation up to n
*/