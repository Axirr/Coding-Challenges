from typing import List

class Solution:
    def answerQueries(self, nums: List[int], queries: List[int]) -> List[int]:
        nums.sort()
        runningSum = [nums[0]]
        # Max query calculation and cut off good idea as long as len(queries) << len(n)?
        maxQuery = max(queries)
        for i in range(1, len(nums)):
            newSum = runningSum[i-1] + nums[i]
            runningSum.append(newSum)
            if newSum > maxQuery:
                break

        resultList = []
        for myQuery in queries:
            low = 0
            high = len(runningSum) - 1
            maxN = 0
            while low <= high:
                middleIndex = (low + high) // 2
                currentSum = runningSum[middleIndex]
                if currentSum <= myQuery:
                    maxN = max(middleIndex + 1, maxN)
                    low = middleIndex + 1
                else:
                    high = middleIndex - 1
            resultList.append(maxN)

        return resultList

    def slowAnswerQueries(self, nums: List[int], queries: List[int]) -> List[int]:
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
    sort nums in ascneding order
    subtract until under query sum

    Time complexity: n * log(n) + n * m
        sort: n * log(n)
        subtract: n worst case, m times

Better: determine if closer to 0 or numsSum
    Build up from length 0 if closer to 0
    
    Not a guranteed improvement

Running sum of nums from small to large, then binary search
    Sort ascending:     nlogn
    Add running sum ascending: n time, n space
    binary search
'''