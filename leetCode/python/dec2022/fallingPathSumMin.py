from typing import List
from queue import PriorityQueue

class Solution:
    def minFallingPathSum(self, matrix: List[List[int]]) -> int:
        n = len(matrix)
        bestPath = []
        bestPath.append(matrix[0])
        for y in range(1, n):
            row = []
            for x in range(n):
                minLastStep = min([bestPath[y - 1][x + i] for i in range(-1, 2) if (x + i) >= 0 and (x + i) < n])
                row.append(minLastStep + matrix[y][x])
            bestPath.append(row)
        return min(bestPath[n - 1])

    # Note: making values positive only works for two reasons
    #       1) No cycles possible when y always increases in path
    #       2) Paths always have same node length to the bottom, so difference between actual cost and priority cost is predictable
    #           Could possibly deal with by keeping path node length
    def dijkstrMinFallingPathSum(self, matrix: List[List[int]]) -> int:
        n = len(matrix)
        if n == 1:
            return matrix[0][0]

        frontier = PriorityQueue()
        for i in range(len(matrix[0])):
            # Note + 100 to ensure values are positive so path always increases in cost
            node = matrix[0][i] + 100
            frontier.put((node, (i, 0)))
        minNodeValues = dict()
        
        resultMin = None
        while frontier.qsize() > 0:
            node = frontier.get()
            nodeValue = node[0]
            nodeX = node[1][0]
            nodeY = node[1][1]
            if nodeY == n - 1:
                return nodeValue - 100 * n
            else:
                newY = nodeY + 1
                for i in range(-1, 2):
                    newX = nodeX + i
                    if newX < 0 or newX >= n:
                        continue
                    newCoord = (newX, newY)
                    # Note + 100 to ensure values are positive so path always increases in cost
                    newSum = nodeValue + matrix[newCoord[1]][newCoord[0]] + 100

                    # Already found faster path to node, so ignore
                    if newCoord in minNodeValues and minNodeValues[newCoord] <= newSum:
                        continue
                    minNodeValues[newCoord] = newSum
                    if resultMin is None or newSum < resultMin:
                        frontier.put((newSum, newCoord))
    
    # For determining correct results only
    def recursiveFallingPathSum(self, matrix: List[List[int]]) -> int:
        if len(matrix) == 1:
            return matrix[0][0]
        myMin = 10 ** 6
        for i in range(len(matrix[0])):
            myMin = min(myMin, self.helper(matrix, i, 0))
        return myMin

    def helper(self, matrix: List[List[int]], parentX, parentY) -> int:
        if parentY == len(matrix) - 2:
            return matrix[parentY][parentX] + min([matrix[parentY + 1][parentX + i] for i in range(-1, 2) if (parentX + i) >= 0 and (parentX + i) < len(matrix)])
        else:
            return matrix[parentY][parentX] + min([self.helper(matrix, parentX + i, parentY + 1) for i in range(-1, 2) if (parentX + i >= 0) and (parentX + i) < len(matrix)])


        
    

def main():
    sol = Solution()
    matrix = [[2,1,3],[6,5,4],[7,8,9]]
    minPathSum = sol.minFallingPathSum(matrix)
    print(minPathSum)
    assert minPathSum == 13
    matrix = [[-19,57],[-40,-5]]
    minPathSum = sol.minFallingPathSum(matrix)
    print(minPathSum)
    assert minPathSum == -59
    matrix = [[-51,-35,74],[-62,14,-53],[94,61,-10]]
    minPathSum = sol.minFallingPathSum(matrix)
    print(minPathSum)
    assert minPathSum == -98
    matrix = [[-80,-48,-56,30],[-30,-64,1,-93],[-80,98,-60,-28],[47,68,84,-66]]
    minPathSum = sol.minFallingPathSum(matrix)
    print(minPathSum)
    assert minPathSum == -275

main()

'''
Data range/assumptions:
n dimensions: [1, 100]
values: [-100, 100]
'''

'''
Tests:
1 x 1
100 x 100
Minimum path very diagonal
Minimum path zig zag
Minimum path straight down
Right path starts on seemingly bad value
All values the same
Low until very big last step
'''

'''
Ideas:

Naive:
    For each starting position, take every branch

    Time complexity: approx n * ?
    Unsure, but very large

Greedy won't work
    Might have to take a single bad step to get to better area

Last step would be greedy though
But even two step wouldn't be

Does building up from the bottom help?

Thinking of ways to estimate 

A* BFS
    Cost: current sum
    Priority queue based on cost, with current path in it
    Add all options to queue, based on cost
    First option to reach end guaranteed to be correct

    Bad cases:
        All values equal
            Will go out in all directions before getting to bottom
        More generally, paths are very similar
    Time complexity is O(edges), that's only 10000
'''