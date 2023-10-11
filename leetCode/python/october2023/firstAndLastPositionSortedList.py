from typing import List

class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        result: List[int] = [-1,-1]
        n: int = len(nums)
        if n == 0:  return result

        lowIndex = self.binarySearchMaxOrMin(nums, target, False)
        if lowIndex != -1:
            result[0] = lowIndex
            result[1] = self.binarySearchMaxOrMin(nums, target, True, lowIndex)

        return result
    
    def binarySearchMaxOrMin(self, nums: List[int], target: int, lookingForMax: bool, low: int = 0):
        middle: int
        high: int = len(nums) - 1
        resultIndex: int = -1

        while high >= low:
            middle = (high + low) // 2
            value: int = nums[middle]
            if value == target:
                resultIndex = middle
                if lookingForMax:
                    low = middle + 1
                else:
                    high = middle - 1
            elif value > target:
                high = middle - 1
            else:
                low = middle + 1

        return resultIndex
        
def mainFirstAndLastPositionSortedList():
    nums: List[int]
    target: int
    correctOutput: List[int]
    result: List[int]
    sol: Solution = Solution()

    nums = [5,7,7,8,8,10]
    target = 8
    correctOutput = [3,4]
    result = sol.searchRange(nums, target)
    print("final result %s" % result)
    print("correct result %s" % correctOutput)
    assert(result == correctOutput)

    nums = [5,7,7,8,8,10]
    target = 6
    correctOutput = [-1,-1]
    result = sol.searchRange(nums, target)
    print("final result %s" % result)
    print("correct result %s" % correctOutput)
    assert(result == correctOutput)

    nums = []
    target = 0
    correctOutput = [-1,-1]
    result = sol.searchRange(nums, target)
    print("final result %s" % result)
    print("correct result %s" % correctOutput)
    assert(result == correctOutput)


if __name__ == "__main__":
    mainFirstAndLastPositionSortedList()

"""
Data range/assumptions:
length of nums n: [0, 10^5]
range of values: [-10^9, 10^9]
target in values
nums is non-decreasing array
"""

"""
Tests:
Target not present
Target present once
Target present many times
Target is every value
n = 0
n = 10^5
Target = 10^-9
Target = 10^9
"""

"""
Ideas:

Naive:
    Linear search

Better Naive:
    Binary Search to find low
    Binary Search to find high
"""

"""
Completion time (minutes): 21
Question difficulty: Medium
    Seemed more like an Easy
How did it go (1 - 6): 4
    A little slow getting back into things
    But idea was solid from start
Number of bugs requiring debugging: 1
    Used == instead of =
"""