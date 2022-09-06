import sys
from functools import wraps
from time import time

'''
Time complexity of functionCode1
    Linear search and prune: O(n)
    New Length  k
    Sort: k*log(k)
    Total: n + k*log(k)     k <= n
    Reduced:    n           where n > k*log(k)
                k*log(k)    where n < k*log(k)
'''

verbose = False

def makeCountDict(intList):
    countDict = {}
    for num in intList:
        if num in countDict.keys():
            countDict[num] += 1
        else:
            countDict[num] = 1
    return countDict

def timing(f):
    @wraps(f)
    def wrap(*args, **kw):
        ts = time()
        result = f(*args, **kw)
        te = time()
        if (verbose):
            print('func:%r took: %2.4f sec' % \
            (f.__name__, te-ts))
        return result
    return wrap

@timing
def functionCode1(intList):
    isNum = False
    intList = [num for num in intList if num < 7777]
    intList.sort()
    if (verbose):
        print("Shortened intList", end='')
        print(intList)
    for i in range(len(intList) - 1):
        firstNum = intList[i]
        for j in range(i+1, len(intList)):
            numSum = firstNum + intList[j]
            if (numSum == 7777):
                isNum = True
                break
            elif (numSum > 7777):
                break
        if (isNum): break
    if (isNum):
        print("Yes")
    else:
        print("No")



inputList = sys.stdin.readline().rstrip('\n').split(" ")
listLength = int(inputList[0])
actionCode = int(inputList[1])
if (verbose):
    print(listLength)
    print(actionCode)
intList = sys.stdin.readline().rstrip('\n').split(" ")
intList = [int(num) for num in intList]
if (verbose):
    print(intList)
if (actionCode == 1):
    functionCode1(intList)
elif (actionCode == 2):
    isUnique = True
    countDict = makeCountDict(intList)
    for key in countDict.keys():
        if (countDict[key] > 1):
            isUnique = False
            break
    if (isUnique):
        print("Unique")
    else:
        print("Contains duplicate")
elif (actionCode == 3):
    boundaryValue = listLength/2
    isNumber = False
    number = 0
    countDict = makeCountDict(intList)
    for key in countDict.keys():
        if (countDict[key] > boundaryValue):
            number = key
            isNumber = True
            break
    if (isNumber):
        print(number)
    else:
        print("-1")
elif (actionCode == 4):
    intList.sort()
    medianIndex = (listLength // 2)
    if (listLength % 2 == 0):
        print("%i %i" % (intList[medianIndex - 1], intList[medianIndex]))
    else:
        print(intList[medianIndex])
elif (actionCode == 5):
    resultList = [num for num in intList if (num >= 100 and num <= 999)]
    resultList.sort()
    for i in range(len(resultList)):
        if (i < (len(resultList) - 1)):
            print(resultList[i], end=' ')
        else:
            print(resultList[i])