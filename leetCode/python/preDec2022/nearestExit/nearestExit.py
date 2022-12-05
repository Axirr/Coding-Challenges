from typing import List
from copy import copy
from collections import deque

class Solution:
    def nearestExit(self, maze: List[List[str]], entrance: List[int]) -> int:
        # frontier = [[entrance], []]
        frontier = [entrance]
        nextFrontier = []
        directions = ['n','e','s','w']
        visited = dict()
        visited[(entrance[0],entrance[1])] = True
        steps = 0
        mazeYmaxIndex = len(maze) - 1
        mazeXmaxIndex = len(maze[0]) - 1
        while (len(frontier) != 0):
            cells = frontier
            for i in range(len(cells)):
                cell = copy(cells[i])
                for direction in directions:
                    myCell = copy(cell)
                    newCellCoor = self.cellFromMove(myCell, direction, mazeXmaxIndex, mazeYmaxIndex)
                    if newCellCoor:
                        newCellValue = maze[newCellCoor[0]][newCellCoor[1]]
                        if newCellValue != '+':
                            if self.isBorder(newCellCoor, mazeXmaxIndex, mazeYmaxIndex) and not newCellCoor == entrance:
                                return steps + 1
                            else:
                                cellTup = (newCellCoor[0], newCellCoor[1])
                                if cellTup not in visited:
                                    visited[cellTup] = True
                                    nextFrontier.append(newCellCoor)
            frontier = nextFrontier
            nextFrontier = []
            steps += 1
        return -1
    
    def cellFromMove(self, coor, direction, maxXindex, maxYindex):
        if direction == 'n':
            coor[0] += 1
        elif direction == 'e':
            coor[1] += 1
        elif direction == 's':
            coor[0] -= 1
        elif direction == 'w':
            coor[1] -= 1
        if coor[1] >= 0 and coor[1] <= maxXindex and coor[0] >= 0 and coor[0] <= maxYindex:
            return coor
        else:
            return None

    def isBorder(self, coor, maxXindex, maxYindex):
        coorY = coor[0]
        coorX = coor[1]
        if coorX == 0 or coorX == maxXindex:  return True
        if coorY == 0 or coorY == maxYindex:  return True
        return False

def main():
    mySol = Solution()
    maze = [["+","+",".","+"],[".",".",".","+"],["+","+","+","."]]
    entrance = [1,2]
    steps = mySol.nearestExit(maze, entrance)
    print(steps)
    assert steps == 1
    maze = [["+","+","+"],[".",".","."],["+","+","+"]]
    entrance = [1,0]
    steps = mySol.nearestExit(maze, entrance)
    print(steps)
    assert steps == 2
    maze = [["+",".","+","+","+","+","+"],["+",".","+",".",".",".","+"],["+",".","+",".","+",".","+"],["+",".",".",".","+",".","+"],["+","+","+","+","+",".","+"]]
    entrance = [0,1]
    steps = mySol.nearestExit(maze, entrance)
    print(steps)
    assert steps == 12

main()

'''
Data range/assumptions:
Non-empty
Max cells 10000
Can have no exit
'''

'''
Tests:
1 x 1
100 x 100
Opposite corners, walls only on edges
    Worst case time complexity
No exit
Multiple exits?
DPFS Nearest Fail
'''

'''
Ideas:

Breadth first search should guarantee nearest
    frontier = list([startingCell], [])
    visited = []
    steps = 0
    while (len(frontier) > 0):
        for each cell in frontier[0]:
            for each direction:
                newCell = move(direction)
                if newCell not wall:
                    if newCell is border and not entrance:
                        return steps
                    elif not in visited:
                        visited.append(cell)
                        frontier[-1].append(cell)
        del frontier[0]
        frontier.append([])
        steps += 1
    return -1

    Time complexity of BFS:
        n? Visits each cell once
        No, the visited search can get expensive
            Avoid by recording lowest value for coordinate instead
                If stepCount not less than lowest value, don't add to frontier

'''