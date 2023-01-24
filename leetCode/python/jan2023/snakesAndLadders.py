from typing import List
from heapq import *
from collections import deque

class Solution:
    def snakesAndLadders(self, board: List[List[int]]) -> int:
        maxIndex = len(board) ** 2 - 1
        frontier = deque()
        frontier.append(0)
        n = len(board)
        startingRowMod = (n - 1) % 2
        currentSteps = 0
        newFrontier = deque()
        visited = set()
        while (frontier):
            currentStart = frontier.pop()
            if currentSteps > maxIndex:  return -1
            for i in range(1, 7):
                nextStep = currentStart + i
                if nextStep in visited: continue
                visited.add(nextStep)
                if nextStep > maxIndex:  break
                rowIndex = n - nextStep // n - 1
                if rowIndex % 2 == startingRowMod:
                    colIndex = nextStep % n
                else:
                    colIndex = n - (nextStep % n) - 1
                nextValue = board[rowIndex][colIndex]
                if nextValue != -1:
                    nextStep = nextValue - 1
                if nextStep == maxIndex:
                    return currentSteps + 1
                newFrontier.append(nextStep)
                
            if len(frontier) == 0:
                frontier = newFrontier
                newFrontier = deque()
                currentSteps += 1
        return -1

def main():
    sol = Solution()
    board = [[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]
    result = sol.snakesAndLadders(board)
    print(result)
    assert result == 4
    board = [[-1,-1,-1],[-1,9,8],[-1,8,9]]
    result = sol.snakesAndLadders(board)
    print(result)
    assert result == 1
    board = [[-1,-1,2,-1],[14,2,12,3],[4,9,1,11],[-1,2,1,16]]
    result = sol.snakesAndLadders(board)
    print(result)
    assert result == 1
    board = [[-1,-1],[-1,3]]
    result = sol.snakesAndLadders(board)
    print(result)
    assert result == 1
    board = [[1,1,-1],[1,1,1],[-1,1,1]]
    result = sol.snakesAndLadders(board)
    print(result)
    assert result == -1

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

My version is a lot slower than most
    Worst case time complexity:
        Unreachable
        Need to go up to n^2 steps on every path
    Can improve for some cases by checking if last square is directly accessible
        Doesn't help with breaks that happen later though

Better solution ideas:
    Priority queue from end to start
    Adjacency list

Adjacency list:
    Node adjacent to:
        Any that directly reference it
        i - 1, if i - 1 == -1

Problem: for non-normal rolls, adjacency list doesn't read the intermediate but the starter
    And that starter can be more then one
    E.g. if a bunch can reach index k, which is a snake or ladder
        Then the destination it goes to is actually connected by 1 step to the other ones
            But how does a double jump work there?
            By only including the direct one, you're covered
                I.e. don't do it recursively

Have a second adjacency list for get there by snake or ladder?
'''