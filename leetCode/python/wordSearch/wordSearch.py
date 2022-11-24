from typing import List
from collections import Counter

class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        if len(word) == 1:
            for row in board:
                for letter in row:
                    if letter == word:  return True
            return False
        # Construct adjacent pairs of letters
        letterPairDict = dict()
        for i in range(len(word) - 1):
            if not word[i] in letterPairDict:
                letterPairDict[word[i]] = dict()
            if not word[i + 1] in letterPairDict[word[i]]:
                letterPairDict[word[i]][word[i + 1]] = set()
        
        letterCount = Counter()
        boardLetterCount = Counter()
        setWord = set(word[:-1])
        for y in range(len(board)):
            for x in range(len(board[0])):
                letter = board[y][x]
                if letter in setWord:
                    for key in letterPairDict[letter]:
                        validEndCoorList = self.searchNeighbours(board, x, y, key)
                        for item in validEndCoorList:
                            letterPairDict[letter][key].add(((y, x),item))
        
        for key in letterCount:
            if letterCount[key] > boardLetterCount[key]:  return False
        
        isFound = False
        try:
            searchSet = letterPairDict[word[0]][word[1]]
            for mySetItem in searchSet:
                isFound = self.checkPairValidity(word[1:], letterPairDict, [mySetItem[0]])
                if isFound:  return True
        except KeyError:
            pass
        return isFound
    
    def checkPairValidity(self, word, letterPairDict, visited):
        if len(word) == 1:
            return True
        firstLetter = word[0]
        secondLetter = word[1]
        print(word)
        try:
            pairDict = letterPairDict[firstLetter][secondLetter]

            isFound = False
            for coord in pairDict:
                if coord[1] not in visited:
                    # if len(word) == 2:  return True
                    visited.append(coord[0])
                    # visited.append(coord[1])
                    isFound = self.checkPairValidity(word[1:], letterPairDict, visited)
                    if isFound:  return True
                    # visited.pop()
                    visited.pop()

            return isFound

        except KeyError:
            return False

    def searchNeighbours(self, board, startX, startY, letter):
        resultList = []
        maxYIndex = len(board) - 1
        maxXIndex = len(board[0]) - 1
        newCoors = set()
        newCoors.add((startY, min(maxXIndex, startX + 1)))
        newCoors.add((startY, max(0, startX - 1)))
        newCoors.add((min(maxYIndex, startY + 1), startX))
        newCoors.add((max(0, startY - 1), startX))
        for coord in newCoors:
            coordY = coord[0]
            coordX = coord[1]
            cellLetter = board[coordY][coordX]
            if cellLetter == letter:
                resultList.append(coord)
        return resultList


def main():
    mySol = Solution()
    # board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
    # word = "ABCCED"
    # isFound = mySol.exist(board, word)
    # print(isFound)
    # assert isFound
    # board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
    # word = "SEE"
    # isFound = mySol.exist(board, word)
    # print(isFound)
    # assert isFound
    # board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
    # word = "ABCB"
    # isFound = mySol.exist(board, word)
    # print(isFound)
    # assert not isFound
    board = [["A","A","A","A","A","A"],["A","A","A","A","A","A"],["A","A","A","A","A","A"],["A","A","A","A","A","A"],["A","A","A","A","A","A"],["A","A","A","A","A","A"]]
    word = "AAAAAAAAAAAABAA"
    isFound = mySol.exist(board, word)
    print(isFound)
    # assert not isFound

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


Better: pair search?
Create pairs for each adjacent letter
Traverse board ensuring all pairs exist
    Keep coordinates of set of all pairs
    (startCoord, endCoord)
Then, if there exists a pair such that a chain of pairs can be made
Remove coordinates to deal with duplicates issue too?
    Problem: remove coordinates for an unsuccessful pass could mess up future successful ones

Time complexity:
    Pair search worst case: 4 x m x n
    Copy set for each search could add up
    Instead of copying, could just keep visited list and append/pop, same as doing

Improved version didn't work:
    With lots of duplicates, I think it's possibly factorial
'''