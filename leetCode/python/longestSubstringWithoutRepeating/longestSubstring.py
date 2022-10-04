import string
from collections import Counter

class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        if s == "":     return 0

        # validLetters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~ abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~ \n"
        # print(len(validLetters))
        # numSymbols = 191
        maxSubstringLen = 1
        myCount = Counter()
        left = right = 0
        while (right < len(s)):
            rightLetter = s[right]
            myCount[rightLetter] += 1

            # While duplciate, shrink left
            while (myCount[rightLetter] > 1):
                myCount[s[left]] -= 1
                left += 1

            maxSubstringLen = max(maxSubstringLen, right - left + 1)

            right += 1

        return maxSubstringLen

def main():
    mySolution = Solution()
    myString = "hello"
    resultCount = mySolution.lengthOfLongestSubstring(myString)
    assert resultCount == 3
    print(resultCount)
    myString = "abcabcbb"
    resultCount = mySolution.lengthOfLongestSubstring(myString)
    assert resultCount == 3
    print(resultCount)
    myString = "bbbbb"
    resultCount = mySolution.lengthOfLongestSubstring(myString)
    assert resultCount == 1
    print(resultCount)
    myString = "pwwkew"
    resultCount = mySolution.lengthOfLongestSubstring(myString)
    assert resultCount == 3
    print(resultCount)
    myString = "au"
    resultCount = mySolution.lengthOfLongestSubstring(myString)
    print(resultCount)
    assert resultCount == 2
    myString = "dvdf"
    resultCount = mySolution.lengthOfLongestSubstring(myString)
    print(resultCount)
    assert resultCount == 3

main()

'''
Data range/assumptions
Strings can be 0
Strings can be very long
Valid digits are alpha + num + symbolsa + space
    Len defines longest possible non-repeating substring
'''

'''
Test cases
Empty string
Single character
No duplicates -> whole string
Duplicate letters are first and last
All duplicates
'''

'''
Plain language:
Strings this long, naive n^2 isn't going to do it
Dynamic programming
    Halving doesn't work?
        Because sum of substring halves might not be right
        E.g. "
    Extend by 1?
        substring(start, finish + 1) = substring(start, finish) + substring(finsish, finish + 1)
Count dictionary?
    But then we know not valid, but where to break
        E.g. abcdefgha would only be shorted by 1, but bcdefghaa would use the front
Recursive:
    Basic case: single letter, whole thing
    Extend left and right?
Cases when duplicate found
    Include original, duplicate + 1 now one boundary
    Include duplicate, original - 1 now one boundary
But what of case like 123456788988....
    If we started on 9, we would find duplicates both directions
    But longest would be the start part
So can't just start in middle
Have to do all n letters, extending until we find a duplicate
    Worst case: duplicates are front and back, so everything extends n -> n ^ 2
Traverse string counting duplicates, keeping index
    Construct span for each letter, duplicate to duplicate
    Each one of those is a conditon that needs to be met if in relevant index range
        E.g. is [i, j] a valid substring
            Yes if not duplicate a, b, c...
        if startRange in [i,j] and endRange in [i,j]
            that's a duplicate
        Starting with big range is bad idea
            E.g. if can't find a 2 ranger, obviously can't find a 2+ ranger
        But incrementing bad too
            Binary mid?
            If half not possible
                Possible range: [half - 1, 1]
            If half possible:
                Possible range: [all, half + 1]
            Search mid of possible range, cut range down accordingly
    Keep track of minLength of all characters
        That's maximum length, shouldn't start past that
Worst case here
    All duplicates -> spans same length as string

Letter by letter span isn't worst case of n ^ 2
    Maximum valid string can only be ~40 in length
    So it would be 40 n, not n ^ 2
    Substantially different
    Doable at this scale I think

Plain language:
    maxSubstringLen = 1
    for i in range(len(myStr)):
        letterSet = myStr[i]
        count = 0
        for j in range(i + 1, min(i + 40, len(myStr)):
            if myStr(j) in letterSet:
                maxSubstringLen = max(count, maxSubstringLen)
                break
        if (maxSubstringLen >= 40): return maxSubstringLen

    Sanity check:
        Time complexity alright? Yes, should be n 40
        Works?
            Will test all possible valid substrings
            Will break early if found theoretical max

Better solution:
    Repeating work
        Move one letter over, most of the duplicates are the same
        Also:
            Should start at the j that broke the loop
                Since anything before that has been disqualified/counted
'''

