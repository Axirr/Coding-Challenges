from typing import List
from copy import copy

class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        # May be faster with list.remove() rather than dictionaries from observation
        #      Though not sure why. Posisbly dictionary overhead for small n
        dictNumSets = dict()
        allNums = ['1','2','3','4','5','6','7','8','9']
        dictForNums = dict()
        for num in allNums:
            dictForNums[num] = 0
        for i in range(0, 9):
            dictNumSets['x' + str(i)] = copy(dictForNums)
            dictNumSets['y' + str(i)] = copy(dictForNums)

        gridIndexRanges = [0,2], [3,5], [6, 8]
        for xRange in gridIndexRanges:
            for yRange in gridIndexRanges:
                myNumSet = copy(dictForNums)
                for xCoor in range(xRange[0], xRange[1] + 1):
                    for yCoor in range(yRange[0], yRange[1] + 1):
                        cellValue = board[yCoor][xCoor]
                        if cellValue == '.':  continue
                        myNumSet[cellValue] += 1
                        dictNumSets['x' + str(xCoor)][cellValue] += 1
                        dictNumSets['y' + str(yCoor)][cellValue] += 1
                        if myNumSet[cellValue] >= 2 or dictNumSets['x' + str(xCoor)][cellValue] >= 2 or dictNumSets['y' + str(yCoor)][cellValue] >= 2:
                            return False
        return True

def main():
    mySol = Solution()
    board = [["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
    isValid = mySol.isValidSudoku(board)
    print(isValid)
    assert isValid
    board = [["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
    isValid = mySol.isValidSudoku(board)
    print(isValid)
    assert not isValid
    board = [
    [".",".",".","9",".",".",".",".","."],
    [".",".",".",".",".",".",".",".","."],
    [".",".","3",".",".",".",".",".","1"],
    [".",".",".",".",".",".",".",".","."],
    ["1",".",".",".",".",".","3",".","."],
    [".",".",".",".","2",".","6",".","."],
    [".","9",".",".",".",".",".","7","."],
    [".",".",".",".",".",".",".",".","."],
    ["8",".",".","8",".",".",".",".","."]]
    isValid = mySol.isValidSudoku(board)
    print(isValid)
    assert not isValid
    board = [
    [".",".",".",".","5",".",".","1","."],
    [".","4",".","3",".",".",".",".","."],
    [".",".",".",".",".","3",".",".","1"],
    ["8",".",".",".",".",".",".","2","."],
    [".",".","2",".","7",".",".",".","."],
    [".","1","5",".",".",".",".",".","."],
    [".",".",".",".",".","2",".",".","."],
    [".","2",".","9",".",".",".",".","."],
    [".",".","4",".",".",".",".",".","."]]
    isValid = mySol.isValidSudoku(board)
    print(isValid)
    assert not isValid

main()

'''
Data range/assumptions:
9 x 9 grid
. indicates empty
'''

'''
Test cases:
Empty
Full
Invalid on column
Invalid on row
Invalid on square
'''

'''
Ideas:

Naive:
    numSet = [1,2,3,4,5,6,7,8,9]
    for each x value (i.e. column):
        myNumSet = copy(numSet)
        for each y value:
            numSet.remove(board[x][y])
            if not found, return False
    for each y value (i.e. row):
        myNumSet = copy(numSet)
        for each x value:
            numSet.remove(board[x][y])
            if not found, return False
    gridIndexRanges = [0,2], [3,5], [6, 8]
    for xRange in gridIndexRanges:
        for yRange in gridIndexRanges:
            myNumSet = copy(numSet)
            numSet.remove(board[x][y])
            if not found, return False
    
    Time complexity:
        3 * 9^2
        O(1)

Look at every square multiple times
Should be able to do it in one pass
'''