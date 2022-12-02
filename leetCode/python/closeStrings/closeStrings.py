from collections import Counter

class Solution:
    def closeStrings(self, word1: str, word2: str) -> bool:
        # Since operations can't change length
        if len(word1) != len(word2):  return False
        
        # Count occurences of letters for each string
        countDictOriginal = Counter()
        countDictDestination = Counter()
        for i in range(len(word1)):
            countDictOriginal[word1[i]] += 1
            countDictDestination[word2[i]] += 1

        # Check have at least one instance of all the same letters
        # Since swaps can only be between two existing letters
        originalKeys = list(countDictOriginal.keys())
        destinationKeys = list(countDictDestination.keys())
        if len(originalKeys) != len(destinationKeys):  return False
        destinationKeys.sort()
        originalKeys.sort()
        if originalKeys != destinationKeys:  return False

        # Check collective count values are the same, since need the correct value to swap to if wrong
        valuesOriginal = list(countDictOriginal.values())
        valuesOriginal.sort()
        valuesDestination = list(countDictDestination.values())
        valuesDestination.sort()
        if valuesOriginal != valuesDestination:  return False

        letterList = list("abcdefghijklmnopqrstuvwxyz")
        sharedButWrong = []
        for letter in letterList:
            if countDictOriginal[letter] != countDictDestination[letter]:
                sharedButWrong.append(letter)

        sharedCountsOriginal = [countDictOriginal[letter] for letter in sharedButWrong]
        for letter in sharedButWrong:
            try:
                sharedCountsOriginal.remove(countDictDestination[letter])
            except ValueError:
                return False
        # Not sure if try/except is faster than just sorting each and comparing
        # sharedCountsOriginal = [countDictOriginal[letter] for letter in sharedButWrong]
        # sharedCountsOriginal.sort()
        # sharedCountsDestination = [countDictDestination[letter] for letter in sharedButWrong]
        # sharedCountsDestination.sort()
        # if sharedCountsOriginal != sharedCountsDestination:  return False

        return len(sharedCountsOriginal) == 0

def main():
    mySol = Solution()
    word1 = "abc"
    word2 = "bca"
    areClose = mySol.closeStrings(word1, word2)
    print(areClose)
    assert areClose
    word1 = "a"
    word2 = "aa"
    areClose = mySol.closeStrings(word1, word2)
    print(areClose)
    assert not areClose
    word1 = "cabbba"
    word2 = "abbccc"
    areClose = mySol.closeStrings(word1, word2)
    print(areClose)
    assert areClose
    word1 = "uau"
    word2 = 'ssx'
    areClose = mySol.closeStrings(word1, word2)
    print(areClose)
    assert not areClose
    

main()

'''
Data range/assumptions:
String lengthes [1, large]
All lowercase letters
'''

'''
Tests:
Both 1 letter, but different
    True
True with 2 character swap
True with replace all of one with others
False because would need both operations
'''

'''
Ideas:

Naive:
    if len != return False
    Count letters and record indexes where letters are different
        And set of letters that are different
        If differentLetters > 3:  return False
    if len(diffLetters) == 0:  return True
    If diffLetters >= 3, false
    If difference letters = 2
        If string1[first] == string1[second] and v.v.
            True by swap
    Replace multiple path:
    if len(diffLetters) == 1: return True
    elif == 2:
        countDiffDict1 = {}
        countDiffDict2 = {}
        add all different count numbers
        two cases:
            each have 2:
                keys = countDiffDict1.keys():
                    if countDiffDict1[keys[0]] = ...[key[1]] and v.v.:  return True
                    else:  return False
            each has 1:
                dealt with by len(diffLetters) == 1?
                check if same
    
    Time complexity:
        Letter count n
        Other stuff is worst case n size
        So O(n)


    Sanity check:
        Deals with no differences: yes
        Deals with one swap differences: yes
        Deals with two swap differences: yes
        Original problem is understood correctly:  maybe not?
            "Can use operations as many times as want"
            So multiple swaps and multiple replaces?
                Yep, confirmed by examples

When wouldn't you be able to make it work?
    Different length
    Too many of something, and can't swap it to something else
    I.e. count1 != count2 and no swappable count that wouldn't cause the same problem (i.e. too much of one thing)

Swap operation functionally makes the string a set not an ordered collection

So count strings, and assert counts equal between the the strings
    Since counts can be swapped?

If c has the count a needs, but a isn't what c needs...
    E.g. aaacc -> cccaa

Can only use things for swaps that are different from what they should be
    for letter in count1:
        if count1[letter] != count2[letter]:
            possibleSwaps.append(count1[letter])
            usedLetters.append(letter)
    ...

What about free swaps?
    I.e. letters that are 0 in the result but non-zero in original
        Need to have a destination letter to go to
    for letter in count2:
        if count2 == 0 and count1 != 0:
            neededSwaps.append(count1)

Pairs?
    (5,0) means destination needs something short by 5
    (0, 5) means original needs something with exactly 5 that is supposed to be a 0
    Need these pairs to cancel out?

Are chain pairs a thing:
    E.g. 1,2 to 2,3 to 3,4
    Don't think so?
'''