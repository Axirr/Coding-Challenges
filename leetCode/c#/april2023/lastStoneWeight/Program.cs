using System;
using System.Diagnostics;
using System.Collections.Generic;
using System.Text;

class Program {
    public static void Main(string[] args) {
        Solution sol = new Solution();
        int[] stones;
        int result;

        stones = new int[] {2,7,4,1,8,1};
        result = sol.LastStoneWeight(stones);
        Console.WriteLine(result);
        Debug.Assert(result == 1);

        stones = new int[] {2,2};
        result = sol.LastStoneWeight(stones);
        Console.WriteLine(result);
        Debug.Assert(result == 0);
    }

}

public class Solution {
    public int LastStoneWeight(int[] stones) {
        Array.Sort(stones);

        int endIndex = stones.Length - 1;

        while (endIndex > 0) {
            int heavyStone = stones[endIndex];
            int lightStone = stones[endIndex - 1];
            Console.WriteLine("heavyStone {0}", heavyStone);
            Console.WriteLine("lightStone {0}", lightStone);

            if (heavyStone == lightStone)  {
                endIndex -= 2;
            } else {
                endIndex -= 1;
                stones[endIndex] = heavyStone - lightStone;
            }

            Array.Sort(stones);
        }

        if (endIndex < 0) return 0;

        return stones[0];
    }

}

/*
Data range/assumptions:
stones length n: [1, 30]
weight: [1, 1000]
*/

/*
Tests:
n = 1
n = 30
weight = 1
weight = 1000
large variance
all the same
*/

/*
Ideas:

Naive:
    Sort in ascending order
    Pop, smash, append until length is 1
*/

/*
Completion time (minutes):
Question difficulty:
How did it go (0 - 6):
*/