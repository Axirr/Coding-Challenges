using System;
using System.Diagnostics;
using System.Collections.Generic;
using System.Text;

class Program {
    public static void Main(string[] args) {
        Solution sol = new Solution();
        int[] nums1;
        int[] nums2;
        int m;
        int n;

        nums1 = new int[] { 1,2,3,0,0,0 };
        m = 3; 
        nums2 = new int[] {2,5,6};
        n = 3;
        sol.Merge(nums1, m, nums2, n);
        foreach (int myInt in nums1) { Console.WriteLine(myInt); }
    }

}
public class Solution {
    public void Merge(int[] nums1, int m, int[] nums2, int n) {
        if (n == 0) { return; }

        int[] tempArray;
        if (m == 0) { tempArray = nums2; }
        else {
            tempArray = new int[m + n];
            int nums1currentIndex = 0;
            int nums2currentIndex = 0;
            int i = 0;
            while (nums1currentIndex < m && nums2currentIndex < n) {
                int nextToAdd = nums1[nums1currentIndex];
                nums1currentIndex += 1;
                if (nums2[nums2currentIndex] < nextToAdd) {

                    nextToAdd = nums2[nums2currentIndex];
                    nums2currentIndex += 1;
                    nums1currentIndex -= 1;
                }
                tempArray[i] = nextToAdd;
                i += 1;
            }

            while (nums1currentIndex < m) {
                tempArray[i] = nums1[nums1currentIndex];
                nums1currentIndex += 1;
                i += 1;
            }

            while (nums2currentIndex < n) {
                tempArray[i] = nums2[nums2currentIndex];
                nums2currentIndex += 1;
                i += 1;
            }
        }

        for (int j=0; j < tempArray.Length; j++) { nums1[j] = tempArray[j]; }
    }
}

/*
Data range/assumptions:
nums 1 length m + n: []
nums 2 length n
m,n: [0, 200]
values: {very small, very large}
*/

/*
Tests:
n = 1
n = 200
*/

/*
Ideas:

Naive:
    Make new array
    Merge
    Copy new array into nums1

Better: in place
    Store anything vacated in the other array, from the place it was vacated from
    Don't increment index in other one, so it's still pointing at this location
*/