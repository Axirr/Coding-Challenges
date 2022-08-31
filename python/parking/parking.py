import sys

testCases = int(sys.stdin.readline())
while (testCases > 0):
    numStores = sys.stdin.readline().rstrip("\n")
    storeList = sys.stdin.readline().rstrip("\n").split(" ")
    storeList = [int(s) for s in storeList]
    maxDistance = (max(storeList) - min(storeList)) * 2
    print(maxDistance)

    testCases -= 1