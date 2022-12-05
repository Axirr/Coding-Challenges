from typing import List
from collections import Counter
from copy import copy

class Solution:
    def removeStones(self, stones: List[List[int]]) -> int:
        xCountDict = Counter()
        yCountDict = Counter()
        trueOrphanCount = 0
        for coord in stones:
            x = coord[0]
            y = coord[1]
            xCountDict[x] += 1
            yCountDict[y] += 1
        for i in range(len(stones) - 1, -1, -1):
            x = stones[i][0]
            y = stones[i][1]
            if xCountDict[x] == 1 and yCountDict[y] == 1:
                trueOrphanCount += 1
                xCountDict[x] -= 1
                yCountDict[y] -= 1
                stones.pop(i)
            # elif xCountDict[x] == 1 or yCountDict[y] == 1:
            #     halfOrphanList.append(coord)
        print("removed %d oprhans" % trueOrphanCount)
        print(stones)
        removedCount = self.helperRecursiveRemoveStones(stones, len(stones), xCountDict, yCountDict)

        return removedCount
        # return trueOrphanCount + removedCount
    
    def helperRecursiveRemoveStones(self, stones, stonesLength, xCountDict, yCountDict):
        if len(stones) <= 1:  return 0
        maxRemovedCount = 0
        print(stones[:stonesLength])
        # for i in range(len(stones)):
        for i in range(stonesLength):
            stone = stones[i]
            if xCountDict[stone[0]] > 1 or yCountDict[stone[1]] > 1:
                xCountDict[stone[0]] -= 1
                yCountDict[stone[1]] -= 1

                # copyStones = copy(stones)
                # copyStones[i] = copyStones[-1]
                # copyStones.pop()

                temp = stones[i]
                stones[i] = stones[-1]
                stones[-1] = temp

                # maxRemovedCount = max(maxRemovedCount, self.helperRecursiveRemoveStones(copyStones, stonesLength - 1, xCountDict, yCountDict) + 1)
                maxRemovedCount = max(maxRemovedCount, self.helperRecursiveRemoveStones(stones, stonesLength - 1, xCountDict, yCountDict) + 1)

                xCountDict[stone[0]] += 1
                yCountDict[stone[1]] += 1

                temp = stones[i]
                stones[i] = stones[-1]
                stones[-1] = temp

        return maxRemovedCount

    
    # def recursiveRemoveStone(self, stones: List[List[int]]) -> int:
    #     maxRemoval = 0
    #     for i in range(len(stones)):
    #         stone = stones[i]
    #         if self.canRemove(stone, i, stones):
    #             stonesCopy = copy(stones)
    #             stonesCopy.remove(stone)
    #             maxRemoval = max(maxRemoval, self.recursiveRemoveStone(stonesCopy) + 1)
    #     return maxRemoval
    
    # def canRemove(self, stone, stoneIndex, stones):
    #     for i in range(len(stones)):
    #         if i == stoneIndex:  continue
    #         otherStone = stones[i]
    #         if otherStone[0] == stone[0] or otherStone[1] == stone[1]:
    #             return True
    #     return False



def main():
    mySol = Solution()
    # stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]
    # resultInt = mySol.removeStones(stones)
    # print(resultInt)
    # assert resultInt == 5
    # stones = [[0,0],[0,2],[1,1],[2,0],[2,2]]
    # resultInt = mySol.removeStones(stones)
    # print(resultInt)
    # assert resultInt == 3
    # stones = [[0,0],[0,1],[1,0],[1,1],[2,1],[2,2],[3,2],[3,3],[3,4],[4,3],[4,4]]
    # resultInt = mySol.removeStones(stones)
    # print(resultInt)
    # assert resultInt == 10
    # stones = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]
    # resultInt = mySol.removeStones(stones)
    # print(resultInt)
    # assert resultInt == 5
    stones = [[4,4],[5,5],[3,1],[1,4],[1,1],[2,3],[0,3],[2,4],[3,5]]
    resultInt = mySol.removeStones(stones)
    print(resultInt)

main()

'''
Data range/assumptions:
Medium length (1000)
Non-empty
Coordinates can be large
'''

'''
Tests:
Single stone
Many stones
Greedy solution doesn't work
    E.g. moving row or column that has the most
'''

'''
Ideas:

Naive:
    Try all combinations
    n!? Unworkable

Simple, but broken I think:
    Greedy
    Count how many are in each row and column
    Remove all but one from each?
    Have to update count for removed ones on both coordinates
    Problem: greedy doesn't work
        Need to figure out which singleton is best to leave behind?
            Isn't it as simple as leave behind one that isn't an orphan
                Cascade problem: immediate orphan easy, but might cause orphans later
    Reframe problem: find best singletons to leave behind for each group
        Best: allows you to keep others, which allow you to delete others?
        If can find a group that le

Remove all orphan stones from algorithm to reduce n

Other ideas:
    Memoization
        Pickle?
        List to string?
'''