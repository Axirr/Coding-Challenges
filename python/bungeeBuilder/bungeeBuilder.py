import sys

'''
Algorithm:
Construct list of mountain pairs
    Keep list of lowest point in between until break
    Break on starting mountain as soon as interfering mountain found
For range between mountain pairs, find max height
'''

verbose = False

numMountains = int(sys.stdin.readline().rstrip("\n"))
if (verbose):
    print("Number of mountains is %i" % numMountains)
mountainList = sys.stdin.readline().rstrip("\n").split(" ")
mountainList = [int(mount) for mount in mountainList]
if (verbose):
    print("Mountain list: ")
    print(mountainList)
maxHeight = 0
for i in range(len(mountainList)):
    firstMountain = mountainList[i]
    lowestPoint = firstMountain
    bridgeHeight = firstMountain
    hightestPointBetween = 0
    for j in range(i + 1, len(mountainList)):
        secondMountain = mountainList[j]
        lowestPoint = min(lowestPoint, secondMountain)
        if (j - i <= 1):
            continue
        if (firstMountain > hightestPointBetween and secondMountain > hightestPointBetween):
            bridgeHeight = min(firstMountain, secondMountain)
            maxBungeeLength = bridgeHeight - lowestPoint
            if (maxBungeeLength > maxHeight):
                if (verbose):
                    print("New max found.")
                    print("Mountain %i (height %i) to Mountain %i (height % i)" % (i, mountainList[i], j, mountainList[j]))
                    print("Bridge height is %i" % bridgeHeight)
                maxHeight = maxBungeeLength
        hightestPointBetween = max(hightestPointBetween, secondMountain)
        if (secondMountain >= firstMountain):
            break
print("%i" % maxHeight)

'''
Test cases:
DONE No bridge possible
DONE First value superseded by later value
DONE single mountain
'''