from typing import List

class Solution:
    def minMutation(self, start: str, end: str, bank: List[str]) -> int:
        if end not in bank:     return -1
        frontier = [[[start], 0]]
        while (len(frontier) != 0):
            currentPair = frontier.pop()
            if (len(currentPair[0]) > 0):
                currentCount = currentPair[1]
                currentWordList = currentPair[0]
                frontier.append([[], currentCount + 1])
                for currentWord in currentWordList:
                    for bankString in bank:
                        if (self.numDiffs(currentWord, bankString) == 1):
                            if bankString == end:
                                return currentCount + 1
                            frontier[-1][0].append(bankString)
        return -1
        
    
    def numDiffs(self, first, second):
        count = 0
        for i in range(len(first)):
            if first[i] != second[i]:
                count += 1
        return count

def main():
    mySol = Solution()
    start = "AACCGGTT"
    end = "AACCGGTA"
    bank = ["AACCGGTA"] 
    resultInt = mySol.minMutation(start, end, bank)
    print(resultInt)
    print("Should be 1")
    start = "AACCGGTT"
    end = "AAACGGTA"
    bank = ["AACCGGTA","AACCGCTA","AAACGGTA"]
    resultInt = mySol.minMutation(start, end, bank)
    print(resultInt)
    print("Should be 2")
    start = "AAAAACCC"
    end = "AACCCCCC"
    bank = ["AAAACCCC","AAACCCCC","AACCCCCC"]
    resultInt = mySol.minMutation(start, end, bank)
    print(resultInt)
    print("Should be 3")

main()

'''
Data range/assumptions:
Bank can be empty
Start may not be in bank
Capital letters
'''

'''
Tests:
Start = end
Empty bank
10 mutations
Not possible
Start in bank/cycle
'''

'''
Ideas:

Naive:
    If end not in bank, return -1
    usedWords = [start]
    frontier = [start]
    while (len(frontier) != 0):
        currentWord = frontier.pop()
        for bankString in bank:
            if (numDiffs(currentWord, bankString) and not in usedWords):
                frontier.append(bankString)
                usedWords.append(bankString)
        for word in frontier:
            if word = end:  return True
'''