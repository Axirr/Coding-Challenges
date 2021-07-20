import sys

def readAndSplit():
    return list(map(int,sys.stdin.readline().rstrip("\n").split(" ")))

def halfCrossProduct(firstVertex, secondVertex):
    return 0.5 * (firstVertex[0]*secondVertex[1] - firstVertex[1]*secondVertex[0])

while True:
    line = sys.stdin.readline().rstrip("\n")
    if line == "0":
        break
    startVertex = readAndSplit()
    firstVertex = startVertex
    total = 0
    for _ in range(int(line)-1):
        secondVertex = readAndSplit()
        total += halfCrossProduct(firstVertex, secondVertex)
        firstVertex = secondVertex
    total += halfCrossProduct(firstVertex, startVertex)
    if total < 0:
        print("CW ",end="")
    else:
        print("CCW ", end="")
    print(abs(total))
