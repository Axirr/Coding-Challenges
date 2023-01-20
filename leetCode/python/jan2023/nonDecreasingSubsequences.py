from typing import List

class Solution:
    def findSubsequences(self, nums: List[int]) -> List[List[int]]:
        if len(nums) == 1:
            return []
        workingSequences = []
        endPoints = []
        resultSequences = set()
        for i in range(len(nums)):
            num = nums[i]
            workingSequences.append((num,))
            endPoints.append(i)
        
        while workingSequences:
            currentSeq = workingSequences.pop()
            currentEnd = endPoints.pop()

            while currentEnd < len(nums) - 1:
                if nums[currentEnd + 1] >= currentSeq[-1]:
                    newSeq = tuple(currentSeq + (nums[currentEnd + 1],))
                    resultSequences.add(newSeq)
                    workingSequences.append(newSeq)
                    endPoints.append(currentEnd + 1)
                currentEnd += 1
        
        myResult = []
        for item in resultSequences:
            myResult.append(list(item))
        return myResult

def main():
    sol = Solution()
    nums = [4,6,7,7]
    outSeq = sol.findSubsequences(nums)
    outSeq.sort()
    print(outSeq)
    correctSeq = [[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]
    correctSeq.sort()
    print(correctSeq)
    assert outSeq == correctSeq

main()