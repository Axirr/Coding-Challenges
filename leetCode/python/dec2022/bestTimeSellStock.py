from typing import List

class Solution:
    n = None
    classPrices = None
    memoCache = None
    def maxProfit(self, prices: List[int]) -> int:
        self.n = len(prices)
        self.classPrices = prices
        self.memoCache = {}
        result = self.recMaxProfit(0, False, False)
        for i in range(self.n):
            if (i, True) in self.memoCache:
                print((i, True), end = " ")
                print(self.memoCache[(i, True)])
            if (i, False) in self.memoCache:
                print((i, False), end = " ")
                print(self.memoCache[(i, False)])
        return result
    
    def recMaxProfit(self, priceIndex, isOwn, isCooldown):
        if (priceIndex, isOwn, isCooldown) in self.memoCache:
            return self.memoCache[priceIndex, isOwn, isCooldown]
        else:
            if priceIndex == (self.n - 1):
                if isOwn:
                    result = self.classPrices[-1]
                else:
                    result = 0
                self.memoCache[(priceIndex, isOwn, isCooldown)] = result
                return result
            else:
                newPriceIndex = priceIndex + 1
                skipProfit = self.recMaxProfit(newPriceIndex, isOwn, False)
                buyProfit = 0
                sellProfit = 0
                if isOwn:
                    sellProfit = self.classPrices[priceIndex] + self.recMaxProfit(newPriceIndex, not isOwn, True)
                elif not isCooldown:
                    buyProfit = -self.classPrices[priceIndex] + self.recMaxProfit(newPriceIndex, not isOwn, False)
                result = max(skipProfit, buyProfit + sellProfit)
                self.memoCache[(priceIndex, isOwn, isCooldown)] = result
                return result
        

def main():
    sol = Solution()
    prices = [1]
    maxProfit = sol.maxProfit(prices)
    print(maxProfit)
    assert maxProfit == 0
    prices = [1,2,3,0,2]
    maxProfit = sol.maxProfit(prices)
    print(maxProfit)
    assert maxProfit == 3

main()

'''
Data range/assumptions:
Prices length: [1, 5000]
Prices: [0, 1000]
'''

'''
Tests:
Single price
Many prices
Buying on first day is wrong
Hugely profitable single day
'''

'''
Ideas:

Naive recursive:
    Two paths:
        Own stocks
            max(buy, skip)
        Don't own
            max(sell, skip)

    Time complexity: branching factor 2 each n -> n^2

Recursive with memo:
    memo based on truncated price list/price list index plus own, don't own
        And price bought at? Or is it just about the money you get at that point
    E.g. [1,5], answer is buy sell

    Time complexity: 2n?
        Single traversal of price list for own and don't own
        Then constant time to get already calculated solutions

Dynamic programming bottom up:
    Two paths: own/don't own
    Own:
        Base case: len 1 = sell
        Len 2: max(skip + best[i+1], sell + best[i+1])
    Don't own:
        Base case: len 1 return 0
        Len 2: action that takes you to max
        
'''