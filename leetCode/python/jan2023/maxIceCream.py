from typing import List
from heapq import *
from collections import Counter

class Solution:
    def maxIceCream(self, costs: List[int], coins: int) -> int:
        count = [0] * (max(costs) + 1)
        for i in range(len(costs)):
            count[costs[i]] += 1
        totalCost = 0
        totalCount = 0
        for i in range(len(count)):
            totalCost += i * count[i]
            totalCount += count[i]
            if totalCost > coins:
                while totalCost > coins:
                    totalCost -= i
                    totalCount -= 1
                break
        return totalCount

    def hashMaxIceCream(self, costs: List[int], coins: int) -> int:
        # Unclear if using a hash table but then having to sort by keys is 
        #   more efficient than initializing a list to 0 for all values
        #      n + m        vs.     n + klogk + k   where k = # of distinct costs and k <= n and possibly k << n
        count = Counter()
        for i in range(len(costs)):
            count[costs[i]] += 1
        totalCost = 0
        totalCount = 0
        keys = count.keys()
        myMinKeyHeap = []
        for key in keys:
            heappush(myMinKeyHeap, key)
        while myMinKeyHeap:
            i = heappop(myMinKeyHeap)
            totalCost += i * count[i]
            totalCount += count[i]
            if totalCost > coins:
                while totalCost > coins:
                    totalCost -= i
                    totalCount -= 1
                break
        return totalCount

    # Not sure if there is merit to this method over just sorting
    def heapMaxIceCream(self, costs: List[int], coins: int) -> int:
        myMaxHeap = []
        totalCost = 0
        totalCount = 0
        negativeCoins = -coins
        for i in range(len(costs)):
            currentCost = -costs[i]
            if totalCost + currentCost >= negativeCoins:
                heappush(myMaxHeap, currentCost)
                totalCost += currentCost
                totalCount += 1
            elif len(myMaxHeap) > 0 and myMaxHeap[0] < currentCost:
                totalCost += -heapreplace(myMaxHeap, currentCost) + currentCost
        return totalCount

def main():
    sol = Solution()
    costs = [10,6,8,7,7,8]
    coins = 5
    maxBars = sol.maxIceCream(costs, coins)
    print(maxBars)
    assert maxBars == 0
    costs = [1,6,3,1,2,5]
    coins = 20
    maxBars = sol.maxIceCream(costs, coins)
    print(maxBars)
    assert maxBars == 6
    costs = [10,2,10,10,10,10,8,2,7,8]
    coins = 25
    maxBars = sol.maxIceCream(costs, coins)
    print(maxBars)
    # assert maxBars == 4

main()

'''
Data range/assumptions:
Costs length n: [1, 10^5]
cost magnitude: [1, 10^5]
coins magnitude: [1, 10^8]
'''

'''
Tests:
n = 1
n = 10^5
Non-sorted
Large coin magnitude
Small coin magnitude
Large cost magnitude
Small cost magnitude
'''

'''
Ideas:

Naive:
    sort in ascending order and sum costs until sum greater than coin

Better: max heap
    Traverse costs, maintaining a max heap and keeping track of total sum of maxHeap
    If adding next bar would exceed coins
        Pop and push if max of heap is larger than current
        Updating current cost
    Return max heap size

    Time complexity:
        Single traversal
        But worst case, have to do a sift up operation each time
            I.e. descending costs
            nlogn
        Average case might be better?

If using a dictionary/counter, does putting the keys into a minheap help instead of sorting
    n = len(costs)
    k = # of distinct values
    m = max cost
    j = maxCostUsed in solution
    x = max unique cost values used in solution

    Count sort with count array initialied to max cost:
        Find max cost: n
        initialization of countArray: m
        traversal for counting: n
        traversal for greedy summation: worst case: m
        2n + 2m
        O(n + m)
    
    Count sort with hash table and sorting of hash keys for in order traversal:
        Count: n
        Sort keys:
            average: klogk
            worst: mlogm
        Greedy summation:
            average: x, maybe k
            worst: k = m
        Average:
            n + klogk + k   where k = # of distinct costs
            O(n + klogk)
        Worst:
            n + mlogm + m
            O(n + mlogm)

    Count sort with hash table and minHeap of keys:
        Count: n
        Construct min heap:
            average: k
            worst: m
        Traverse min heap:
            average: x pops/k pop
                klogk
            worst:
                mlogm
        Average:
            n + k + klogk
            O(n + klogk)
            Good cases: O(n + xlogx) where x < k << m
        Worst:
            n + m + mlogm
            O(n + mlogm)
'''