from typing import List

class Solution:
    def findJudge(self, n: int, trust: List[List[int]]) -> int:
        if n == 1:
            return 1
        adjacencyList = [[]]
        trustsSomeone = set()
        for i in range(n):
            adjacencyList.append([])
            trustsSomeone.add(i + 1)
        
        for myTrust in trust:
            adjacencyList[myTrust[1]].append(myTrust[0])
            trustsSomeone.discard(myTrust[0])
        
        for personNum in trustsSomeone:
            if len(adjacencyList[personNum]) == n - 1:  return personNum
        
        return -1

def main():
    sol = Solution()
    n = 2
    trust = [[1,2]]
    result = sol.findJudge(n, trust)
    print(result)
    assert result == 2

main()