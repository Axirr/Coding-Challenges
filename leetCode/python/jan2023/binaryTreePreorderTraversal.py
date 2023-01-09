from typing import Optional, List

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
    
    def prettyPrint(self):
        print(self.val)
        if self.left:
            self.left.prettyPrint()
        if self.right:
            self.right.prettyPrint()

class Solution:
    def preorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        if root is None:  return []

        # Morris traversal - add parent to the right of the natural rightmost branch during left tree traversal
        # to allow linking back to parent for right traversal
        current = root
        preOrderValues = []

        while current:
            if not current.left:
                preOrderValues.append(current.val)
                current = current.right
            else:
                # Find rightmost
                last = current.left

                while last.right and last.right != current:
                    last = last.right
                
                # First visit to right most node, so add current value to node and result
                if not last.right:
                    preOrderValues.append(current.val)
                    last.right = current
                    current = current.left
                # Second visit to this right most node, so reset it's right to None and go to right of current
                else:
                    last.right = None
                    current = current.right

        return preOrderValues

    def iterativePreorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        if root is None:  return []
        resultList = []
        stack = [root]
        while stack:
            currentNode = stack.pop()
            if currentNode:
                resultList.append(currentNode.val)
                stack.append(currentNode.right)
                stack.append(currentNode.left)
        return resultList

    def recPreorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        if root is None:  return []
        resultList = [root.val]
        if root.left:
            resultList += self.preorderTraversal(root.left)
        if root.right:
            resultList += self.preorderTraversal(root.right)
        return resultList
    
    def treeFromList(self, myList):
        root = None
        nodes = [TreeNode(myList[0])]
        root = nodes[0]
        for i in range(len(myList)):
            currentRoot = nodes[i]
            if currentRoot is None:
                nodes.append(None)
                nodes.append(None)
                continue
            leftIndex = i // 2 * 2 + 1
            rightIndex = i // 2 * 2 + 2
            if len(myList) > leftIndex and myList[leftIndex] != None:
                currentRoot.left = TreeNode(myList[leftIndex])
                nodes.append(currentRoot.left)
            else:
                nodes.append(None)
            if len(myList) > rightIndex and myList[rightIndex] != None:
                currentRoot.right = TreeNode(myList[rightIndex])
                nodes.append(currentRoot.right)
            else:
                nodes.append(None)
        return root

def main():
    sol = Solution()
    myTree = sol.treeFromList([1,None,2,3])
    myTree.prettyPrint()
    preOrder = sol.preorderTraversal(myTree)
    print(preOrder)
    assert preOrder == [1, 2, 3]

main()

'''
Data range/assumptions:
number of nodes n: [1,100]
node values: [-100, 100]
'''

'''
'''

'''
Ideas:
Recurisve easy, but how to do iteratively
Single stack won't work

Constructing tree from list:
What are the indices of node children relative to node
    Initial:
        0  -> 1, 2
        1 -> 3, 4
        2 -> 5, 6

Morris traversal:
Saves space
General idea
    For each left subtree, traverse to find the right most node
    Make the left of that = current
    So when left = current we know we're done with the left subtree
    Reset left to null
    Return to current and explore right tree

More detailed:
    if not current:  break
    append current.val
    if left
'''