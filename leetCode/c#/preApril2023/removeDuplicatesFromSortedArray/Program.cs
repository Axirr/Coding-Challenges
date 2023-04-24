using System;
using System.Diagnostics;
using System.Linq;

namespace RemoveDuplicatesFromSortedArray
{
    class Program {
        public static void Main(string[] args) {
            int[] nums = new int[] {1,1,2};
            int numRemaining;
            Solution sol = new Solution();
            int[] correctNums = new int[] {};

            nums = new int[] {0,0,1,1,1,2,2,3,3,4};
            numRemaining = sol.RemoveDuplicates(nums);
            Console.WriteLine(nums);
            Console.WriteLine(numRemaining);
            correctNums = new int[] {0, 1, 2, 3, 4, 2, 2, 3, 3, 4};
            Debug.Assert(numRemaining == 5);
            Debug.Assert(Enumerable.SequenceEqual(nums, correctNums));

            nums = new int[] {1,1,2};
            numRemaining = sol.RemoveDuplicates(nums);
            Console.WriteLine(nums);
            Console.WriteLine(numRemaining);
            correctNums = new int[] {1,2,2};
            Debug.Assert(numRemaining == 2);
            Debug.Assert(Enumerable.SequenceEqual(nums, correctNums));
        }
    }
    public class Solution {
        public int RemoveDuplicates(int[] nums) {
            if (nums.Length == 0) return 0;

            int removeCount = 0;
            int i = 1;
            int last = nums[0];
            while (i < nums.Length) {
                int current = nums[i];
                if (current == last) { removeCount += 1; }
                else {
                    nums[i - removeCount] = current;
                }

                last = current;
                i += 1;
            }

            return nums.Length - removeCount;
        }
    }
}

/*
*/

/*
Ideas:

Naive:
    Keep count of duplicates removed
    If not duplicate, shift forward that amount
    If duplicate, just increment count and move to next
*/