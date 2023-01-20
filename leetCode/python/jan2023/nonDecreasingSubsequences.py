from typing import List

class Solution:
    def findSubsequences(self, nums: List[int]) -> List[List[int]]:
        if len(nums) == 1:
            return []
        workingSequences = []
        endPoints = []
        resultSequences = set()
        totalSteps = 0
        for i in range(len(nums)):
            num = nums[i]
            workingSequences.append((num,))
            endPoints.append(i)
            totalSteps += 1
        
        while workingSequences:
            currentSeq = workingSequences.pop()
            currentEnd = endPoints.pop()

            while currentEnd < len(nums) - 1:
                if nums[currentEnd + 1] >= currentSeq[-1]:
                    newSeq = currentSeq + (nums[currentEnd + 1],)
                    resultSequences.add(newSeq)
                    workingSequences.append(newSeq)
                    endPoints.append(currentEnd + 1)
                currentEnd += 1
                totalSteps += 1
        
        myResult = []
        for item in resultSequences:
            myResult.append(list(item))
        print("Total steps for ", end="")
        print(nums, end = " ")
        print("is %d" % totalSteps)
        return myResult

def main():
    sol = Solution()
    # nums = [4,6,7,7]
    # outSeq = sol.findSubsequences(nums)
    # outSeq.sort()
    # print(outSeq)
    # correctSeq = [[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]
    # correctSeq.sort()
    # print(correctSeq)
    # assert outSeq == correctSeq
    nums = [4,6,7,7,9,10,11,12,13]
    sol.findSubsequences(nums)
    nums.sort(reverse=True)
    sol.findSubsequences(nums)

main()