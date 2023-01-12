from typing import List

class TreeNode :
    def __init__(self, value):
        self.value = value
        self.neighbours = []

class Solution:
    hasApple = None
    adjacencyList = None
    visited = None

    def minTime(self, n: int, edges: List[List[int]], hasApple: List[bool]) -> int:
        if n == 1:  return 0
        self.adjacencyList = self.makeAdjacencyList(edges, n)
        self.hasApple = hasApple
        totalHeight = 0
        for neigh in self.adjacencyList[0]:
            totalHeight += self.adjHelper(neigh)
        return totalHeight
    
    def adjHelper(self, currentIndex):
        totalHeight = 0

        # Depth first traversal of children
        for neigh in self.adjacencyList[currentIndex]:
            totalHeight += self.adjHelper(neigh)

        if totalHeight > 0 or self.hasApple[currentIndex]:
            totalHeight += 2
        # print("Tree value %d has a distance of %d" % (tree.value, totalHeight))
        return totalHeight

    # NOTE: this adjacency list doesn't include all edges and 
    # relies on taking minimum steps to determine what edges to use
    def makeAdjacencyList(self, edges, n):
        adjList = [[] for i in range(n)]
        used = set()
        for edge in edges:
            sender = edge[0]
            receiver = edge[1]
            if not sender in used and receiver in used:
                sender = edge[1]
                receiver = edge[0]
            adjList[sender].append(receiver)
            used.add(sender)
            used.add(receiver)
        return adjList
    




    def treeMinTime(self, n: int, edges: List[List[int]], hasApple: List[bool]) -> int:
        myTree = self.makeTreeFromEdges(edges)
        self.hasApple = hasApple
        if len(myTree.neighbours) == 0: return 2
        totalHeight = 0
        for neigh in myTree.neighbours:
            totalHeight += self.helper(neigh)
        return totalHeight
    
    def helper(self, tree):
        totalHeight = 0

        # Depth first traversal of children
        for neigh in tree.neighbours:
            totalHeight += self.helper(neigh)

        if totalHeight > 0 or self.hasApple[tree.value]:
            totalHeight += 2
        # print("Tree value %d has a distance of %d" % (tree.value, totalHeight))
        return totalHeight
    
    def makeTreeFromEdges(self, edges: List[List[int]]):
        nodeDict = {}
        for edge in edges:
            sender = edge[0]
            receiver = edge[1]
            if not sender in nodeDict and receiver in nodeDict:
                sender = edge[1]
                receiver = edge[0]
            if receiver not in nodeDict:  nodeDict[receiver] = TreeNode(receiver)
            if sender not in nodeDict:  nodeDict[sender] = TreeNode(sender)
            nodeDict[sender].neighbours.append(nodeDict[receiver])
        return nodeDict[0]

def main():
    sol = Solution()
    n = 4
    edges = [[0,2],[0,3],[1,2]]
    hasApple = [False,True,False,False]
    minTime = sol.minTime(n, edges, hasApple)
    print(minTime)
    assert minTime == 4
    n = 8
    edges = [[0,1],[1,2],[2,3],[1,4],[2,5],[2,6],[4,7]]
    hasApple = [True,True,False,True,False,True,True,False]
    minTime = sol.minTime(n, edges, hasApple)
    print(minTime)
    assert minTime == 10
    n = 7
    edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]]
    hasApple = [False,False,True,False,True,True,False]
    minTime = sol.minTime(n, edges, hasApple)
    print(minTime)
    assert minTime == 8
    n = 7
    edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]]
    hasApple = [False,False,False,False,False,False,False]
    minTime = sol.minTime(n, edges, hasApple)
    print(minTime)
    assert minTime == 0

main()

'''
Data range/assumptions:
number of nodes n: [1, 10^5]
number of edges e; n - 1
from edge is less than destination edge
hasApple len = n
'''

'''
Tests:
n = 1
n = 10^5
cycles
hasApple many apples
hasApple one apple
deep is fastest?
'''

'''
Ideas:

Naive:
    Find each apple
    Find distance between each apple
    Minimize

How would a person do it:
    Closest one to root first (greedy)
    Finish disjoint sections before returning to root
        Disjoint happens at branch
        Doesn't matter order we do each branch, since have to come back
    Difficulty: intersections between branches possible, so it's not trivial determining if 
        No, because of edges = n - 1 limit
        Each branch will only connect to one parent and one child?
            Except root, which has no parent

Recursive, use height for shared splits
Two times the height, since need to come back
But only return height if an apple was found on the traversal, else 0

Time complexity of solution:
    Make tree:
        O(e)
        O(n) here because e = n - 1
    Traverse tree:
        recursive call for each node
        calls iterate over neighbours
        Worst case: fully connected graph
            n calls, each iterating over n-1 neighbours
            n * n
            O(n^2)
            But this can be solved by marking nodes as visited already?
        here, since edges = n - 1, sum of all those neighbours is n - 1?
        O(n) here

    Total:
        General case with no restriction on e:
            O(e + n^2)
        Here:
            O(2n) -> O(n)

Using an adjaceny list rather than a TreeNode class:
    Making it is the same time complexity as a tree
    Easier to get an arbitrary node, but we don't need to do that here
        Only need to get nodes that are children of other nodes in that order

I turn an undirected graph into a directed graph here
    Neighbour only added to one half
    Passes the tests, but is this safe?
        Initially, method assumed that lower value always the right one to add it to
        But now, modify that if lower value is not in the tree but higher value is
            E.g. [0,2], [1,2]
    Minimizing steps means using the earliest connection to a node, rather than a longer route
        Wouldn't be the case with uneven costs for edge traversal
        E.g. trivial proof
            [0,1, cost=100], [0,2, 1], [1, 2, 1], all nodes have apples and must be visited
            Best to go 0,2,1
            But the 2,1 edge wouldn't exist in my graph
'''