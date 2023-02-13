import sys
from functools import wraps
from time import time

'''
Algorithm:
Construct list of mountain pairs
    Keep list of lowest point in between until break
    Break on starting mountain as soon as interfering mountain found
For range between mountain pairs, find max height
IDEAS FOR SPEEDUP
    Binary tree of mins and maxes
    Requirements:
        Need a max >= firstMountain
        Need a min such that firstMountain - min > maxHeight
    Construction of binary tree should be O(n)?
    Binary tree lookup (for a balanced tree) is log(n)
        For both max and min
        Although this isn't lookup, as much as building valid ranges
        If (minValid)
            if len > 1:
                min
    Find bridge max end point using maxTree
        findEarliestMax(mountainList[firstIndex + 1:], firstMountain)
        Worst case: log(n) instead of n
    Find lowest point in bridgeIndex, lastBridgeIndex
        findLowestPoint(firstIndex, lastIndex)
        Worst case: log(n) instead of n
    Ensure lowest point has potential (not guarantee) to create a new maxBungee
        firstMountain - lowestPoint > currentMaxHeight
    Normal algorithm for reduced range that has potential
    For potential reduced range, apply normal algorithm?
'''

verbose = False
timingVerbose = True


# def validRange(binaryTree):
#     if (binaryTree.height == 0):
#         result = []
#         if (isCondition(left)):
#             result += left.value
#         if (isCondition(right)):
#             result += right.value
#         return result
#     else:
#         return validRange(binaryTree.left) + validRange(binaryTree.right)


def timing(f):
    @wraps(f)
    def wrap(*args, **kw):
        ts = time()
        result = f(*args, **kw)
        te = time()
        if (timingVerbose):
            print('func:%r took: %2.4f sec' % \
            (f.__name__, te-ts))
        return result
    return wrap

@timing
# def main():
def main():
    numMountains = int(sys.stdin.readline().rstrip("\n"))
    if (verbose):
        print("Number of mountains is %i" % numMountains)
    mountainList = sys.stdin.readline().rstrip("\n").split(" ")
    mountainList = [int(mount) for mount in mountainList]
    if (verbose):
        print("Mountain list: ")
        print(mountainList)
    maxHeight = 0
    minMountainTree = minTreeForList(mountainList, 0)
    maxMountainTree = maxTreeForList(mountainList, 0)
    for i in range(len(mountainList)):
        firstMountain = mountainList[i]
        if (firstMountain <= maxHeight):
            continue
        lowestPoint = firstMountain
        bridgeHeight = firstMountain
        hightestPointBetween = 0
        # if (firstMountain - minimumMountain < maxHeight):
        #     continue
        minValue = abs(maxHeight - firstMountain)
        minTree = minConstructRangeFromTree(minMountainTree, minValue)
        maxTree = maxConstructRangeFromTree(maxMountainTree, firstMountain)
        print("First mountain height is %i" % firstMountain)
        for j in range(len(maxTree)):
        #     # doEvaluate = not (j - i <= 1)
            secondMountain = mountainList[maxTree[j]]
            print("Second mountain height is %i" % secondMountain)
            # if (secondMountain <= hightestPointBetween):
            #     doEvaluate = False
            # lowestPoint = getLowestPointForTree()
            bridgeHeight = min(firstMountain, secondMountain)
            lowestPoint = getLowestPointForTree(minMountainTree, i, maxTree[j])
            maxBungeeLength = bridgeHeight - lowestPoint
            if (maxBungeeLength > maxHeight):
                if (not (maxTree[j] - i <= 1)):
                    # if (verbose):
                    #     print("New max found.")
                    #     print("Mountain %i (height %i) to Mountain %i (height % i)" % (i, mountainList[i], j, mountainList[j]))
                    #     print("Bridge height is %i" % bridgeHeight)
                    #     print("Highest point between is %i" % hightestPointBetween)
                    maxHeight = maxBungeeLength
            # lowestPoint = min(lowestPoint, secondMountain)
            # hightestPointBetween = max(hightestPointBetween, secondMountain)
            if (secondMountain >= firstMountain):
                break
    print("%i" % maxHeight)

def getLowestPointForTree(myNode, startIndex, endIndex):
    result = -1
    middleIndex = (startIndex + endIndex) // 2
    if (myNode.left == None or myNode.right == None):
        print("ERROR")
        return 1
    if (myNode.minIndex == startIndex and myNode.maxIndex == endIndex):
        result = myNode.value
    else:
        result = min(getLowestPointForTree(myNode.left, startIndex, middleIndex), getLowestPointForTree(myNode.right, middleIndex + 1, endIndex))
    return result
        

class binaryNode:
    def __init__(self, left, right, minIndex, maxIndex, value, startIndex):
        self.left = left
        self.right = right
        self.minIndex = minIndex
        self.maxIndex = maxIndex
        self.value = value
        self.startIndex = startIndex
    
    def singlePrint(self):
        print("Value %i" % self.value)
        print("MinIndex %i" % self.minIndex)
        print("MaxIndex %i" % self.maxIndex)
        if (self.left):
            print("Left exists")
        else:
            print("NO LEFT")
        if (self.right):
            print("Right exists")
        else:
            print("NO RIGHT")
    
    def fullPrintTree(self):
        # self.singlePrint()
        self.shortPrint()
        if (self.left):
            self.left.fullPrintTree()
        if (self.right):
            self.right.fullPrintTree()
    
    def shortPrint(self):
        print("Value %i" % self.value)
        print("MinIndex %i" % self.minIndex)
        print("MaxIndex %i" % self.maxIndex)

def maxTreeForList(myList, startIndex):
    listLength = len(myList)
    myNode = binaryNode(None, None, startIndex, startIndex + listLength - 1, max(myList), startIndex)
    if (listLength > 1):
        halfLength = listLength // 2
        myNode.left = maxTreeForList(myList[0:halfLength], startIndex)
        myNode.right = maxTreeForList(myList[halfLength:], startIndex + halfLength)
    return myNode

def maxConstructRangeFromTree(myNode, maxValue):
    result = []
    if (myNode.value > maxValue):
        if (myNode.minIndex == myNode.maxIndex):
            result.append(myNode.minIndex)
        else:
            result = maxConstructRangeFromTree(myNode.left, maxValue) + maxConstructRangeFromTree(myNode.right, maxValue)
    return result

def minConstructRangeFromTree(myNode, minValue):
    result = []
    if (myNode.value < minValue):
        if (myNode.minIndex == myNode.maxIndex):
            result.append(myNode.minIndex)
        else:
            result = minConstructRangeFromTree(myNode.left, minValue) + minConstructRangeFromTree(myNode.right, minValue)
    return result

def minTreeForList(myList, startIndex):
    listLength = len(myList)
    myNode = binaryNode(None, None, startIndex, startIndex + listLength - 1, min(myList), startIndex)
    if (listLength > 1):
        halfLength = listLength // 2
        myNode.left = minTreeForList(myList[0:halfLength], startIndex)
        myNode.right = minTreeForList(myList[halfLength:], startIndex + halfLength)
    return myNode

def secondMain():
    myList = [4,1,8,4,0,2,5]
    binaryNode = minTreeForList(myList, 0)
    # binaryNode.singlePrint()
    binaryNode.fullPrintTree()
    result = minConstructRangeFromTree(binaryNode, 3)
    print(result)

main()

'''
Test cases:
DONE No bridge possible
DONE First value superseded by later value
DONE single mountain
'''