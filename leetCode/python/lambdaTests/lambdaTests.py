def main():
    originalList = [2, 3, 4]
    target = 6
    myList = sorted(originalList)
    for i in range(len(myList)):
        num = myList[i]
        complementNum = target - num
        searchIndex = binarySearch(myList, complementNum)
        if (searchIndex != -1):
            print([i, searchIndex])
            break
    print(originalList.index(myList[i]), originalList.index(myList[searchIndex]))
    # print(binarySearch(myList, 2))
    # addLambda = lambda x : x + 5
    # numList = [1,2,3]
    # print([addLambda(num) for num in numList])
    # resultMap = map(addLambda, numList)
    # for result in resultMap:
    #     print(result)
    # doubler = baseFunction(3)
    # print(doubler(14))

    
def baseFunction(num):
    return lambda a : a * num

def binarySearch(searchList, value):
    high = len(searchList) - 1
    low = 0
    failReturn = -1
    while (high >= low):
        print("HIGH %d" % high)
        print("LOW %d" % low)
        searchIndex = (high - low) // 2 + low
        print("SEARCH INDEX %d" % searchIndex)
        if (searchList[searchIndex] == value):
            print("FOUND")
            return searchIndex
        elif (searchList[searchIndex] > value):
            print("NOT FOUND, TOO HIGH")
            high = searchIndex - 1
        else:
            print("NOT FOUND, TOO LOW")
            low = searchIndex + 1
    return failReturn

main()