class Solution:
    def makeGood(self, s: str) -> str:
        i = 0
        while (i < len(s) - 1):
            first = s[i]
            isFirstUpper = first.isupper()
            second = s[i+1]
            isSecondUpper = second.isupper()
            if first.lower() == second.lower():
                if (isFirstUpper and not isSecondUpper) or (not isFirstUpper and isSecondUpper):
                    s = s[:i] + s[i+2:]
                    i = max(0, i - 1)
                    continue
            i += 1
        return s


def main():
    mySol = Solution()
    myString = 'leEeetcode'
    s = mySol.makeGood(myString)
    print(s)

main()

'''
Data range/assumptions:
Non-empty
    Empty result allowed
Short
Only lower and upper case letters
'''

'''
Tests:
Single char
All bad?
'''

'''
Ideas:

Naive:
    Traverse string to second last
    Check if self and neighbour are opposite capital
    Remove if so
'''