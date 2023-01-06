from typing import List

class Solution:
    def maxIceCream(self, costs: List[int], coins: int) -> int:
        costs.sort()
        i = 0
        costSum = 0
        for i in range(len(costs)):
            costSum += costs[i]
            if costSum > coins:
                i -= 1
                break
        return max(0, i + 1)

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
'''