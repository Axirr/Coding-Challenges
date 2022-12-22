from typing import List
from collections import defaultdict

class Solution:
    def sumOfDistancesInTree(self, n: int, edges: List[List[int]]) -> List[int]:
        myTreeDict = self.treeFromEdges(n, edges)
        count = [1] * n
        ans = [0] * n
        # Post-order traversal building counting and partial answers for nodes with children
        # Partial answers only right for node 0
        def recursiveCount(directParent, grandParent = None):
            for child in myTreeDict[directParent]:
                if child != grandParent:
                    recursiveCount(child, directParent)
                    count[directParent] += count[child]
                    ans[directParent] += ans[child] + count[child]
        recursiveCount(0)
        print(count)
        print(ans)
        # Pre-order traversal, building full ans
        def recursiveAnswer(parent, grandParent = None):
            for child in myTreeDict[parent]:
                if child != grandParent:
                    ans[child] = ans[parent] - count[child] + n - count[child]
                    print(ans)
                    recursiveAnswer(child, parent)
        recursiveAnswer(0)
        return ans
    

    def treeFromEdges(self, n, edges):
        nodeDict = defaultdict(set)
        for u, v in edges:
            nodeDict[u].add(v)
            nodeDict[v].add(u)
        return nodeDict

def main():
    sol = Solution()
    # n = 6
    # edges = [[0,1],[0,2],[2,3],[2,4],[2,5]]
    # distanceList = sol.sumOfDistancesInTree(n, edges)
    # print(distanceList)
    # assert distanceList == [8,12,6,10,10,10] 
    # n = 2
    # edges = [[1,0]]
    # distanceList = sol.sumOfDistancesInTree(n, edges)
    # print(distanceList)
    # assert distanceList == [1,1]
    n = 8
    edges = [[0,1],[0,2],[2,3],[2,4],[2,5], [5,6], [6,7]]
    distanceList = sol.sumOfDistancesInTree(n, edges)
    print(distanceList)
    # assert distanceList == [8,12,6,10,10,10] 

main()

'''
Data range/assumptions:
Node n: [1, large]
Edges: n - 1
Node labels: [0, n - 1]
'''

'''
Tests:
Single node
Large n
All in a line
Many bifurcations and back edges
'''

'''
Ideas:

Naive:
    Recursive, each subtree has own lengths plus lengths that it took to get there * k of subtree
    Subtree only when branches, not just continues?
    Or every move down is a subtree?
        More general, but that's a lot of recursive calls

Sum of level = number of nodes
Branch causes numbers to differ, so that's where the recursive would happen

Each node's distnace is just height?
BSF keeping height

How to search a tree defined by edges?
    Could use edges to make a tree of node.value and node.next = []
    With a constant time lookup/add colelction, would only be O(n) to create?


Heights can be used well when trees share parent distances were calculated off
Find place where they intersect, and then calculate distance from that
    Since all heights are "positive"

First shared common ancestor, fix the distance to add per node to the current distance

Tree form as a collection of all child nodes of parent nodes
    Not just immediate ones
    That could get huge fast though

Only have to recalculate heights when go above common ancestor?

Bottom up, from leaf nodes?
Keep count of nodes to apply new distance to

Leaf -> parent -> all other leaves, get running total and n


Looked at solution vaguely:
If have sub-solution for two neighbours, then can easily calculate the total by just adding countSubneighbours

Base count = 1 for each node
But then need to add the sum of it's children
Have to do DFS to ensure have size of subtrees before try to do higher level

Base case: leaf
    Distance: 1
    Count: 1
General case: parent = 1 * count + sum(children)


First example:
0
1   2
    3   4   5

Each starts at 0
DFS, down to 1
0 = 1 + 2 children + sum(childi + counti)
1 = 1 + 0 children + sum(childi + c)

Neighbours definition weird
    Parent child = neighbours?
    Or are 1 and 2 neighbours here? I.e. shared parent?

0 done manually:
    Left has 1
    Right has 1 immediate
    Then 3 paths of 2 = 6
    Total 8

0 done through formula
    Left Tree count = 1
        1 + subtrees
            Subtrees: none
    Right tree count = 4
        4 + subtree
        Subtree has 3 subtrees
            Each count 1 -> 3
            Their subtrees have 0

Do recursive count first, starting everything at 1
But how do we structure

Imagine straight line graph
Each lower level only adds 1, despite count of those trees being large
    Because the additional count at that level is the relevant thing, not total count
'''