class Solution:
    def detectCapitalUse(self, word: str) -> bool:
        if len(word) == 1:  return True
        if len(word) == 2:
            if word[0].islower() != word[1].islower() and word[1].isupper():
                return False
        if word[0].isupper() and word[1].isupper():
            for i in range(2, len(word)):
                if word[i].islower():
                    return False
        else:
            for i in range(1, len(word)):
                if not word[i].islower():
                    return False
        return True

def main():
    sol = Solution()
    word = "USA"
    isCorrect = sol.detectCapitalUse(word)
    print(isCorrect)
    assert isCorrect
    word = "FlaG"
    isCorrect = sol.detectCapitalUse(word)
    print(isCorrect)
    assert not isCorrect
    word = "ggg"
    isCorrect = sol.detectCapitalUse(word)
    print(isCorrect)
    assert isCorrect
    word = "mL"
    isCorrect = sol.detectCapitalUse(word)
    print(isCorrect)
    assert not isCorrect
    word = "cVe"
    isCorrect = sol.detectCapitalUse(word)
    print(isCorrect)
    assert not isCorrect

main()

'''
Data range/assumptions:
Word length n: [1, 100]
Upper and lowercase English letters
'''

'''
Tests:
1 letter
100 letters
All caps
No caps
One cap, first cap
One cap, not first cap
'''

'''
Ideas:

Naive:
    If first and second letter cap
        return false if anythong non-cap
    Else:
        return false if anything higher is cap
'''