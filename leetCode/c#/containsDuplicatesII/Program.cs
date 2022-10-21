
class Program {
    public static void Main(string[] args) {
        Solution mySol = new Solution();
        int[] intArray = {1,2,3,1,2,3};
        int k = 2;
        bool resultBool = mySol.ContainsNearbyDuplicate(intArray, k);
        Console.WriteLine(resultBool);
        Console.WriteLine("Should be False");
        int[] intArray2 = {1,2,3,1};
        k = 3;
        resultBool = mySol.ContainsNearbyDuplicate(intArray, k);
        Console.WriteLine(resultBool);
        Console.WriteLine("Should be True");
    }

}

public class Solution {
    public bool ContainsNearbyDuplicate(int[] nums, int k) {
        Dictionary<int, int> numsDict = new Dictionary<int, int>();
        for (int i = 0; i < nums.Length; i++) {
            int num = nums[i];
            if (numsDict.ContainsKey(num)) {
                if (numsDict[num] > 0) {  return true;  }
            } else {
                numsDict.Add(num, 0);
            }

            numsDict[num] += 1;
            int deleteIndex = i - k;
            if (deleteIndex >= 0) {
                numsDict[nums[deleteIndex]] -= 1;
            }
        }
        return false;
    }
}

/*
Data range/assumptions:
Non-empty
Large length
k can be large
k can be 0?
*/

/*
Single number
k = 0
large k
large nums
*/

/*
Ideas:

Naive:
    Maintain a slice of the array of k length
    For each num in nums
        Check if nums is in k slice
    
    Maintaining slice:
        If len = k, delete oldest
*/