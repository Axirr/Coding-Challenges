from typing import List
from collections import Counter

class TreeNode :
    def __init__(self, value):
        self.value = value
        self.neighbours = []

class Solution:
    labels = None
    countForNodeAtIndex = None
    # currentLabels = None

    def countSubTrees(self, n: int, edges: List[List[int]], labels: str) -> List[int]:
        myTree = self.makeTreeFromEdges(edges)
        self.labels = labels
        self.countForNodeAtIndex = [-1 for _ in range(n)]
        # self.currentLabels = Counter()
        self.helper(myTree)
        return self.countForNodeAtIndex
    
    def helper(self, root):
        countDict = Counter()
        countDict[self.labels[root.value]] += 1
        for neigh in root.neighbours:
            childCount = self.helper(neigh)
            for key in childCount:
                countDict[key] += childCount[key]
        self.countForNodeAtIndex[root.value] = countDict[self.labels[root.value]]
        return countDict

    def makeTreeFromEdges(self, edges: List[List[int]]):
        nodeDict = {}
        for edge in edges:
            sender = min(edge)
            receiver = max(edge)
            if not sender in nodeDict and receiver in nodeDict:
                temp = sender
                sender = receiver
                receiver = temp
            if receiver not in nodeDict:  nodeDict[receiver] = TreeNode(receiver)
            if sender not in nodeDict:  nodeDict[sender] = TreeNode(sender)
            nodeDict[sender].neighbours.append(nodeDict[receiver])
        return nodeDict[0]

def main():
    sol = Solution()
    n = 25
    edges = [[4,0],[5,4],[12,5],[3,12],[18,3],[10,18],[8,5],[16,8],[14,16],[13,16],[9,13],[22,9],[2,5],[6,2],[1,6],[11,1],[15,11],[20,11],[7,20],[19,1],[17,19],[23,19],[24,2],[21,24]]
    labels = "hcheiavadwjctaortvpsflssg"
    countList = sol.countSubTrees(n, edges, labels)
    print(countList)
    assert countList == [2,2,1,1,1,3,2,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1]
    n = 7
    edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]]
    labels = "abaedcd"
    countList = sol.countSubTrees(n, edges, labels)
    print(countList)
    assert countList == [2,1,1,1,1,1,1]
    n = 4
    edges = [[0,1],[1,2],[0,3]]
    labels = "bbbb"
    countList = sol.countSubTrees(n, edges, labels)
    print(countList)
    assert countList == [4,2,1,1]

main()

'''
Data range/assumptions:
number of nodes n: [1, 10^5]
edges = n - 1
labels length = n
labels are lowercase letters
'''

'''
Tests:
One node
10^5 nodes
Deep tree
Shallow tree
'''

'''
Ideas:

Naive:
    Construct tree from nodes
    Recursively do each subtree looking for both self and parent labels

Better way to deal with parent labels and sending up count dict
    Only need to send up relevant ones
    And copying labels is likely inefficient
        Since depth first traversal, can likely solve with merely popping label off a global stack
'''