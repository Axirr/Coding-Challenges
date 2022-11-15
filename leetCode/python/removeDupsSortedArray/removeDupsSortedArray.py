from typing import List

class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        gapList = []
        existingGap = False
        removalCount = 0
        for i in range(len(nums) - 1):
            if nums[i] == nums[i+1]:
                removalCount += 1
                if not existingGap:
                    gapList.append([i+1])
                    existingGap = True
            else:
                if existingGap:
                    gapList[-1].append(i)
                    existingGap = False
        if existingGap:
            gapList[-1].append(len(nums) - 1)
        if (len(gapList) == 0):  return len(nums)
        writeIndex = gapList[0][0]
        validPointer = writeIndex + 1
        currentGap = 0
        for i in range(len(gapList)):
            currentGap = gapList[i][0]
            gapEnd = gapList[i][1]
            while (currentGap <= gapEnd and validPointer < len(nums)):
                # if (not self.isGap(validPointer, gapList, max(0,i-1))):
                if (not self.isGap(validPointer, gapList, 0)):
                    nums[writeIndex] = nums[validPointer]
                    writeIndex += 1
                    currentGap += 1
                    validPointer += 1
                else:
                    validPointer += 1
        # validPointer = max(validPointer, gapList[-1][1] + 1)
        newLength = len(nums) - removalCount
        if (writeIndex < newLength):
            while (writeIndex < newLength):
                while (self.isGap(validPointer, gapList, 0)):
                    validPointer += 1
                nums[writeIndex] = nums[validPointer]
                writeIndex += 1
                validPointer += 1
        # for i in range(len(nums) - 1, len(nums) - 1 - removalCount, -1):
        #     del nums[i]
        return newLength
    
    def isGap(self, validPointer, gapList, currentGapIndex):
        for i in range(currentGapIndex, len(gapList)):
            gapRange = gapList[i]
            if gapRange[0] > validPointer:
                break
            if validPointer >= gapRange[0] and validPointer <= gapRange[1]:
                # print("Invalid because %d falls in range %d %d" % (validPointer, gapRange[0], gapRange[1]))
                return True
        # print("Valid index %d" % validPointer)
        return False
            

def main():
    mySol = Solution()
    nums = [1,1,2]
    resultInt = mySol.removeDuplicates(nums)
    print(resultInt)
    print(nums[0:resultInt])
    nums = [0,0,1,1,1,2,2,3,3,4]
    resultInt = mySol.removeDuplicates(nums)
    print(resultInt)
    print(nums[0:resultInt])
    nums = [0,1,2,3,4,5,5,5,6,7,8]
    resultInt = mySol.removeDuplicates(nums)
    print(resultInt)
    print(nums[0:resultInt])
    nums = [-3,-3,-2,-1,-1,0,0,0,0,0]
    resultInt = mySol.removeDuplicates(nums)
    print(resultInt)
    print(nums[0:resultInt])
    nums = [1,1,2,3,3,4]
    resultInt = mySol.removeDuplicates(nums)
    print(resultInt)
    print(nums[0:resultInt])
    nums = [0,0,1,2,3,4,4,4]
    resultInt = mySol.removeDuplicates(nums)
    print(resultInt)
    print(nums[0:resultInt])
    nums = [-50,-50,-49,-48,-47,-47,-47,-46,-45,-43,-42,-41,-40,-40,-40,-40,-40,-40,-39,-38,-38,-38,-38,-37,-36,-35,-34,-34,-34,-33,-32,-31,-30,-28,-27,-26,-26,-26,-25,-25,-24,-24,-24,-22,-22,-21,-21,-21,-21,-21,-20,-19,-18,-18,-18,-17,-17,-17,-17,-17,-16,-16,-15,-14,-14,-14,-13,-13,-12,-12,-10,-10,-9,-8,-8,-7,-7,-6,-5,-4,-4,-4,-3,-1,1,2,2,3,4,5,6,6,7,8,8,9,9,10,10,10,11,11,12,12,13,13,13,14,14,14,15,16,17,17,18,20,21,22,22,22,23,23,25,26,28,29,29,29,30,31,31,32,33,34,34,34,36,36,37,37,38,38,38,39,40,40,40,41,42,42,43,43,44,44,45,45,45,46,47,47,47,47,48,49,49,49,50]
    resultInt = mySol.removeDuplicates(nums)
    print(resultInt)
    print(nums[0:resultInt])


main()

'''
Data range/assumptions:
Non-empty
Large array
Small num range
'''

'''
Tests:
Single element
Max length array
All duplicates
'''

'''
Ideas:

Naive:
    Traverse to second last place
    Check for duplicates
    Slide whole list forward by one
    Continue
    Time complexity in worst case:
        Worst case: all duplicates
        Slide the whole list forward n times
        ~n^2
    Ugly

Better:
    Move the end to the duplicate spot
    Sort at end
    Time complexity: n + n*log(n)

Possible to do it in linear time?
    Keep track of gaps
    Insert non-gap into gap
        Have to offset by number of insertions so far
    Should be 2N, if possible
'''