from typing import List, Optional
import math

class Solution:
    def kthGrammar(self, n: int, k: int) -> int:
        maxLength:int = 2 ** (n - 1)
        currentDigit:int = 0
        while maxLength > 1:
            print("current max length: %d" % maxLength)
            print("current k: %d" % k)
            isTopHalf:bool = True
            if k < (maxLength // 2) + 1:
                print("bottom half")
                isTopHalf = False
            if currentDigit == 0:
                if isTopHalf:
                    currentDigit = 1
                else:  currentDigit = 0
            else:
                if isTopHalf:
                    currentDigit = 0
                else:  currentDigit = 1

            maxLength = maxLength // 2
            k = k % maxLength
            n -= 1
        return currentDigit

    def recursiveGenerateRows(self, numRows: int) -> None:
        lastString: str = "0"
        print(lastString)
        while numRows > 1:
            newArray: List[str] = []
            for char in lastString:
                if char == "0":
                    newArray.append("01")
                elif char == "1":
                    newArray.append("10")
            lastString = "".join(newArray)
            print(lastString)
            numRows -= 1

def mainKthGrammar():
    sln:Solution = Solution()
    result:int
    currentRows:int

    currentRows = 3
    maxK = 2 ** (currentRows - 1)
    sln.recursiveGenerateRows(currentRows)
    for i in range(1, maxK + 1):
        result = sln.kthGrammar(currentRows, i)
        print('final result %d' % result)
        print()

if __name__ == "__main__":
    mainKthGrammar()

"""
Data range/assumptions:
row number n: [1, 30]
symbol in row index k: [1, 2^n-1]
"""

"""
Tests:
n = 1
n = 30
k = 0
k = max
"""

"""
Ideas:
Binary search or something
Each digit a factor of previous digit
Work forwards for only a subsection of the string that will get us k?

0
01
0110
01101001

Half the string defined by some original digit
k / 2 ->
    if 0.5 of final length, first half?
Repeat, with length halved?

Naive:
    Just calculate each row iteratively and then index into it
    Time complexity: bad
        Each digit doubles
        O(2^n)?

Better:
"""

"""
Completion time (minutes):
Question difficulty:
How did it go (1 - 6):
"""