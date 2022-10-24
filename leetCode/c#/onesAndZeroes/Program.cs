using System;

class Program {
    public static void Main(string[] args) {
        Solution mySol = new Solution();
        string[] stringArray = {"10","0001","111001","1","0"};
        int m = 5;
        int n = 3;
        int resultInt = mySol.FindMaxForm(stringArray, m, n);
        Console.WriteLine("Should be 4");
    }

}

public class Solution {
    public int FindMaxForm(string[] strs, int m, int n) {
        int resultInt = 0;

        return resultInt;
    }
}

/*
Data range/assumptions:
Non-empty
Medium length strings
Medium length array of strings
m and n are non-zero
*/

/*
Single string
Large data (600 strings, of max string size)
Solution where the smallest are actually not the best
    E.g. small have a lot of 0's, but n is low
Few 0's but a lot of 1's
Large m, small n
    And v.v.
*/

/*
Ideas:

Naive:
    Try all combos
        Really bad

Better:
    Sort by length
    Try smallest first
    Instead of just length, organize by count of 0's or 1's?
        Works for them individually, but then they could conflict
            A lot of 0's, not many 1's, and v.v.
    Symmetry of m and n dictate likely best candidates?
        m >> n, we should focus on least n

Length is only way to ensure search optimally
    Fully explore with shortest
    But then

Search algorithm where we explore the currest shortest
    But add another condition (max stringNum)
Construct tree?

A*
    Nodes
    Frontier, ordered by a cost function?
        (stringNum, currentLen)
*/