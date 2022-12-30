from typing import List
from copy import copy

class Solution:
    # Class variables used in recursive method
    graph = None
    target = None
    cache = {}

    # Dynamic programming top down
    def allPathsSourceTarget(self, graph: List[List[int]]) -> List[List[int]]:
        targetIndex = len(graph) - 1
        cache = {}
        frontier = [[0]]
        solutions = []
        while (frontier):
            currPath = frontier.pop()
            endCurrPath = currPath[-1]
            for node in graph[endCurrPath]:
                copyPath = copy(currPath)
                if node == targetIndex:
                    copyPath.append(node)
                    solutions.append(copyPath)
                    cache[copyPath[0]] = copyPath
                else:
                    if node in cache:
                        solutions.append(copyPath + cache[node])
                    else:
                        copyPath.append(node)
                        frontier.append(copyPath)
        return solutions

    # Recursive with memoization
    def recursiveAllPathsSourceTarget(self, graph: List[List[int]]) -> List[List[int]]:
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
    correctOutput.sort()
    actualOutput = sol.allPathsSourceTarget(graph)
    actualOutput.sort()
    print(actualOutput)
    assert actualOutput == correctOutput
    graph = [[4,3,1],[3,2,4],[3],[4],[]]
    correctOutput = [[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]
    correctOutput.sort()
    actualOutput = sol.allPathsSourceTarget(graph)
    actualOutput.sort()
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

Time complexity:
    Will traverse each edge exactly once
    Otherwise will use cached version
    O(e), assuming all nodes are accessible

All edges will have to be visited, so bottom up could be more efficient
Restructuring as bottom up dynamic programming:
    But bottom up is difficult here because edges are directed
    Given minimal advantages of bottom up versus top down, top down seems better here

What about top down non-recursive?

If build tree by height, then can create lists from those heights, stopping everytime we hit target
'''