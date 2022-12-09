from typing import Optional
from collections import deque
from copy import copy

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def maxAncestorDiff(self, root: Optional[TreeNode]) -> int:
        return self.recursiveMaxAnc(root, [])
    
    def recursiveMaxAnc(self, root: Optional[TreeNode], ancestors) -> int:
        maxV = 0
        currentVal = root.val
        for node in ancestors:
            v = abs(node.val - currentVal)
            maxV = max(maxV, v)
        
        ancestors.append(root)
        if not root.left is None:
            leftMax = self.recursiveMaxAnc(root.left, ancestors)
            maxV = max(maxV, leftMax)
        if not root.right is None:
            rightMax = self.recursiveMaxAnc(root.right, ancestors)
            maxV = max(maxV, rightMax)
        ancestors.pop()
        return maxV

def constructTreeFromList(valueList):
    head = TreeNode(valueList[0])
    frontier = deque()
    count = 0
    currentNode = head
    for i in range(1, len(valueList)):
        value = valueList[i]
        if not value is None:
            newNode = TreeNode(value)
            frontier.append(newNode)
            if count == 0:
                currentNode.left = newNode
            elif count == 1:
                currentNode.right = newNode
        count += 1
        if count == 2:
            currentNode = frontier.popleft()
            count = 0
    return head

def main():
    mySol = Solution()
    root = constructTreeFromList([8,3,10,1,6,None,14,None,None,4,7,13])
    maxV = mySol.maxAncestorDiff(root)
    print(maxV)
    assert maxV == 7
    root = constructTreeFromList([1,None,2,None,0,3])
    maxV = mySol.maxAncestorDiff(root)
    print(maxV)
    assert maxV == 3

main()

'''
Data range/assumptions:
Num of nodes: [2, 5000]
Values: [0, large]
'''

'''
Tests:
2 nodes
5000 nodes
Alternating left right to get to max difference node
Non-leaf node as max difference
Leaf node as max difference
Unbalanced tree
Non-root as ancestor
Very unbalance tree with large height
'''

'''
Ideas:

Naive:
    Traverse tree depth first with a node stack
    At each level
        For each ancestor in stack, calc v
        Update maxV and maxNode if max
    
    Time complexity:
        Update check is sum(0:h)
        Traversal: n
'''