from typing import Optional
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def countNodes(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        count = 1
        count += self.countNodes(root.left)
        count += self.countNodes(root.right)
        return count

def main():
    mySol = Solution()
    myTree = TreeNode(5)
    resultInt = mySol.countNodes(myTree)
    print(resultInt)
    myTree.left = TreeNode(4)
    resultInt = mySol.countNodes(myTree)
    print(resultInt)


main()

'''
Data range/assumptions:
Large n
Include empty
'''

'''
Tests:
Empty
Single node
'''

'''
Ideas:

Naive:
    Recursive count?
    Shouldn't that still be O(n)
'''