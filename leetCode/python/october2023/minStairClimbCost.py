from typing import List

class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        pass

    def naiveMinCostClimbingStairs(self, cost: List[int]) -> int:
        return self.recursiveCost(0, cost, 0)

    def recursiveCost(self, currentStep, cost: List[int], level:int) -> int:
        print("currentStep %d" % currentStep)
        print("level %d" % level)
        if currentStep > len(cost) - 1:  return 0
        currentCost:int = cost[currentStep]
        minFutureCost:int = 0
        if currentStep != len(cost) - 1:
            minFutureCost = self.recursiveCost(currentStep + 1, cost, level + 1)
            minFutureCost = min(minFutureCost, self.recursiveCost(currentStep + 2, cost, level + 1))
        returnValue:int = currentCost + minFutureCost
        print("return value %d" % returnValue)
        return returnValue

def mainMinCostClimbingStairs():
    cost: List[int] 
    result: int
    correctResult: int
    sol = Solution()
    
    cost = [10,15,20]
    correctResult = 15
    result = sol.naiveMinCostClimbingStairs(cost)
    print("final result %d" % result)
    print("correct result %d" % correctResult)
    assert(result == correctResult)

if __name__ == "__main__":
    mainMinCostClimbingStairs()

"""
Data range/assumptions:
"""

"""
Tests:
"""

"""
Ideas:

Naive:
    Recursive sum

Better:
    Dynamic programming backwards from top step
"""

"""
Completion time (minutes):
Question difficulty:
How did it go (1 - 6):
"""