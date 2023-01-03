from typing import List

class Solution:
    def minDeletionSize(self, strs: List[str]) -> int:
        columnsToDelete = 0
        for i in range(len(strs[0])):
            for j in range(len(strs) - 1):
                if strs[j][i] > strs[j+1][i]:
                    columnsToDelete += 1
                    break
        return columnsToDelete

def main():
    sol = Solution()
    strs = ["cba","daf","ghi"]
    deleteNum = sol.minDeletionSize(strs)
    print(deleteNum)
    assert deleteNum == 1
    strs = ["a","b"]
    deleteNum = sol.minDeletionSize(strs)
    print(deleteNum)
    assert deleteNum == 0
    strs = ["zyx","wvu","tsr"]
    deleteNum = sol.minDeletionSize(strs)
    print(deleteNum)
    assert deleteNum == 3

main()

'''
Data range/assumptions:
number of strings n: [1, 100]
string length k: [1, 1000]
n == k
'''

'''
Tests:
1 word
100 words
All sorted
None sorted
Some sorted
Duplicate letters
'''

'''
Ideas:

Naive:
    for i in range(len(strs)):
        for j in range(len(strs) - 1):
            if strs[j][i] > strs[j+1][i]:
                columnsToDelete.append(i)
'''