import math
from queue import PriorityQueue

class Solution:
    def __init__(self):
        self.resultCache = dict()
        self.perfectSquareDict = dict()

    # TODO: make dict a set if only using key
    def numSquares(self, n: int) -> int:
        self.constructSquaresToN(n)
        if n in self.perfectSquareDict:
            # if not n in self.resultCache:
            #     self.resultCache[n] = 1
            return 1

        floorSN = math.floor(math.sqrt(n))
        addCount = 1
        pQueue = PriorityQueue()
        pQueue.put((0, n, 0))
        solution = None
        currentNode = pQueue.get()
        # didFindSolution = False
        while True:
            currentN = currentNode[1]
            currentSteps = currentNode[2]
            if currentN in self.perfectSquareDict:
                newSolution = currentSteps + 1
                if solution:
                    solution = min(solution, newSolution)
                else:
                    solution = newSolution
            
            floorSqrt = math.floor(math.sqrt(currentN))
            for root in range(floorSqrt, 0, -1):
                innerNewN = currentN - root * root
                if innerNewN in self.perfectSquareDict:
                    newSolution = currentSteps + 2
                    if solution:
                        solution = min(solution, newSolution)
                    else:
                        solution = newSolution
                    break
                # if not solution:
                if not solution or not currentSteps + 1 >= solution - 1:
                # if not didFindSolution:
                    innerSqrt = math.sqrt(innerNewN)
                    sqrtDiff = abs(innerSqrt - round(innerSqrt))
                    pQueue.put((sqrtDiff, innerNewN, currentSteps + 1))
            

            if pQueue.empty():  break
            currentNode = pQueue.get()
        
        return solution
    
    def constructSquaresToN(self, n):
        for i in range(1, math.floor(math.sqrt(n) + 1)):
            self.perfectSquareDict[i * i] = i
        return


def main():
    mySol = Solution()
    n = 9
    resultInt = mySol.numSquares(n)
    print(resultInt)
    assert resultInt == 1
    n = 12
    resultInt = mySol.numSquares(n)
    print(resultInt)
    assert resultInt == 3
    n = 13
    resultInt = mySol.numSquares(n)
    print(resultInt)
    assert resultInt == 2
    n = 3428
    resultInt = mySol.numSquares(n)
    print(resultInt)
    n = 5812
    resultInt = mySol.numSquares(n)
    print(resultInt)
    n = 79
    resultInt = mySol.numSquares(n)
    print(resultInt)
    assert resultInt == 4

main()

'''
Data range/assumptions:
Positive, non-zero
Large n
'''

'''
Tests:
Perfect square
Largest number
Two correct answers, pick lowest
Only 1's are valid square roots
'''

'''
Ideas:

Naive:
    sqrtN
    if integer, return 1
    maxSquare(floor(sqrtN))
    for i in range (maxSquare, 0, -1):
        squareI = pow(i, 2)
        newN = n - squareI
        addCount = recursive call(newN)
        if addCount:
            return addCount + 1
Time complexity: sqrt(n) ^ 2?
Memoization would help

Not fast enough

Better: priority queue by distance from perfect square?
    Also by addCount though, since need optimal
    Since those ones will have smaller search space
    Bottom up building means more memo hits?
'''