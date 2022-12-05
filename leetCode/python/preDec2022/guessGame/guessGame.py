# The guess API is already defined for you.
# @param num, your guess
# @return -1 if num is higher than the picked number
#          1 if num is lower than the picked number
#          otherwise return 0
# def guess(num: int) -> int:

class Solution:
    def guessNumber(self, n: int) -> int:
        high = n
        low = 0
        while (True):
            currentGuess = (high + low) // 2
            guessResult = guess(currentGuess)
            if guessResult == 0:
                return currentGuess
            elif guessResult == -1:
                high = currentGuess - 1
            else:
                low = currentGuess + 1

def main():
    mySol = Solution()

main()