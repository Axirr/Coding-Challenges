import math
from queue import PriorityQueue

class Solution:
    def __init__(self):
        self.resultCache = dict()
        self.perfectSquareSet = set()

    def numSquares(self, n: int) -> int:
        self.constructSquaresToN(n)

        queueDict = dict()
        pQueue = PriorityQueue()
        pQueue.put((0, n))
        queueDict[0] = pQueue
        queueDict[1] = PriorityQueue()
        currentSteps = 0
        currentNode = queueDict[currentSteps].get()
        while True:
            currentN = currentNode[1]
            if currentN in self.perfectSquareSet:
                return currentSteps + 1
            
            floorSqrt = math.floor(math.sqrt(currentN))
            for root in range(floorSqrt, 0, -1):
                innerNewN = currentN - root * root
                if innerNewN in self.perfectSquareSet:
                    return currentSteps + 2
                innerSqrt = math.sqrt(innerNewN)
                sqrtDiff = abs(innerSqrt - round(innerSqrt))
                queueDict[currentSteps + 1].put((sqrtDiff, innerNewN))
            

            if queueDict[currentSteps].empty():
                currentSteps += 1
                queueDict[currentSteps + 1] = PriorityQueue()
                if queueDict[currentSteps].empty():  break
            currentNode = queueDict[currentSteps].get()
        
    
    def constructSquaresToN(self, n):
        for i in range(1, math.floor(math.sqrt(n) + 1)):
            self.perfectSquareSet.add(i * i)
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
    assert resultInt == 2
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