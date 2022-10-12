using System;
using System.Collections;

class Program {
    public static void Main(string[] args) {
        Solution mySol = new Solution();
        int[] myNums = {6,6,7,82};
        int resultInt = mySol.LargestPerimeter(myNums);
        Console.WriteLine(resultInt);
    }

}

public class Solution {
    public int LargestPerimeter(int[] nums) {
        int resultInt = 0;
        Array.Sort(nums, (x, y) => y.CompareTo(x));
        for (int i = 0; i < nums.Length; i++) {
            for (int j = i + 1; j < nums.Length; j++) {
                for (int k = j + 1; k < nums.Length; k++) {
                    if ( (nums[j] + nums[k]) > nums[i]) {  return nums[i] + nums[j] + nums[k]; }
                }
            }
        }
        return resultInt;
    }
}

/*
Data range/assumptions:
Minimum 3 lengths
Nums can be large
*/

/*
Test cases:
3 lengths
Impossible triangle
    Long side, two sides can't come back
*/

/*
Ideas:

What makes a triangle impossible?
    Long side, that the other two sides can't come back from
        longLen >= short1 + short2
            Necessary, but not sufficient
                Minor deflection required for non-overlap, which reduces the functional length of the short ones
    Check condition for all 3 sides, or just longest?
    Other scenarios:
        Two short sides, long can't fit
            Same as above, just from a different perspective
        Two long sides, short can't reconnect
            Solvable by rotation

Other restrictions?
    Can always make two short sides shorter with more extreme angles
        As angle approaches 180, opposite side becomes the longer one

Naive:
    Sort to get largest sides
    From largest to smallest, combine until validity condition met
    Return sum
    Time Complexity: n^3
        for i for j for k

Better:
    Exclude sides that are definitely too big
        E.g. because even double max remaining won't work for them

Approach:
    Sort
    Check
*/