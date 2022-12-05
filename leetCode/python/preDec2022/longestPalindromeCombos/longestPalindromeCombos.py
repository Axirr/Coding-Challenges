from typing import List

class Solution:
    def longestPalindrome(self, words: List[str]) -> int:
        countDict = {}
        for word in words:
            if word in countDict:
                countDict[word] += 1
            else:
                countDict[word] = 1
        wordCount = 0
        countedSingleValue = 0
        countKeys = iter(countDict.keys())
        key = next(countKeys)
        while (key):
            reverseKey = key[::-1]
            if key == reverseKey:
                wordCount += countDict[key] // 2
                if countedSingleValue == 0 and countDict[key] % 2 == 1:
                    countedSingleValue = 2
                    key = next(countKeys, None)
                    break
            elif reverseKey in countDict:
                wordCount += min(countDict[key], countDict[reverseKey])
                countDict[reverseKey] = 0
            key = next(countKeys, None)
        while (key):
            reverseKey = key[::-1]
            if key == reverseKey:
                wordCount += countDict[key] // 2
            elif reverseKey in countDict:
                wordCount += min(countDict[key], countDict[reverseKey])
                countDict[reverseKey] = 0
            key = next(countKeys, None)
        return 4 * wordCount + countedSingleValue

def main():
    mySol = Solution()
    words = ["lc","cl","gg"]
    resultInt = mySol.longestPalindrome(words)
    print(resultInt)
    assert (resultInt == 6)
    words = ["ab","ty","yt","lc","cl","ab"]
    resultInt = mySol.longestPalindrome(words)
    print(resultInt)
    assert (resultInt == 8)
    words = ["dd","aa","bb","dd","aa","dd","bb","dd","aa","cc","bb","cc","dd","cc"]
    resultInt = mySol.longestPalindrome(words)
    print(resultInt)
    #assert (resultInt == 22)



main()

'''
Data range/assumptions:
Non-empty words
Two letter words
Max length = long
'''

'''
Single word set
Large set
Duplicates?
    Allowed as far as I can tell
Centered on a singleton double
'''

'''
Ideas:

Naive:
    All combos of all words
    Unworkable at this scale

Pair is self palindrome only if double
Can be put at center

Non-doubles need a corresponding pair to be valid anywhere?
    Even a longer plaindrome has the corresponding pairs
        E.g. abcddcba
            ab/ba
            cd/dc

Palindrome validity assessment usually done letter by letter
Would work here, but can be done pair by pair as well
    If pair matches, letters will match

Remove duplicates = ab/ab/ba, one of these ab is not valid

Remove all non-paired words
    Using count dictionary
        Incrememnt for self
        Decrement for opposite
Valid pairs get us the length of the plaindrome directly?
    Can add any valid pair on the end

Problem: centered on a double
    Pairs become offset by 1
        Have to do two analysis, one offset
            That's second one is harder though
    
    Is the same, except for the last one?
        Since half of the next will pair with half of the next
        Last one doesn't have an added half, so can't work
            On either side, so just minus two words = 4 letters
            aabbaa
            claalc
    Actually not a problem

Algorithm:
    Count words
    wordCount = 0
    countedSingle = False
    for key in dict:
        reverseKey = key.reverse()
        if key == reverseKey:
            if not countedSingle:
                if countDict[key] % 2 == 1:
                    wordCount += 1
                    countedSingle = True
        else:
            #wordCount += take min(key, key.reverse())
            wordCount += countDict[key]//2
    if wordCount == 0:
        return -1
    else:  return 2 * wordCount
'''