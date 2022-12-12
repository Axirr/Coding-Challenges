from typing import List

class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        if len(digits) == 0:  return []
        oldResult = [""]
        result = []
        digitLetters = {
            '2': 'abc',
            '3': 'def',
            '4': 'ghi',
            '5': 'jkl',
            '6': 'mno',
            '7': 'pqrs',
            '8': 'tuv',
            '9': 'wxyz',
        }
        for digit in digits:
            letters = digitLetters[digit]
            for letter in letters:
                for partial in oldResult:
                    result.append(partial + letter)
            oldResult = result
            result = []
        return oldResult

def main():
    sol = Solution()
    digits = "23"
    letterCombos = sol.letterCombinations(digits)
    print(letterCombos)
    assert len(letterCombos) == 9
    digits = ""
    letterCombos = sol.letterCombinations(digits)
    print(letterCombos)
    assert len(letterCombos) == 0
    digits = "2"
    letterCombos = sol.letterCombinations(digits)
    print(letterCombos)
    assert len(letterCombos) == 3

main()

'''
Data range/assumptions:
digit len: [0,4]
digit values [2, 9]
'''

'''
Tests:
Empty string
4 len string
All same digit
All different digit
Uses 9
Uses 7
'''

'''
Ideas:

Naive:
    Old Result = [""]
    Result = []
    for i in range(len(digits)):
        Add each potential letter for the digit to each partial result in oldResult
        oldResult = result
        result = []
    return oldResult

    Time complexity:
        ~4^n worst case
        Very bad, but since n <= 4, not so bad
            256
'''