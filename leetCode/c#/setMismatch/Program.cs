using System.Linq;


public class Solution {
    public int[] FindErrorNums(int[] nums) {
        Array.Sort(nums);
        int correctSum = (int)(nums.Length / 2.0 * (1 + nums.Length));
        int actualSum = nums.Sum();
        int missing;
        int duplicate = 0;
        if (nums[0] != 1) {
            missing = 1;
            duplicate = (actualSum + missing) - correctSum;
        } else if (nums[nums.Length - 1] != nums.Length) {
            missing = nums.Length;
            duplicate = (actualSum + missing) - correctSum;
        } else {
            int prev = nums[0];
            int currentIndex = 1;
            while (currentIndex <= (nums.Length - 1)) {
                if (prev == nums[currentIndex]) {
                    duplicate = prev;
                    break;
                }
                prev = nums[currentIndex];
                currentIndex += 1;
            }
            missing = correctSum - (actualSum - duplicate);
        }
        int[] resultArray = {duplicate, missing};
        return resultArray;
    }
}

class Program {
    public static void Main(string[] args) {
        Solution mySol = new Solution();
        int[] intArray = {1,2,3,3,5};
        int[] resultIntArray = mySol.FindErrorNums(intArray);
        foreach (var num in resultIntArray) {
            Console.WriteLine(num);
        }
        Console.WriteLine();
        int[] secondArray = {1,1};
        int[] secondResultIntArray = mySol.FindErrorNums(secondArray);
        foreach (var num in secondResultIntArray) {
            Console.WriteLine(num);
        }
        Console.WriteLine();
        int[] thirdArray = {2,2};
        int[] thirdResultIntArray = mySol.FindErrorNums(thirdArray);
        foreach (var num in thirdResultIntArray) {
            Console.WriteLine(num);
        }
        Console.WriteLine();
        int[] fourthArray = {1,5,3,2,2,7,6,4,8,9};
        int[] fourthResultIntArray = mySol.FindErrorNums(fourthArray);
        foreach (var num in fourthResultIntArray) {
            Console.WriteLine(num);
        }
        Console.WriteLine();
    }

}

/*
Data range/assumptions:
Non-empty, min 2 entries
Large length
*/

/*
2 length set
Large set
Missing largest
Missing smallest
*/

/*
Ideas:

Naive:
    Sort
    Traverse checking both:
        Is current duplicate of previous
        Is current not +1 previous (i.e. deleted)

Better:
    Traverse with count dictionary
        Helps for duplicate, not for missing
    If had max/min, would help determine missing 

Sum, max, min:
    Traverse keeping track of max, min, and a running sum
    Count dictionary for duplicates
    Use max min to calculate correct sum
    Compare to actual sum, tells distance from duplicate?
    
    Intriguing, but seems over built

2n version:
    Traverse, looking for dups, getting max and min
    Using count dictionary
        Complexity: n
    Then go through count dict looking for all keys until find missing one


Didn't realize it was from 1 to n
That simplifies?
Can determine correct sum from 1 to nums.Length
actualSum = correctSum - duplicate + missing
*/