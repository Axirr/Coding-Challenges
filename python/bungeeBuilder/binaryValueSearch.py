from functools import wraps
from time import time
import random

timingVerbose = True
verbose = False

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

def main():
    dataList = createData(5, 100000, 6)
    # for data in dataList:
    #     print(data)
    countForwardDuplicates(dataList)
    collectiveTreeCountDuplicates(dataList)
    # dataList = [[8,0,1,4,5,2]]
    # value = 1
    # normalEarliestMaxSearch(dataList, value)
    # for data in dataList:
    #     myNode = treeForList(data, 0, "max")
    #     # collectiveTreeEarliestInstance(dataList, value)
    #     treeWrapper(1, myNode, "max")
    # binaryNode = treeForList(myList, 0, "max")
    # # binaryNode.singlePrint()
    # binaryNode.fullPrintTree()

@timing
def collectiveTreeCountDuplicates(dataList):
    for myList in dataList:
        maxTree = treeForList(myList, 0, "max")
        placeholderFunction(myList, maxTree)

def countValueInMaxTree(treeNode, value):
    if (treeNode.value < value):
        return 0
    result = 0
    if (treeNode.minIndex == treeNode.maxIndex):
        if (treeNode.value == value):
            return 1
    else:
        if (treeNode.left != None):
            result += countValueInMaxTree(treeNode.left, value)
        if (treeNode.right != None):
            result += countValueInMaxTree(treeNode.right, value)
    return result

@timing
def countForwardDuplicates(dataList):
    for myList in dataList:
        totalDuplicateCount = 0
        for i in range(len(myList)):
            singleDuplicateCount = 0
            # duplicateCount += myList.count(myList[i])
            for j in range(len(myList)):
                if (myList[i] == myList[j]):
                    singleDuplicateCount += 1
            totalDuplicateCount += singleDuplicateCount
        print("Rolling count %i" % totalDuplicateCount)

@timing
def placeholderFunction(myList, maxTree):
    duplicateCount = 0
    for i in range(len(myList)):
        value = myList[i]
        duplicateCount += countValueInMaxTree(maxTree, value)
    print("Rolling count %i" % duplicateCount)

def treeEarliestInstance(maxValue, binaryNode, type):
    result = None
    if (binaryNode.value < maxValue):
        return result
    else:
        # binaryNode.singlePrint()
        if (binaryNode.minIndex == binaryNode.maxIndex and binaryNode.value == maxValue):
            result = binaryNode.minIndex
        else:
            # halfIndex = (binaryNode.maxIndex - binaryNode.minIndex) // 2
            if (binaryNode.left != None and binaryNode.left.value >= maxValue):
                # leftResult = treeEarliestInstance(daytumList[binaryNode.minIndex:binaryNode.minIndex + halfIndex], maxValue, binaryNode.left, type)
                return treeEarliestInstance(maxValue, binaryNode.left, type)
            else:
                if (binaryNode.right != None and binaryNode.right.value >= maxValue):
                    return treeEarliestInstance(maxValue, binaryNode.right, type)
            # if (binaryNode.right != None):
            #     # rightResult = treeEarliestInstance(daytumList[binaryNode.minIndex + halfIndex:], maxValue, binaryNode.right, type)
            #     rightResult = treeEarliestInstance(maxValue, binaryNode.right, type)
            # if (leftResult == None): result = rightResult
            # elif (rightResult == None): result = leftResult
            # else: result = min(leftResult, rightResult)
    return result

def createData(numData, dataLength, dataRange):
    result = []
    for i in range(numData):
        partialResult = []
        for j in range(dataLength):
            partialResult.append(random.randrange(0, dataRange))
        result.append(partialResult)

    return result

@timing
def collectiveTreeEarliestInstance(dataList, maxValue, binaryNode):
    for myList in dataList:
        print(treeEarliestInstance(maxValue, binaryNode, "max"))

# def treeEarliestInstance(daytumList, maxValue, binaryNode, type):
@timing
def treeWrapper(value, binaryNode, type):
    treeEarliestInstance(value, binaryNode, type)

def treeEarliestInstance(maxValue, binaryNode, type):
    result = None
    if (binaryNode.value < maxValue):
        return result
    else:
        # binaryNode.singlePrint()
        if (binaryNode.minIndex == binaryNode.maxIndex and binaryNode.value == maxValue):
            result = binaryNode.minIndex
        else:
            # halfIndex = (binaryNode.maxIndex - binaryNode.minIndex) // 2
            if (binaryNode.left != None and binaryNode.left.value >= maxValue):
                # leftResult = treeEarliestInstance(daytumList[binaryNode.minIndex:binaryNode.minIndex + halfIndex], maxValue, binaryNode.left, type)
                return treeEarliestInstance(maxValue, binaryNode.left, type)
            else:
                if (binaryNode.right != None and binaryNode.right.value >= maxValue):
                    return treeEarliestInstance(maxValue, binaryNode.right, type)
            # if (binaryNode.right != None):
            #     # rightResult = treeEarliestInstance(daytumList[binaryNode.minIndex + halfIndex:], maxValue, binaryNode.right, type)
            #     rightResult = treeEarliestInstance(maxValue, binaryNode.right, type)
            # if (leftResult == None): result = rightResult
            # elif (rightResult == None): result = leftResult
            # else: result = min(leftResult, rightResult)
    return result




@timing
def normalEarliestMaxSearch(dataList, value):
    for myList in dataList:
        for i in range(len(myList)):
            if (myList[i] == value):
                print(i)
                break


def treeForList(myList, startIndex, type):
    listLength = len(myList)
    if (type == "max"):
        myNode = binaryNode(None, None, startIndex, startIndex + listLength - 1, max(myList), startIndex)
    elif (type == "min"):
        myNode = binaryNode(None, None, startIndex, startIndex + listLength - 1, max(myList), startIndex)
    else:
        print("ERROR, UNRECGONIZED TYPE FOR TREE")
    if (listLength > 1):
        halfLength = listLength // 2
        myNode.left = treeForList(myList[0:halfLength], startIndex, type)
        myNode.right = treeForList(myList[halfLength:], startIndex + halfLength, type)
    return myNode

main()