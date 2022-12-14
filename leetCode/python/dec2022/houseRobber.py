from typing import List

class Solution:
    def rob(self, nums: List[int]):
        listLen = len(nums)
        if listLen == 1:  return nums[0]
        dynamicSolutions = [nums[-1]]
        dynamicSolutions.append(max(nums[-1], nums[-2]))
        for i in range(listLen -3, -1, -1):
            selfValue = nums[i]
            dynamicSolutions.append(max(selfValue + dynamicSolutions[-2], dynamicSolutions[-1]))
        return dynamicSolutions[-1]

    n = None
    memo = {}
    def recursiveRob(self, nums: List[int]) -> int:
        self.n = len(nums)
        self.memo = {}
        # if self.n == 1:  return nums[0]
        myReturn = self.helperRecursiveRob(nums, 0)
        return myReturn

    def helperRecursiveRob(self, nums, startIndex):
        if startIndex in self.memo:
            return self.memo[startIndex]
        if self.n - startIndex <= 2:
            myReturn =  max(nums[startIndex:])
        elif self.n - startIndex == 3:
            myReturn = max(nums[startIndex] + nums[startIndex + 2], nums[startIndex + 1])
        else:
            firstSum = nums[startIndex] + self.helperRecursiveRob(nums, startIndex + 2)
            secondSum = nums[startIndex + 1] + self.helperRecursiveRob(nums, startIndex + 3)
            myReturn = max(firstSum, secondSum)
        self.memo[startIndex] = myReturn
        return myReturn


def main():
    sol = Solution()
    nums = [1,2,3,1]
    maxMoney = sol.rob(nums)
    print(maxMoney)
    assert maxMoney == 4
    nums = [2,7,9,3,1]
    maxMoney = sol.rob(nums)
    print(maxMoney)
    assert maxMoney == 12

main()

'''
Data range/assumptions:
House nums: [1, 100]
Money values: [0, 400]
'''

'''
Tests:
1 house
100 houses
2 house
Pairs with high values that can't be robbed without alarm
'''

'''
Ideas:
For each two house window
    max(house 1 + recursive[3:], house2, recursive[3:])
    Choose one
    Then recursively run on the sub problem

    Time complexity: ~n windows
        Then each has 2(n - 2) windows
        n * 2(n-2)
        n - 2 * 2(n - 4)
        ~= n/2 * n^2
        ~= n^3
    Bad
    Possible workable for [1, 100]

Better: backwards
    Determine if want last or second last
    But it also depends on third last
        E.g. 10000000, 1, 0
            Want second when comparing last two
            But obviously not when looking at 3

Priority search?
    (runningTotal, remainingIndices)
    search highest runningTotal first
    Only add to frontier if the used index hasn't been reached already with a bigger total

    Worst case: all numbers are equal
        n ^ 3?

Don't need to take alternating houses
May be worth it to skip
E.g. 1000, 1, 20, 1000
    First and last best

Ever worth it to skip more than one?
    No, because only skip to get a certain house and can do that and get an extra if only skip one?

Independent triplets sort of?
    For a triplet, 4 options:
        1 3
        2
        1
        3
    But then choice affects options in next one
        1 3 -> 2 or 3 in next
        2 - > all choices
        1 -> all choices
        3 -> 2 or 3 in nexy

Calculate all for each triplet
    # of triplets: approx n
    Then graph search with a branching factor of 2 or 4?
    4^100
        Very big
    4^n
'''