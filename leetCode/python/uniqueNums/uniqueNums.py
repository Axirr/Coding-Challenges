from typing import List
from collections import Counter

class Solution:
    def uniqueOccurrences(self, arr: List[int]) -> bool:
        occurenceCounter = Counter()
        for num in arr:
            occurenceCounter[num] += 1
        uniqueValuesSet = set()
        for key in occurenceCounter:
            originalLen = len(uniqueValuesSet)
            uniqueValuesSet.add(occurenceCounter[key])
            newLen = len(uniqueValuesSet)
            if originalLen == newLen:  return False
        return True

def main():
    mySol = Solution()
    arr = [1,2,2,1,1,3]
    isUnique = mySol.uniqueOccurrences(arr)
    print(isUnique)
    assert isUnique

main()

'''
Data range/assumptions:
[1, 1000]
Medium value size
'''

'''
Tests:
Len 1
Len 1000
Unique
Not unique
All same
All different
'''

'''
Ideas:

Naive:
    Count all occurrences
    Traverse counter, putting values into set
    If value in set:  return False
    return True

    Time complexity:
        n for counting
        n for checking values (in worst case)

Better:
    Keep set of values:
        If value
'''