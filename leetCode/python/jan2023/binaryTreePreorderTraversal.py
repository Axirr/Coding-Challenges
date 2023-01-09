from typing import Optional, List

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def preorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        if root is None:  return []
        resultList = [root.val]
        if root.left:
            resultList += self.preorderTraversal(root.left)
        if root.right:
            resultList += self.preorderTraversal(root.right)
        return resultList

def main():
    sol = Solution()

main()

'''
Data range/assumptions:
number of nodes n: [1,100]
node values: [-100, 100]
'''

'''
'''

'''
'''