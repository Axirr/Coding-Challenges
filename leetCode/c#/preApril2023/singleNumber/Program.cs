using System;
using System.Diagnostics;
class Program {
    static public void Main() {
        Solution sol = new Solution();
        int[] nums;
        int resultInt;

        nums = new int[] { 2, 2, 1 };
        resultInt = sol.SingleNumber(nums);
        Console.WriteLine(resultInt);
        Debug.Assert(resultInt == 1);
    }
}
public class Solution {
    public int SingleNumber(int[] nums) {
        Dictionary<int, int> countDictionary = new Dictionary<int, int>();
        foreach (int num in nums) {
            if (countDictionary.ContainsKey(num)) {
                countDictionary.Remove(num);
            } else {countDictionary[num] = 1; }
        }
        int resultInt = nums[0];
        foreach (var keyValuePair in countDictionary) {
            if (keyValuePair.Value == 1) { 
                resultInt = keyValuePair.Key;
                break;
            }
        }
        return resultInt;
    }
}