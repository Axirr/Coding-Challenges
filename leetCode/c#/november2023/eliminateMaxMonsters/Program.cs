using System.Collections.Generic;
using System.Diagnostics;

class Program {
    public static void Main() {
        int[] dist;
        int[] speed;
        int result;
        Solution sol = new();

        dist = new int[] {3,5,7,4,5};
        speed = new int[] {2,3,6,3,2};
        result = sol.EliminateMaximum(dist, speed);
        Console.WriteLine("final result {0}", result);
        Debug.Assert(result == 2);

        dist = new int[] {1, 3, 4};
        speed = new int[] {1,1,1};
        result = sol.EliminateMaximum(dist, speed);
        Console.WriteLine("final result {0}", result);
        Debug.Assert(result == 3);

        dist = new int[] {1,1,2,3};
        speed = new int[] {1,1,1,1};
        result = sol.EliminateMaximum(dist, speed);
        Console.WriteLine("final result {0}", result);
        Debug.Assert(result == 1);

        dist = new int[] {3,2,4};
        speed = new int[] {5,3,2};
        result = sol.EliminateMaximum(dist, speed);
        Console.WriteLine("final result {0}", result);
        Debug.Assert(result == 1);
    }
}

public class Solution {
    public int EliminateMaximum(int[] dist, int[] speed) {
        int numberKilled = 1;
        List<float> arrivalTime = new();
        int n = dist.Length;
        for (int i = 0; i < n; i++) {
            arrivalTime.Add((float)dist[i] / speed[i]);
        }
        arrivalTime.Sort();
        for (int i = 1; i < n; i++) {
            float currentTime = arrivalTime[i];
            if (currentTime <= i)  break;
            numberKilled += 1;
        }

        return numberKilled;
    }
}

/*
Data range/assumptions:
number of monsters n: [1, 10^5]
values of distance and speed: [1, 10^5]
*/

/*
Tests:
n = 1
n = max
fast but distant monster
slow but close monster
*/

/*
Ideas:

Naive:
    Calculate monster arrival time
        Distance[i] / velocity[i]
    Sort from first arrival time to last arrival time
    Linear traversal until gap between ith and i+1 is <= 1 minute

    Time complexity:
        Time calculation: n
        Sort: n logn
        Linear traversal: n worst case

Seems you can eliminate monsters before they arrive
    Can use arrival time to determine how many monsters killed
        E.g. if next monster arrives at 3, the first 3 monsters have been eliminated
Need to know elimination time of last monster to determine if next one can be eliminated
    elimTime = Math.min(sequence, )
If any monsters time is <= than it's index + 1, can't defeat
    Necessary, but is it sufficient?
*/

/*
Completion time (minutes): 33
Question difficulty: Medium
How did it go (0 - 6): 3
    Didn't understand the problem with initial attempt
    Second solution worked but I didn't confirm with test cases before I implemented it
How many runs before working solution: 2
*/