from typing import List

class Solution:
    n = None
    classPrices = None
    memoCache = None
    def maxProfit(self, prices: List[int]) -> int:
        if len(prices) <= 1:
            return 0
        s0 = [0]
        s1 = [-prices[0]]
        s2 = [-10000]
        for i in range(1, len(prices)):
            s0.append(max(s0[i - 1], s2[i - 1]))
            s1.append(max(s1[i - 1], s0[i - 1] - prices[i]))
            s2.append(s1[i - 1] + prices[i])
        return max(s0[len(prices) - 1], s2[len(prices) - 1])

    def outerRecMaxProfit(self, prices: List[int]) -> int:
        self.n = len(prices)
        self.classPrices = prices
        self.memoCache = {}
        result = self.recMaxProfit(0, False, False)
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
    prices = [1,2]
    maxProfit = sol.maxProfit(prices)
    print(maxProfit)
    assert maxProfit == 1
    prices = [2,1]
    maxProfit = sol.maxProfit(prices)
    print(maxProfit)
    assert maxProfit == 0

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

Recursive works, and is fast, but want to do it with dynamic programming

priceIndex, isOwn, isCooldown

options control flow

if isOwn:
    skip
    sell
if not isOwn:
    if isCooldown:
        skip
            best[priceIndex + 1, ]
    else:
        skip
        buy

priceIndex, [isOwn, isCooldown]

Can we always control isOwn, isCooldown we are at as long as length is longer than 1?
    No, getting to isOwn without skip necessitates isCooldown = True

Top down building works better because we know our starting flags: isOwn = False, isCooldown = False

Purely taking max would have to pass along conditions

Dynamic generally:
    d[i] = d[i-1] + something
    But with multiple indexes, can also be a max/min operation
    E.g. d[i,j] = max[d[i, j-1], d[i-1,j]] + something
    But in that case, it's an unconditional max
        Can always take either
    Here, would seem to need to maintain multiple solutions, covering permutations of flags
    E.g. d[i, True, True] = ...
        d[i, True, False] = ...
    Then would eventually get to d[0, False, False]
    Less efficient than recursive if that's correct

isOwn   isCooldown  ->      
F       F               T,F     T,F
F       T               F       F
T       F               T,F     T,F
T       T               impossible


Skimmed a dynamic programming solution, now trying to recreate on my own
    Kept 3 sets
    buySet
    sellSet
    restSet
Once construct these, answer is max(sellSet, restSet)
Starting values:
    buySet: [-maxInt]
    sellSet: prices[-1]
    skipSet: 0
For non-base case:
    sellSet either comes from buySet or restSet
    buySet comes skipSet
    skipSet can come from anywhere?


Realized very late that this is a top down not bottom up solution
Ended up just having to copy the solution
Was close but couldn't get it working
'''