using System.Diagnostics;
using System.Collections.Generic;

class Program {
    public static void Main(string[] args) {
        Solution sol = new Solution();
        int[] prices = new int[] {};
        int maxProfit;

        prices = new int[] {7,1,5,3,6,4 };
        maxProfit = sol.MaxProfit(prices);
        Console.WriteLine(maxProfit);
        Debug.Assert(maxProfit == 5);
    }

}
public class Solution {
    private Dictionary<(int, int), int> cache = new Dictionary<(int, int), int>();
    private int[] classPrices = new int[] {};
    public int MaxProfit(int[] prices) {
        if (prices.Length == 1) { return 0; }

        cache = new Dictionary<(int, int), int>();
        classPrices = prices;
        return HelperMaxProfit(0, -1);
    }

    public int HelperMaxProfit(int startIndex, int stockValue) {
        if (startIndex >= classPrices.Length)  { return 0; }

        int resultProfit = 0;
        (int, int) tupleArgs = (startIndex, stockValue);
        if (cache.ContainsKey(tupleArgs))  { return cache[tupleArgs]; }
        int potentialProfit;
        if (stockValue != -1) {
            // Sell
            // potentialProfit = classPrices[startIndex] + HelperMaxProfit(startIndex + 1, -1);
            potentialProfit = classPrices[startIndex];
            resultProfit = Math.Max(resultProfit, potentialProfit);

            // No action
            potentialProfit = HelperMaxProfit(startIndex + 1, 1);
            resultProfit = Math.Max(resultProfit, potentialProfit);
        } else {
            // Buy
            potentialProfit = -classPrices[startIndex] + HelperMaxProfit(startIndex + 1, 1);
            resultProfit = Math.Max(resultProfit, potentialProfit);

            // No action
            potentialProfit = HelperMaxProfit(startIndex + 1, -1);
            resultProfit = Math.Max(resultProfit, potentialProfit);
        }
        cache[tupleArgs] = resultProfit;
        return resultProfit;
    }
}

/*
Data range/assumptions:
prices length n: [1, 10^5]
prices value: [0, 10^4]
*/

/*
Tests:
n = 1
n = 10^5
optimal doesn't buy on first day
extreme profit in middle of bad spell
*/

/*
Ideas:

Naive:
    Keep state, have bought or not
    Own, 2 choices:
        Sell
        Keep
    Don't own, 2 choices:
        Buy
        Skip
    Keep and Skip are more generally no action

    Take max of current choices recursively

Better: dynamic programming, back to front
    -1: no action always best, profit 0
    -2: buy profit or skip
Need two tabulate two different sets:
    ownStocksOptimal
    dontOwnOptimal
*/