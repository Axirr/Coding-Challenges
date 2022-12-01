class Solution:
    def halvesAreAlike(self, s: str) -> bool:
        string1 = s[:len(s) // 2].lower()
        string2 = s[len(s) // 2:].lower()
        count = 0
        for letter in string1:
            if letter in 'aeiou':  count += 1
        for letter in string2:
            if letter in 'aeiou': count -= 1
        return count == 0

def main():
    mySol = Solution()
    s = "book"
    isAlike = mySol.halvesAreAlike(s)
    print(isAlike)
    assert isAlike
    s = "textbook"
    isAlike = mySol.halvesAreAlike(s)
    print(isAlike)
    assert not isAlike

main()

'''
Data range/assumptions:
Even
Medium length
Non-empty
Both upper and lower
'''

'''
Len 2
Large len
Equal but upper
'''

'''
Ideas:

Naive:
    Convert to all lower
    Count vowels in each
'''