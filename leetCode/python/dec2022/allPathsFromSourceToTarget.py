from typing import List
import random as rand
from functools import wraps
import time

def timeit(func):
    @wraps(func)
    def timeit_wrapper(*args, **kwargs):
        start_time = time.perf_counter()
        result = func(*args, **kwargs)
        end_time = time.perf_counter()
        total_time = end_time - start_time
        # print(f'Function {func.__name__}{args} {kwargs} Took {total_time:.4f} seconds')
        print(f'Function {func.__name__} Took {total_time:.4f} seconds')
        # return total_time
        return result
    return timeit_wrapper

class Solution:
    # Class variables used in recursive method
    graph = None
    target = None
    cache = {}
    cacheHitNum = None

    # Dynamic programming top down
    @timeit
    def allPathsSourceTarget(self, graph):
        targetIndex = len(graph) - 1
        frontier = [[0]]
        solutions = []
        while (frontier):
            currPath = frontier.pop()
            endCurrPath = currPath[-1]
            for node in graph[endCurrPath]:
                copyPath = currPath[0:]
                copyPath.append(node)
                if node == targetIndex:
                    solutions.append(copyPath)
                else:
                    frontier.append(copyPath)
        return solutions

    # Recursive with memoization
    @timeit
    def recursiveAllPathsSourceTarget(self, graph: List[List[int]]) -> List[List[int]]:
        self.graph = graph
        self.target = len(graph) - 1
        self.cache = {}
        self.cacheHitNum = 0
        result = self.helper(0)
        print("Cache hits: %d" % self.cacheHitNum)
        return result

    @timeit
    def noCacheRecursiveAllPathsSourceTarget(self, graph: List[List[int]]) -> List[List[int]]:
        self.graph = graph
        self.target = len(graph) - 1
        return self.helperNoCache(0)
    
    def helper(self, startIndex) -> List[List[int]]:
        # if startIndex in self.cache:
        #     print("cached")
        #     return self.cache[startIndex]
        resultList = []
        for node in self.graph[startIndex]:
            if not node == self.target:
                if node in self.cache:
                    self.cacheHitNum += 1
                    subResults = self.cache[node]
                else:
                    subResults = self.helper(node)
                for res in subResults:
                    resultList.append([startIndex] + res)
            else:
                resultList.append([startIndex, node])
        self.cache[startIndex] = resultList
        return resultList

    def helperNoCache(self, startIndex) -> List[List[int]]:
        # if startIndex in self.cache:
        #     print("cached")
        #     return self.cache[startIndex]
        resultList = []
        for node in self.graph[startIndex]:
            if not node == self.target:
                subResults = self.helperNoCache(node)
                for res in subResults:
                    resultList.append([startIndex] + res)
            else:
                resultList.append([startIndex, node])
        # print(startIndex)
        # print(resultList)
        return resultList
    
    def generateTestCaseWithNNodes(self, n):
        resultList = []
        rand.seed()
        for i in range(n):
            newList = []
            maxEdges = min(7, n // 10)
            failProb = 1 / maxEdges
            possibleEdges = [j for j in range(i+1, n)]
            while maxEdges > 0 and len(possibleEdges) > 0:
                if rand.random() < failProb:
                    maxEdges -= 1
                    continue
                randomIndex = rand.randrange(0, len(possibleEdges))
                newList.append(possibleEdges.pop(randomIndex))
                maxEdges -= 1
            resultList.append(newList)
        return resultList

def main():
    sol = Solution()
    n = 89
    graph = sol.generateTestCaseWithNNodes(n)
    print("graph generated with %d nodes" % n)
    # output = sol.noCacheRecursiveAllPathsSourceTarget(graph)
    # print(len(output))
    output = sol.recursiveAllPathsSourceTarget(graph)
    print(len(output))
    output = sol.allPathsSourceTarget(graph)
    print(len(output))
    return
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

Does our top down version take advantage of memoization much?
It's BFS, so only paths that are longer can use shorter ones
    And, the shorter one has to be finished by the time that node gets in the path

Better: DFS
'''