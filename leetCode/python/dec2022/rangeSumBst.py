from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def rangeSumBST(self, root: Optional[TreeNode], low: int, high: int) -> int:
        nodeFrontier = [root]
        sum = 0
        while len(nodeFrontier) > 0:
            currentNode = nodeFrontier.pop()
            value = currentNode.val
            if value >= low and value <= high:
                sum += value
            if currentNode.left:
                nodeFrontier.append(currentNode.left)
            if currentNode.right:
                nodeFrontier.append(currentNode.right)
        return sum

def main():
    mySol = Solution()
    myRoot = TreeNode(7)
    resultSum = mySol.rangeSumBST(myRoot, 6, 8)
    print(resultSum)
    assert resultSum == 7
    resultSum = mySol.rangeSumBST(myRoot, 8, 9)
    print(resultSum)
    assert resultSum == 0

main()

'''
Data range/assumptions:
Tree size: [1, large]
Value size: [1, large]
'''

'''
Tests
Single node
Large tree
Range covers whole tree
Range covers both left and right of root
'''

'''
Ideas:

Naive:
    queue = [root]
    while len(queue) > 0:
        currentNode = queue.pop()
        If val in range
            sum += val
            If .left
                Add to queue
            If .right
                Add to queue
    return sum
'''