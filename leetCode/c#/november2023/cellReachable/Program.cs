using System.Diagnostics;

class Program {
    public static void Main() {
        int sx;
        int sy;
        int fx;
        int fy;
        int t;
        bool result;
        Solution sol = new();
        
        sx = 2; sy = 4; fx = 7; fy = 7; t = 6;
        result = sol.IsReachableAtTime(sx, sy, fx, fy, t);
        Console.WriteLine("final result {0}", result);
        Debug.Assert(result);

        sx = 3; sy = 1; fx = 7; fy = 3; t = 3;
        result = sol.IsReachableAtTime(sx, sy, fx, fy, t);
        Console.WriteLine("final result {0}", result);
        Debug.Assert(!result);

        sx = 1; sy = 4; fx = 1; fy = 3; t = 1;
        result = sol.IsReachableAtTime(sx, sy, fx, fy, t);
        Console.WriteLine("final result {0}", result);
        Debug.Assert(result);
    }
}

public class Solution {
    public bool IsReachableAtTime(int sx, int sy, int fx, int fy, int t) {
        int xDistance = Math.Abs(fx - sx);
        int ydistance = Math.Abs(fy - sy);
        int diagonalDistance = Math.Min(xDistance, ydistance);
        int straightDistance = Math.Max(xDistance, ydistance) - diagonalDistance;
        int totalDistance = diagonalDistance + straightDistance;
        
        if (t == 1) {
            if (totalDistance == 0)  return false;
        }

        return totalDistance <= t; 
    }
}

/*
Data range/assumptions:
dimensions n: [1, 10^9]
time t: [1, 10^9]
*/

/*
Tests:
n = 1
n = max
t min
t max
destination only choice, neighbour, n > 1
    I.e. forced to go to end before want to
*/

/*
Ideas:

Naive:

Dealing with paths that are "too long"
    Can just go back and forth sometimes, but maybe not always?
    If distance from end is even, can go back and forth there until n = 2
        Then move to final
    This should work in most situations

More generally, any path with length > 1 has a spot where you can -2 repeatedly
    So if total time - path % 2 = 0, it works
Any path >= 3 has a spot that can work
    If not on that spot, move one and on that spot
    1 2 3

No blocking cells
Minimum distance is diagonal until match on one coordinate, then straight
*/

/*
Completion time (minutes): 20
Question difficulty: Medium
How did it go (0 - 6): 3
    Misunderstood problem initially
How many runs before working solution: 4
*/