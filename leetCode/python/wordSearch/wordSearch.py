from typing import List
from collections import Counter

class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        yLen = len(board)
        xLen = len(board[0])
        if len(word) > xLen * yLen:  return False
        letterCount = Counter()
        boardLetterCount = Counter()
        for letter in word:
            letterCount[letter] += 1
        for row in board:
            for letter in row:
                boardLetterCount[letter] += 1
        
        for key in letterCount:
            if letterCount[key] > boardLetterCount[key]:  return False

        isFound = False
        for y in range(yLen):
            for x in range(xLen):
                cellLetter = board[y][x]
                if cellLetter == word[0]:
                    if len(word) == 1:
                        return True
                    else:
                        visited = [(y, x)]
                        isFound = self.searchNeighbours(board, word[1:], x, y, visited)
                        if isFound:  return True
        return isFound
    
    def searchNeighbours(self, board, word, startX, startY, visited):
        maxYIndex = len(board) - 1
        maxXIndex = len(board[0]) - 1
        newCoors = set()
        newCoors.add((startY, min(maxXIndex, startX + 1)))
        newCoors.add((startY, max(0, startX - 1)))
        newCoors.add((min(maxYIndex, startY + 1), startX))
        newCoors.add((max(0, startY - 1), startX))
        isFound = False
        for coord in newCoors:
            coordY = coord[0]
            coordX = coord[1]
            if (coordY, coordX) in visited:
                continue
            cellLetter = board[coordY][coordX]
            if cellLetter == word[0]:
                if len(word) == 1:
                    return True
                else:
                    visited.append((coordY, coordX))
                    isFound = self.searchNeighbours(board, word[1:], coordX, coordY, visited)
                    if isFound:  break
                    visited.pop()
        return isFound



def main():
    mySol = Solution()
    board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
    word = "ABCCED"
    isFound = mySol.exist(board, word)
    print(isFound)
    assert isFound
    board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
    word = "SEE"
    isFound = mySol.exist(board, word)
    print(isFound)
    assert isFound
    board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
    word = "ABCB"
    isFound = mySol.exist(board, word)
    print(isFound)
    assert not isFound
    board = [["A","A","A","A","A","A"],["A","A","A","A","A","A"],["A","A","A","A","A","A"],["A","A","A","A","A","A"],["A","A","A","A","A","A"],["A","A","A","A","A","A"]]
    word = "AAAAAAAAAAAABAA"
    isFound = mySol.exist(board, word)
    print(isFound)
    assert not isFound

main()

'''
Data range/assumptions:
6 x 6 board
15 word length max
Non-empty word
Both lowercase and uppercase letters
Cannot use a letter cell twice
'''

'''
Test cases:
1 x 1 board
1 letter word
16 letter word
Duplicate letters in grid
Near macth except one letter
Long word, meets letterCount check, all checks will go to 15th letter
'''

'''
Ideas:

Naive:
    Recursive
    Search for first letter
        Call search on truncated string
    
    Time complexity: 
        Each level only has to check it's cardinal neighbours (4)
        Max wrong search depth = word length - 1 (15)
        15 * 4 per wrong first letter
        Total letters = 36 max
        36 * 15 * 4
        Seems reasonable?

Dealing with not using letter cell twice:
    Visited matrix
        Don't want to copy it
        But could just add to it and subtract from it
'''