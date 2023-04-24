using System;
using System.Diagnostics;

class Program {
    static public void Main() {
        Solution sol = new Solution();
        int low;
        int high;
        int countOdd;

        low = 3;
        high = 7;
        countOdd = sol.CountOdds(low, high);
        Console.WriteLine(countOdd);
        Debug.Assert(countOdd == 3);

        low = 8;
        high = 10;
        countOdd = sol.CountOdds(low, high);
        Console.WriteLine(countOdd);
        Debug.Assert(countOdd == 1);
    }
}
public class Solution {
    public int CountOdds(int low, int high) {
        if (low == high)  { return low % 2; }

        int oddCount = (high - low) / 2 + high % 2 + low % 2;
        if (low % 2 == 1 && high % 2 == 1)  { oddCount -= 1; }

        return oddCount;
    }
}