class Solution:
    def threeSumClosest(self, nums, target):
        nums.sort()
        closestArray = nums[0:3]
        closestDifference = abs(target - (sum(closestArray)))
        for i in range(len(nums)):
            left = i + 1
            right = len(nums) - 1
            while (left < right):
                currentArray = [nums[i], nums[left], nums[right]]
                currentSum = sum(currentArray)
                signedCurrentDifference = target - currentSum
                unsignedCurrentDifference = abs(signedCurrentDifference)
                if unsignedCurrentDifference < closestDifference:
                    closestDifference = unsignedCurrentDifference
                    closestArray = currentArray
                    if closestDifference == 0:
                        return sum(closestArray)

                if currentSum > target:
                    right -= 1
                else:
                    left += 1
        return sum(closestArray)

def main():
    mySol = Solution()
    myArray = [-1,2,1,4]
    assert mySol.threeSumClosest(myArray, 1) == 2
    myArray = [4,0,5,-5,3,3,0,-4,-5]
    resultInt = mySol.threeSumClosest(myArray, -2) 
    print(resultInt)
    assert resultInt == -2

main()


'''
Manual test case
-5      -5 -4 0 0 3 3 4 5
    -5 -5 5 = -5
        difference -5
        too small, increasing left
    -5 -4 5 = -4
        difference -4
    ...
    -5 0 5 = 0
        diff 2
        too big, reduce right
    -5 0 4 = -1
        diff 1
        too big, reduce right
    -5 0 3 = -2
        diff 0
        match, break
    
'''


'''
Data range/assumptions:
Minimum 3 elements
Medium size data range
Values in list are fairly small
'''

'''
Tests cases:
3 elements
Way off target
'''

'''
Ideas:

Naive:
    n^3 traversal
    Possibly workable for 500 element list, but ugly

Better:
Search problem expanding frontier in an ordered way:
    Sort to give data structure
    Search problem, with frontier
    If can find a match, that at least cuts things off short
        Helps in average
        Not worst

Calculate pair sums:
    n^2
    Sort data: n log n
    Then binary search for closest to complement of the target
        Worst case: n * log(n)
            Worse than naive
    Space complexity bad too, since need to store n^2 partial sums

"Closest too" is very difficult condition for average and worst case
    Requires full traversal of the data unless match

Simpler problem: sum of two entires closest to target
    Anyway to not do this n^2?
    Feels like your best case is an educated search process
'''