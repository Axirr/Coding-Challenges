import sys
import math

testCaseNum: int = int(sys.stdin.readline())
line: str
for _ in range(testCaseNum):
    line = sys.stdin.readline()
    length: int = len(line)
    dimension: int = int(math.sqrt(len(line)))
    count: int = 0
    result: list = []
    for count in range(dimension - 1,-1,-1):
        while count < length:
            result.append(line[count])
            count += dimension
    print("".join(result))
