from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        if p is None and q is None:
            return True
        if p is None or q is None:
            return False
        pStack = [p]
        qStack = [q]
        while pStack and qStack:
            pCurrent = pStack.pop()
            qCurrent = qStack.pop()
            if pCurrent and qCurrent:
                if pCurrent.val != qCurrent.val:
                    return False
                pStack.append(pCurrent.right)
                pStack.append(pCurrent.left)
                qStack.append(qCurrent.right)
                qStack.append(qCurrent.left)
            elif not pCurrent is None or not qCurrent is None:
                    return False
        return True

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
    p = [1,2,3]
    q = [1,2,3]
    pTree = sol.treeFromList(p)
    qTree = sol.treeFromList(q)
    areSame = sol.isSameTree(pTree, qTree)
    print(areSame)
    assert areSame
    p = [1,2]
    q = [1,None,2]
    pTree = sol.treeFromList(p)
    qTree = sol.treeFromList(q)
    areSame = sol.isSameTree(pTree, qTree)
    print(areSame)
    # assert not areSame

main()

'''
Data ranges/assumptions:
number of nodes n: [0, 100]
node values: [-10^4, 10^4]
'''

'''
Tests:
Empty tree
n = 1
n = 100
Small values
Large values
Heavily branched
Lightly branched
Trees same up to point but one is longer
'''

'''
Ideas:

Naive:
    Simulataneous traversal, asserting values the same at each point
'''