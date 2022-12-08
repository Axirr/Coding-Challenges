from typing import Optional
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def leafSimilar(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> bool:
        areSame = True
        leaves1 = deque()
        leftFrontier = deque()
        rightFrontier = deque()
        currentNode = root1
        while True:
            if currentNode.left is None and currentNode.right is None:
                leaves1.append(currentNode.val)
            else:
                if currentNode.left:
                    leftFrontier.append(currentNode.left)
                if currentNode.right:
                    rightFrontier.append(currentNode.right)
            if len(leftFrontier) > 0:
                currentNode = leftFrontier.popleft()
            elif len(rightFrontier) > 0:
                currentNode = rightFrontier.pop()
            else:
                break
        currentNode = root2
        leftFrontier = deque()
        rightFrontier
        while True:
            if currentNode.left is None and currentNode.right is None:
                try:
                    leafValue = leaves1.popleft()
                    if leafValue != currentNode.val:
                        areSame = False
                        break
                # Asking for a leaf that doesn't exist
                except IndexError:
                    areSame = False
                    break
            else:
                if currentNode.left:
                    leftFrontier.append(currentNode.left)
                if currentNode.right:
                    rightFrontier.append(currentNode.right)
            if len(leftFrontier) > 0:
                currentNode = leftFrontier.popleft()
            elif len(rightFrontier) > 0:
                currentNode = rightFrontier.pop()
            else:
                break
        if len(leaves1) > 0:  areSame = False
        return areSame

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
    myRoot = TreeNode(7)
    myRoot2 = TreeNode(7)
    areSame = mySol.leafSimilar(myRoot, myRoot2)
    print(areSame)
    assert areSame
    myNode = TreeNode(5)
    myRoot.left = myNode
    myNode = TreeNode(8)
    myRoot.right = myNode
    myNode = TreeNode(5)
    myRoot2.left = myNode
    myNode = TreeNode(8)
    myRoot2.right = myNode
    areSame = mySol.leafSimilar(myRoot, myRoot2)
    print(areSame)
    assert areSame
    myNode = TreeNode(0)
    myRoot2.left = myNode
    areSame = mySol.leafSimilar(myRoot, myRoot2)
    print(areSame)
    assert not areSame
    myRoot = constructTreeFromList([3,5,1,6,7,4,2,None,None,None,None,None,None,9,8])
    myRoot2 = constructTreeFromList([3,5,1,6,2,9,8,None,None,7,4])
    areSame = mySol.leafSimilar(myRoot, myRoot2)
    print(areSame)
    assert areSame
    myRoot = constructTreeFromList([3,5,1,6,7,4,2,None,None,None,None,None,None,9,11,None,None,8,10])
    myRoot2 = constructTreeFromList([3,5,1,6,2,9,8,None,None,7,4])
    areSame = mySol.leafSimilar(myRoot, myRoot2)
    print(areSame)
    assert not areSame


main()

'''
Data range/assumptions:
Tree node count: [1, 200]
Values magnitude: [0, 200]
'''

'''
Tests:
1 node - 1 node match
Multi-node match
Same values, but not match because of ordering
No match because different number of leaves
'''

'''
Ideas:

Naive:
    Traverse each tree depth first
        If node has no children, leafList.append()
    
    Compare leaf list

    Time complexity: n
'''