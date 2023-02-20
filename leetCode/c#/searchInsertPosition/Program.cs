using System;
using System.Diagnostics;

class Program {
    public static void Main(string[] args)
    {
        Solution sol = new Solution();
        int[] nums;
        int target;
        int insertIndex;

        nums = new int[] {1, 3, 5, 6};
        target = 2;
        insertIndex = sol.SearchInsert(nums, target);
        Console.WriteLine(insertIndex);
        Debug.Assert(insertIndex == 1);

        nums = new int[] {1, 3, 5, 6};
        target = 7;
        insertIndex = sol.SearchInsert(nums, target);
        Console.WriteLine(insertIndex);
        Debug.Assert(insertIndex == 4);
    }
}

public class Solution {
    public int SearchInsert(int[] nums, int target) {
        int insertIndex = 0;
        while (insertIndex < nums.Length && nums[insertIndex] < target) {
            insertIndex += 1;
        }

        return insertIndex;
    }
}

/*
Data range/assumptions:
nums length n: [1, 10^4]
values: [-10^4, 10^4]
distinct values
ascending
*/

/*
Tests:
n = 1
n = 10^4
value found
value missing
inserting in first place
insertion in last place
*/

/*
Ideas:

Naive:
    Traverse maintaining index, until find value or find higher value
*/

/*
Went well?
If not, why
*/