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
    public int MaxProfit(int[] prices) {
        if (prices.Length == 1) { return 0; }
        
        // Optimals for index if own a share there
        int[] ownOptimals = new int[prices.Length];
        ownOptimals[prices.Length - 1] = prices[prices.Length - 1];

        // Optimals for index if don't own a share there
        int[] dontOwnOptimals = new int[prices.Length];
        dontOwnOptimals[prices.Length - 1] = 0;

        for (int i=prices.Length - 2; i >= 0; i--) {
            int maxProfit = 0;
            int actionResult = 0;
            // Update own
            // Sell
            actionResult = prices[i];
            maxProfit = Math.Max(maxProfit, actionResult);

            // Skip
            actionResult = ownOptimals[i + 1];
            maxProfit = Math.Max(maxProfit, actionResult);
            ownOptimals[i] = maxProfit;

            maxProfit = 0;
            // Update dont own
            // Buy
            actionResult = -prices[i] + ownOptimals[i + 1];
            maxProfit = Math.Max(maxProfit, actionResult);

            // Skip
            actionResult = dontOwnOptimals[i + 1];
            maxProfit = Math.Max(maxProfit, actionResult);
            dontOwnOptimals[i] = maxProfit;
        }


        return dontOwnOptimals[0];
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