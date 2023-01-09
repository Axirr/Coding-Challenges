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
        resultList = []
        currentNode = root
        rightNodeStack = []
        while True:
            resultList.append(currentNode.val)
            if currentNode.right:
                rightNodeStack.append(currentNode.right)
            if currentNode.left:
                currentNode = currentNode.left
            elif rightNodeStack:
                currentNode = rightNodeStack.pop()
            else:
                # No left node, and no remaining right nodes in stack
                break
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
'''