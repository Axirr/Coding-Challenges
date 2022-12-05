from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
    
    def recursivePrint(self, level = 0):
        print("\t" * level, end='')
        print(self.val)
        if (self.left):
            self.left.recursivePrint(level + 1)
        if (self.right):
            self.right.recursivePrint(level + 1)

class Solution:
    def pseudoPalindromicPaths (self, root: Optional[TreeNode]) -> int:
        badNumbers = ""
        # countDict = {}
        # for num in range(1, 9 + 1):
        #     countDict[num] = True
        return self.countPseudoPalindrome(root, badNumbers, True)

    def countPseudoPalindrome(self, root: Optional[TreeNode], badNumbers, isOdd):
        myValue = str(root.val)
        doAdd = True
        for i, value in enumerate(badNumbers):
            if (value == myValue):
                badNumbers = badNumbers[:i] + badNumbers[i+1:]
                doAdd = False
                break
        if (doAdd):
            badNumbers += myValue
        count = 0

        # Bottom of a path, check if palindrome possible
        if (not root.left and not root.right):
            if (isOdd):
                falseCount = 1
            else:   falseCount = 0
            if (len(badNumbers) <= falseCount):
                count += 1
            # for key in countDict.keys():
            #     if (countDict[key] == False):
            #         falseCount -= 1
            #         if (falseCount < 0):
            #             return count
        # Not bottom of a path
        else:
            if (root.left):
                count += self.countPseudoPalindrome(root.left, badNumbers, not isOdd)
            if (root.right):
                count += self.countPseudoPalindrome(root.right, badNumbers, not isOdd)
        return count
        '''
        Naive: construct list for each path using depth first method
        Permutate to see if list can be made a palindrome

        Better:
        Palindrome with even length must have all even counts
        Palindrome with odd length can have one odd number, all other counts must be even
        Count: just record bool for each entry
        '''

def main():
    mySolution = Solution()
    myTree = constructTreeFromList([2,3,1,3,1,None,1])
    print(mySolution.pseudoPalindromicPaths(myTree))
    myTree = constructTreeFromList([2,1,1,1,3,None,None,None,None,None,1])
    print(mySolution.pseudoPalindromicPaths(myTree))
    myTree = constructTreeFromList([9])
    print(mySolution.pseudoPalindromicPaths(myTree))

def constructTreeFromList(nodeList):
    lengthNodeList = len(nodeList)
    runningCount = 1
    myTree = TreeNode(nodeList[0])
    nodeFrontier = [myTree]
    while (runningCount < lengthNodeList):
        currentNode = nodeFrontier.pop(0)
        newValue = nodeList[runningCount]
        if (newValue):
            newNode = TreeNode(newValue)
            currentNode.left = newNode
            nodeFrontier.append(newNode)
        runningCount += 1
        newValue = nodeList[runningCount]
        if (newValue):
            newNode = TreeNode(newValue)
            currentNode.right = newNode
            nodeFrontier.append(newNode)
        runningCount += 1
    return myTree



main()