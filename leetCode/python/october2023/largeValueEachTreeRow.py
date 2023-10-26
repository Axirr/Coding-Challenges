from typing import List, Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def largestValues(self, root: Optional[TreeNode]) -> List[int]:
        if root == None:
            return []
        frontier: List[TreeNode] = [root]
        nextFrontier: List[TreeNode] = []
        result: List[int] = []
        while True:
            if len(frontier) == 0:
                break
            levelMax: int = frontier[0].val
            while len(frontier) > 0:
                currentNode: TreeNode = frontier.pop()
                if currentNode.val > levelMax:  levelMax = currentNode.val
                if currentNode.left != None:  nextFrontier.append(currentNode.left)
                if currentNode.right != None:  nextFrontier.append(currentNode.right)
            result.append(levelMax)
            frontier = nextFrontier
            nextFrontier = []
        return result

def mainLargestValues():
    root: Optional(TreeNode)
    sln: Solution = Solution()
    result: List[int]

    root = TreeNode(7, TreeNode(-2), TreeNode(0))
    result = sln.largestValues(root)
    print('final result %s' % result)



if __name__ == "__main__":
    mainLargestValues()

"""
Data range/assumptions:
tree size n: [0, 10^4]
values: [-2^31, 2^31]
"""

"""
Tests:
n = 0
n = max
large values
small values
uniform values
fairly uniform values
large range values
sorted
"""

"""
Ideas:

Naive:
    Breadth first search with a frontier and next frontier
    Get max of frontier and all children of everything in frontier

    Time complexity: O(n)
    Space complexity: O(n)
"""

"""
Completion time (minutes): 15
Question difficulty: Medium
How did it go (1 - 6): 5
    Idea was good, no bugs
"""