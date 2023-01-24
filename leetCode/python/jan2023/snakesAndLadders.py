from typing import List
from heapq import *

class Solution:
    def snakesAndLadders(self, board: List[List[int]]) -> int:
        # return self.recursiveSnakesAndLadders(board, 0, False)
        maxIndex = len(board) ** 2 - 1
        minSteps = maxIndex
        frontier = [(0, 0, False)]
        startingRowMod = (len(board) - 1) % 2
        while (frontier):
            current = heappop(frontier)
            currentSteps = current[0]
            currentStart = current[1]
            currentDidSpecialMove = current[2]
            if currentSteps > maxIndex:  return -1
            newDidSpecialMove = False
            for i in range(1, 7):
                nextStep = currentStart + i
                if nextStep > maxIndex:  continue
                # if not currentDidSpecialMove:
                if True:
                    rowIndex = len(board) - nextStep // len(board) - 1
                    if rowIndex % 2 == startingRowMod:
                    # if rowIndex % 2 != startingRowMod:
                        colIndex = nextStep % len(board)
                    else:
                        colIndex = len(board) - (nextStep % len(board)) - 1
                    nextValue = board[rowIndex][colIndex]
                    if nextValue != -1:
                        newDidSpecialMove = True
                        nextStep = nextValue - 1
                if nextStep == maxIndex:
                    return currentSteps + 1

                newNode = (currentSteps + 1, nextStep, newDidSpecialMove)
                if newNode not in frontier:
                    heappush(frontier, newNode)

        return -1
    
    # def recursiveSnakesAndLadders(self, board, start, didSpecialMove):
    #     maxIndex = (len(board) ** 2) - 1
    #     minSteps = maxIndex
    #     for i in range(1, 7):
    #         nextStep = start + i
    #         if nextStep > maxIndex:  continue
    #         if nextStep == maxIndex:  return 1

    #         newDidSpecialMove = False
    #         if not didSpecialMove:
    #             rowIndex = len(board) - nextStep // len(board) - 1
    #             if rowIndex % 2 == 1:
    #                 colIndex = nextStep % len(board)
    #             else:
    #                 colIndex = len(board) - nextStep % len(board) - 1
    #             nextValue = board[rowIndex][colIndex]
    #             if nextValue != -1:
    #                 newDidSpecialMove = True
    #                 nextStep = nextValue - 1
    #         minSteps = min(minSteps, self.recursiveSnakesAndLadders(board, nextStep, newDidSpecialMove))
    #     return minSteps

def main():
    sol = Solution()
    board = [[-1,-1,2,-1],[14,2,12,3],[4,9,1,11],[-1,2,1,16]]
    result = sol.snakesAndLadders(board)
    print(result)
    assert result == 1
    board = [[1,1,-1],[1,1,1],[-1,1,1]]
    result = sol.snakesAndLadders(board)
    print(result)
    assert result == -1
    board = [[-1,-1,-1],[-1,9,8],[-1,8,9]]
    result = sol.snakesAndLadders(board)
    print(result)
    assert result == 1
    board = [[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]
    result = sol.snakesAndLadders(board)
    print(result)
    assert result == 4
    board = [[-1,-1],[-1,3]]
    result = sol.snakesAndLadders(board)
    print(result)
    assert result == 1

main()

'''
Cycles are a problem
Depth first is a problem
Switching to priority queue solves both?

Indexing is still off
0 always maps to colIndex = 0
So can't use hardcored modulus value based on the row
But if we know starting row modulus, then we set things

Simpler question: formula for swtiched colIndex
    Default: nextStep % n 
    reverse: 0 -> n - 1
            1 -> n - 2
            i -> n - i - 1
'''