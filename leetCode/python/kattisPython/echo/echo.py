import sys

isOdd = True
sys.stdin.readline()
for line in sys.stdin:
    if isOdd:
        print(line, end='')
    isOdd = not isOdd