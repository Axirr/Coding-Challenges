from typing import List

class Solution:
    def findBall(self, grid: List[List[int]]) -> List[int]:
        result = []
        mLen = len(grid)
        nLen = len(grid[0])
        for x in range(0, nLen):
            y = 0
            while (True):
                currentDirection = grid[y][x]
                if currentDirection == -1:
                    x -= 1
                else:
                    x += 1
                # Wall check
                if (x >= 0 and x < nLen):
                    # Neighbour check
                    relevantNeighbour = grid[y][x]
                    if (relevantNeighbour != currentDirection):
                        result.append(-1)
                        break
                    y += 1
                    if y >= mLen:
                        result.append(x)
                        break
                else:
                    result.append(-1)
                    break
        return result

def main():
    mySol = Solution()
    grid = [[1,1,1,1,1,1],[-1,-1,-1,-1,-1,-1],[1,1,1,1,1,1],[-1,-1,-1,-1,-1,-1]]
    resultGrid = mySol.findBall(grid)
    print(resultGrid)
    print("Should be [0,1,2,3,4,-1]")
    grid = [[-1]]
    resultGrid = mySol.findBall(grid)
    print(resultGrid)
    print("Should be [-1]")
    grid = [[-1,-1,-1],[1,1,1]]
    resultGrid = mySol.findBall(grid)
    print(resultGrid)
    print("Should be [-1,1,2]")

main()

'''
Data range/assumptions:
Row major
Non square
1 - 100 in both dimensions
    Smallest 1 x 1
Value 1 = right direct
Value -1 = left direct
'''

'''
Test cases:
1x1
    [-1]
Multiple escape paths
Large m, n = 1
m = 1, n is large
100 x 100
'''

'''
Ideas:

Naive:
    for each x starting position
        startingX = x
        y = 0
        while (true):
            y += 1
            if left:
                x -= 1
            elif right:
                x += 1
            if (x >= 0 and x < m):
                if 
                if y >= n:
                    result[startingX] = 1
                    break
            else:
                result[startingX] = -1
                break
            
'''