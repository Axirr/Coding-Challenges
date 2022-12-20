from functools import cache
from copy import copy

class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        bestSolutions = []
        minString = text1
        maxString = text2
        if len(text2) < len(text1):
            minString = text2
            maxString = text1
        if minString[0] == maxString[0]:
            bestSolutions.append([1])
        else:
            bestSolutions.append([0])
        for i in range(1, len(minString)):
            if minString[i] == maxString[0]:
                bestSolutions.append([1])
            else:
                bestSolutions.append(copy(bestSolutions[i-1]))
        for j in range(1, len(maxString)):
            if maxString[j] == minString[0]:
                bestSolutions[0].append(1)
            else:
                bestSolutions[0].append(bestSolutions[0][-1])
        for i in range(1, len(minString)):
            for j in range(1, len(maxString)):
                if minString[i] == maxString[j]:
                    bestSolutions[i].append(bestSolutions[i-1][j-1] + 1)
                else:
                    bestSolutions[i].append(max(bestSolutions[i-1][j], bestSolutions[i][j - 1]))
        #DP[i][j] = DP[i - 1][j - 1] + 1 , if text1[i] == text2[j] DP[i][j] = max(DP[i - 1][j], DP[i][j - 1]) , otherwise
        return bestSolutions[len(minString) - 1][len(maxString) - 1]


def main():
    sol = Solution()
    text1 = "abcde"
    text2 = "abcde" 
    length = sol.longestCommonSubsequence(text1, text2)
    print(length)
    # assert length == 3

main()

'''
Data range/assumptions:
string lengths: [1, 1000]
characters: lowercase English letters
'''

'''
Tests:
string len 1
string len 1000
full match
barely match
'''

'''
Ideas:
Can we delete entirely from one string?
    No
    E.g. abcd
        aed
        Longest should eb ad

Naive
    Recursive
    When find letter that doesn't match
        Try deleting the next letter from each
        Recursively call on those modified strings
        Return max length of those two
    
    Time complexity: very bad
    Worst case:
        Have to run through a lot of matches before get to different part
        Then have to do it again twice
        n * 2n * k where k is numbers of letters that need to be removed before match

Delete any unique letters in each word
    For long strings, this pruning likely becomes very small
2n for letter counts

Dynamic programming like palindrome?
    Just don't have to always add letters, only when they match
    But they're not symmetrically aligned like palindrome

String as series of letter1.index < letter2.index
If only one string was modifiable
    For next letter, if can't find, longest substring was how far you got in the unmodifiable string
    When reach impasse like this, modify it and see?
    hello world
    lola old
    Remove uniques
    llo old
    lol old
    l
    l
    lo
    lo
    lol
    lol
    lold
    lold
    But real solution is llold

Record "cost" of keeping a letter
I.e. had to remove n letters in other one to make work
Cost reduces maximum possible length
Priority cue based on maximum possible length and a frontier
    (sumCost, modifiedString1, modifiedString2)
If take the lowest sumCost always, should end up with optimal?
Build dynamically that way, for each letter as starting letter
From back to front

remove uniques
for i in range(len(string1)):
    letter1 = string1[i]
    letter2 = string1[i]
    best[]

Doesn't work because no simple solution for base case
E.g. "a" "e", which should we pick?
    Neither, don't match
    But may need those letters later

Running count of letters up to index?
    n * 26 dictionaries
    Don't include current letter, since order might not match?
    Lose order though
    E.g.
        aaabbbc
        bbbaaac
        at index of c, letter counts would be the same but all letters don't match
    Running count deals with this?
        Count one string (short string)
        Then for long string, start counting letters only if already exist in running short string dictionary
        E.g. aaabbbc
            Second string bbbaaac
            b can't go in because not b's in a count index 0
        Issue: e.g. abbbbbbbbbbbbbbbbbb
            bbbbbbbbbbbbbbbba
            Would prioritize string
            Switch string that is moving? But on what basis

Dynamic programming build with window:
Window size 1, shared letters

How many combos of strings can you create with deletions for a given n?
Each deletion has branching factor 2 (i.e. delete, don't delete)
2^n

Find the farthest left right matches?
E.g. abcd ac
    a
Greedy again, doesn't work
E.g. abbbbbbbbbbc bbbac

DP[i][j] represents longest subsequence from [0...i][0...j]
maxlength = min(i,j)
construct for i = 1, j = [] and v.v.
[i+1][j+1] = best[i][j] + if match next letter
for i in range(1, n):
    for j in range(n):
'''