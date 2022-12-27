from typing import List
from queue import PriorityQueue

class Solution:
    def bakanswerQueries(self, nums: List[int], queries: List[int]) -> List[int]:
        totalSum = sum(nums)
        resultList = []
        for myQuery in queries:
            if totalSum < myQuery:
                resultList.insert(0, len(nums))
                continue
            frontier = PriorityQueue()
            frontier.add((0, totalSum, nums))
            while len(frontier) > 0:
                currentEntry = frontier.get()
                currentRemoved = currentEntry[0] + 1
            resultList.insert(0, currentRemoved)
        return resultList
    
    def answerQueries(self, nums: List[int], queries: List[int]) -> List[int]:
        nums.sort()
        originalSum = sum(nums)
        result = []
        for query in queries:
            querySum = originalSum
            i = len(nums) - 1
            while querySum > query:
                querySum -= nums[i]
                i -= 1
                if i < 0:
                    break
            result.append(i+1)
        return result


def main():
    sol = Solution()
    n = [4,5,2,1]
    queries = [3,10,21]
    result = sol.answerQueries(n, queries)
    print(result)
    assert result == [2, 3, 4]
    n = [2,3,4,5]
    queries = [1]
    result = sol.answerQueries(n, queries)
    print(result)
    # assert result == [0]

main()

'''
Data range/assunptions:
n, m: [1,1000]
'''

'''
Tests:
'''

'''
Ideas:

Naive:
    Priority queue based on number left
    Try all one missings, then all two missings

Priority queue with double priority
    (numLeft, closestToSum)
'''