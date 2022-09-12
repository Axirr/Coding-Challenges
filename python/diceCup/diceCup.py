import sys

line = (sys.stdin.readline().rstrip('\n')).split(" ")
numFace1 = int(line[0])
numFace2 = int(line[1])

sums = [i + j for i in range(1, numFace1 + 1) for j in range(1, numFace2 + 1)]
maxCount = 0
maxList = []
for num in list(set(sums)):
    countForNum = sums.count(num)
    if (countForNum < maxCount):
        continue
    else:
        if (countForNum > maxCount):
            maxCount = countForNum
            maxList = [num]
        else:
            maxList.append(num)
for num in maxList:
    print(num)