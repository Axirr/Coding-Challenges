from typing import List
from heapq import *

class Solution:
    labels = None
    adList = None
    parents = None
    currentMax = None

    def longestPath(self, parent: List[int], s: str) -> int:
        self.adList = self.makeAdjacencyList(parent)
        self.labels = s
        self.parents = parent
        self.unvisited = set([i for i in range(len(parent) - 1, -1, -1)])

        self.currentMax = 1
        while self.unvisited:
            start = self.unvisited.pop()

            if len(self.adList[start]) > 0:
                self.helperLongestPath(start)
        
        return self.currentMax
    
    def helperLongestPath(self, currentNode):
        lengths = [0,0]
        i = 0
        while i < len(self.adList[currentNode]):
            child = self.adList[currentNode][i]
            if not child == self.parents[currentNode]:
                if self.labels[child] != self.labels[currentNode]:
                    heappushpop(lengths, self.helperLongestPath(child) + 1)
                    if child in self.unvisited:
                        self.unvisited.remove(child)
            i += 1
        self.currentMax = max(self.currentMax, sum(lengths) + 1)
        return lengths[1]

    def makeAdjacencyList(self, parents):
        adjList = [[] for i in range(len(parents))]
        for i in range(1, len(parents)):
            adjList[i].append(parents[i])
            adjList[parents[i]].append(i)
        return adjList

def main():
    sol = Solution()
    parent = [-1,137,65,60,73,138,81,17,45,163,145,99,29,162,19,20,132,132,13,60,21,18,155,65,13,163,125,102,96,60,50,101,100,86,162,42,162,94,21,56,45,56,13,23,101,76,57,89,4,161,16,139,29,60,44,127,19,68,71,55,13,36,148,129,75,41,107,91,52,42,93,85,125,89,132,13,141,21,152,21,79,160,130,103,46,65,71,33,129,0,19,148,65,125,41,38,104,115,130,164,138,108,65,31,13,60,29,116,26,58,118,10,138,14,28,91,60,47,2,149,99,28,154,71,96,60,106,79,129,83,42,102,34,41,55,31,154,26,34,127,42,133,113,125,113,13,54,132,13,56,13,42,102,135,130,75,25,80,159,39,29,41,89,85,19]
    s = "ajunvefrdrpgxltugqqrwisyfwwtldxjgaxsbbkhvuqeoigqssefoyngykgtthpzvsxgxrqedntvsjcpdnupvqtroxmbpsdwoswxfarnixkvcimzgvrevxnxtkkovwxcjmtgqrrsqyshxbfxptuvqrytctujnzzydhpal"
    longestPath = sol.longestPath(parent, s)
    print(longestPath)
    assert longestPath == 17
    parent = [-1,0,0,1,1,2]
    s = "abacbe"
    longestPath = sol.longestPath(parent, s)
    print(longestPath)
    assert longestPath == 3
    parent = [-1,0,0,0]
    s = "aabc"
    longestPath = sol.longestPath(parent, s)
    print(longestPath)
    assert longestPath == 3
    parent = [-1,0,1]
    s = "aab"
    longestPath = sol.longestPath(parent, s)
    print(longestPath)
    assert longestPath == 2

main()

'''
Data range/assumptions:
Number of nodes n: [1, 10^5]
parent value indicates node number of parent
s len = n
s contains lowercase English letters
'''

'''
Tests:
1 node
10^5 nodes
Longest path = 0 because all children of root have same label as root
'''

'''
Ideas:

Naive:
    Recursive, only continuing down path if label of parent and child not the same

Constructing adjacency list from parent list:
    Same as edge list, but first edge is implicit from index

Slightly different than originally thought:
    Path can start from anywhere
    Can only use path length of 2 branches of a tree if that's our starting node
        And can never use more than 2

Use distances from the root?
    Distance = 0 if label condition broken
    Then iterate over list

Does root have to be on path?
    Don't think so
        E.g. orphaned root with no valid exit paths, there could easily be a valid path somewhere

Label conditions are at least the same for any start point
    Could use to prune tree by removing adjacency from list

Longest path from root often but not always on optimal path

Can only use two branches twice, so could integrate that into recrusive function
    Choices:
        if not haveTakenDouble:
            try both
                take single biggest
                take two biggest, flip haveTaken flag
        if haveTakeDouble:
            take single biggest

Label requirement can make a tree functionally disjoint
    Can iterate until find a valid starting point, but that may only be for part of the graph
    Keep a visited list, and if not in visited then run whole function again starting from anything in there


How to deal with not moving in both directions if including both adjacencies in list?
    Maybe don't have to include both now that the disjoint method has been implemented?


Define a non-disjoint situation where an arbitrary node starting point isn't on path:
    0 -> 1 -> very long
           -> very long
    Including 0 would necessitate only include one or other very long
    But can we still use calculated distances?
        Not currently saving, but could

Convert distances from root to distances from current
    Anything that connects to current from root would just have dist(root, current added)
    Anything that connects through current would have that distance subtracted
    Determining which it connects through:
        If in subtree or not?
        Partition tree above and below?
        Sum distances below

No cycles = children disjoint?
    Yes, because connection would create a cycle

So store sumOfNodesBelow
And store distance to root
Then max distance from that node = maxDistance from root - nodesBelow * selfDistance + (total - nodesBelow) * selfDistance

Has to be done once whole tree is calculated?
    Yes, because uses rootMaxDistance

But rootMaxDistance could (will) take two branches
    Not allowed if starting from a different node


Skimmed the solution
    Has some similarities to mine, but you have to store values for two longest chains for every node
    Using DFS, children will be calculated first
    Then parent is largestChild + secondLargestChild + 1
    Felt like this doesn't let child choose the parent path, but that is because that will be captured by a parent node further up
        I.e. starting point (i.e. where we take two maxes instead of one), will be a parent in that case

Modified mine to work using just the brief skim
    I was on the right track
    Was returning both maxes at one point instead of just one
'''