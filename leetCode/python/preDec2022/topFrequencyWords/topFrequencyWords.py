from collections import Counter
from typing import *
import functools

class Solution:
    def topKFrequent(self, words: List[str], k: int) -> List[str]:
        wordCount = Counter(words)
        stringCountList = list(wordCount.items())
        stringCountList = sorted(stringCountList, key=functools.cmp_to_key(self.compareKeyValue))
        for item in stringCountList:
            print(item)
        resultList = [item[0] for item in stringCountList[0:k]]
        return resultList
    
    def compareKeyValue(self, item1, item2):
        if (item2[1] > item1[1]):
            return 1
        elif item2[1] == item1[1]:
            if item1[0] > item2[0]:
                return 1
            elif item1[0] == item2[0]:
                return 0
            else:
                return -1
        else:
            return -1

def main():
    mySol = Solution()
    wordList = ['d', 'ab', 'ab', 'ce']
    stringNum = 2
    resultList = mySol.topKFrequent(wordList, stringNum)
    print(resultList)
    wordList = ["i","love","leetcode","i","love","coding"]
    stringNum = 3
    resultList = mySol.topKFrequent(wordList, stringNum)
    print(resultList)

main()

'''
Data range/assumptions:
Non-empty
k is valid for num of unique words
Lowercase letters
Medium word length
Medium word num
'''

'''
Test cases:
Single word
k = 1
k = all
tie?
words.length = 500
'''

'''
Ideas:
Naive:
    Count all words
    Traverse dictionary k times
        resultList.append(max)
        pop(max)
    Time complexity:
        Count = n
        Get max = k * n
    Probably passable, but slow

Better:
    Construct sorted list from countDictionary
        (key, value), so can compare to others
    Slice[0:k]
    Sorting:
        n * log(n)
            Even for dictionary?
                O(1) lookup
'''