import sys

verbose = False

def makeCountDict(intList):
    countDict = {}
    for num in intList:
        if num in countDict.keys():
            countDict[num] += 1
        else:
            countDict[num] = 1
    return countDict

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
    isNum = False
    intList.sort()
    stopIndex = -1
    for i in range(len(intList)):
        if (intList[i] > 7776):
            stopIndex = i
            break
    if (not stopIndex == -1):
        intList = intList[:stopIndex]
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