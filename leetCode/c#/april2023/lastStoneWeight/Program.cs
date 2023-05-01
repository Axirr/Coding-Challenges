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
        PriorityQueue<int, int> myHeap = new PriorityQueue<int, int>();

        foreach (int element in stones) {
            myHeap.Enqueue(-element, -element);
        }

        while (myHeap.Count > 1) {
            int heavyStone = myHeap.Dequeue();
            int lightStone = myHeap.Dequeue();

            if (heavyStone != lightStone) {
                int newWeight = heavyStone - lightStone;
                myHeap.Enqueue(newWeight, newWeight);
            }
        }

        if (myHeap.Count <= 0) return 0;

        return -1 * myHeap.Peek();
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
Completion time (minutes): 16
Question difficulty: Easy
How did it go (0 - 6): 4
    Naive solution was easy
    Had a bit of trouble getting a heap structure from C# for a better solution
*/