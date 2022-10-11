// See https://aka.ms/new-console-template for more information
class Program {
    public static void Main (string[] args) {
        Solution mySol = new Solution();
        int[] myArray = {0,0,0,0,0,0,1,2,1};
        bool resultBool = mySol.IncreasingTriplet(myArray);
        Console.WriteLine(resultBool);
        int[] myArray2 = {5,1,5,5,2,5,4};
        resultBool = mySol.IncreasingTriplet(myArray2);
        Console.WriteLine(resultBool);
        int[] myArray3 = {20,100,10,12,5,13};
        resultBool = mySol.IncreasingTriplet(myArray3);
        Console.WriteLine(resultBool);
    }

    public class Solution {
        public bool IncreasingTriplet(int[] nums) {
            if (nums.Length < 3) {  return false;  }

            int runningMin = nums[0];
            int lowAboveMin = nums[1];
            int currentNum;
            int prev = nums[1];

            for (int i = 2; i < nums.Length; i++) {
                currentNum = nums[i];

                // This seems like it should be at the end, but needs to be here to pass the tests with this structure
                // Possibly buggy for some inputs? Maybe not though
                runningMin = Math.Min(runningMin, prev);

                if (lowAboveMin <= runningMin) {
                    lowAboveMin = currentNum;
                } else {
                    if (lowAboveMin > runningMin & currentNum > lowAboveMin) {  return true;  }

                    if (currentNum < lowAboveMin & currentNum > runningMin) {  lowAboveMin = currentNum;  }
                }

                prev = currentNum;
            }
            return false;
        }
    }
}

/*
Data range/assumptions:
Non-empty
Large n
Large values
*/

/*
Nums less than 3
    Return false
No solution
First and last two (max separation)
Last three
*/

/*
Ideas:

Naive:
    triple loop
    Approx n ^ 3 worst case
        Need to check all j and all k for each i
    Bad

Better:
    Sorted array, search for values faster?
        But what values? Range not value
    Dynamic programming:
        Base case [i,j]
            If not a valid pair, then cannot be a valid triplet
            Move on and ignore
    Sliding window:
        If can't find j for an i, can the j become our I and we skip?
        No, imagine very high first
            [99, 3, 4, 5]
    As traverse, record if a valid i/j
        Valid i/j: has at least one value large than it
        Going forward
        max[i...end], max[i + 1]end
        Then if invalidate j or k, can quickly assess if potentially valid i?
        And can definitively determine if valid j
            Since only need one lower
            i needs two lower
                Or one valid j
    More formally:
        Traverse looking for valid j's
            (index, value)
            if exists value greater than value later in array
                Add index to valid j's
    And can also check for i by maintaining min value before j
    if (runningMin < value && runningMax < value)

runningMin = nums[0]
lowAboveMin = nums[1]
prev = nums[0]
for i in range(2, len(nums)):
    currentNum = nums[i]
    if (lowAboveMin > runningMin and currentNum > lowAboveMin):     return True
    runningMin = min(runningMin, prev)
    lowAboveMin = min(lowAboveMin, i)
    prev = current
*/