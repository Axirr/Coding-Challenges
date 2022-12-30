from typing import List

class Solution:
    graph = None
    target = None
    cache = {}
    def allPathsSourceTarget(self, graph: List[List[int]]) -> List[List[int]]:
        self.graph = graph
        self.target = len(graph) - 1
        self.cache = {}
        return self.helper(0)
    
    def helper(self, startIndex) -> List[List[int]]:
        resultList = []
        for node in self.graph[startIndex]:
            if not node == self.target:
                if startIndex in self.cache:
                    subResults = self.cache[startIndex]
                else:
                    subResults = self.helper(node)
                for res in subResults:
                    resultList.append([startIndex] + res)
            else:
                resultList.append([startIndex, node])
        return resultList

def main():
    sol = Solution()
    graph = [[1,2],[3],[3],[]]
    correctOutput = [[0,1,3],[0,2,3]]
    actualOutput = sol.allPathsSourceTarget(graph)
    print(actualOutput)
    assert actualOutput == correctOutput
    graph = [[4,3,1],[3,2,4],[3],[4],[]]
    correctOutput = [[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]
    actualOutput = sol.allPathsSourceTarget(graph)
    print(actualOutput)
    assert actualOutput == correctOutput

main()

'''
Data range/assumptions:
nodes n: [2, 15]
All elements unique
Directed acyclic graph
'''

'''
Tests:
Two nodes
15 nodes
One long path
Many branching paths 
Balanced
Unbalanced
'''

'''
Ideas:

Naive:
    Keep a copy of path
    For each branch, create a copy of branch and add the next
    When reach target, stop and add path to result list

Worst case: all nodes connected to all other nodes except for edges that would create cycles?
    For this small of an n, doesn't seem that bad

Will get duplicates?
    Only parts of the path, and that is non-duplicate in net

Better: build out from target so don't have to duplicate work
    Then when hit node that has been visited before, know path
    Recursive with memoization
'''