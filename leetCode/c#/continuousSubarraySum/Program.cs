public class Solution {
    public bool CheckSubarraySum(int[] nums, int k) {
        if (nums.Length == 1) {  return false;  };
        Dictionary<int, int> remainderDict = new Dictionary<int, int>();
        remainderDict.Add(0,0);
        int sum = 0;
        int currentMod;
        for (int i = 0; i < nums.Length; i++) {
            sum += nums[i];
            currentMod = sum % k;
            if (!remainderDict.ContainsKey(currentMod)) {
                remainderDict.Add(currentMod, i + 1);
            } else {
                if (remainderDict[currentMod] < i) {
                    return true;
                }
            }
        }
        return false;
    }
}

class Program {
    public static void Main(string[] args) {
        Solution mySol = new Solution();
        bool resultBool;
        int k;
        int[] firstNums = {1};
        k = 1;
        resultBool = mySol.CheckSubarraySum(firstNums, k);
        if (resultBool) {
            Console.WriteLine("first");
            Console.WriteLine(resultBool);
            Console.WriteLine("Should be False");
        }
        int[] secondNums = {23,2,4,6,7};
        k = 6;
        resultBool = mySol.CheckSubarraySum(secondNums, k);
        if (!resultBool) {
            Console.WriteLine("second");
            Console.WriteLine(resultBool);
            Console.WriteLine("Should be True");
        }
        int[] thirdNums = {1, 3, 3};
        k = 6;
        resultBool = mySol.CheckSubarraySum(thirdNums, k);
        if (!resultBool) {
            Console.WriteLine("third");
            Console.WriteLine(resultBool);
            Console.WriteLine("Should be True");
        }
        int[] fourthNums = {3, 3};
        k = 6;
        resultBool = mySol.CheckSubarraySum(fourthNums, k);
        if (!resultBool) {
            Console.WriteLine("fourth");
            Console.WriteLine(resultBool);
            Console.WriteLine("Should be True");
        }
        int[] fifthNums = {23,2,6,4,7};
        k = 13;
        resultBool = mySol.CheckSubarraySum(fifthNums, k);
        if (resultBool) {
            Console.WriteLine("fifth");
            Console.WriteLine(resultBool);
            Console.WriteLine("Should be False");
        }
        int[] sixthNums = {1,3,6,0,9,6,9};
        k = 7;
        resultBool = mySol.CheckSubarraySum(sixthNums, k);
        if (!resultBool) {
            Console.WriteLine("fifth");
            Console.WriteLine(resultBool);
            Console.WriteLine("Should be True");
        }

   }

}

/*
Data range/assumptions:
Large nums
Non-empty
k can be large
*/

/*
Test cases:
Single element
Large nums
Large k
Whole array sums to k
Last two elements sum to k
*/

/*
Ideas:

Naive:
    Expand window and running sum until greater than k
    Move left bound in until under k again
        And reduce running sum accordingly
    Time complexity:
        2n?
    DOESN"T WORK

    Full traversal works, but not efficient enough

Better:
    Take modulus of all numbers
    Then search for matches
        But search boils down to the same thing in worst case
            Especially with large k

Looked up solution
*/

/*
Metrics:
Pursued wrong solution for long time: yes
*/