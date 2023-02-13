from math import sqrt
import sys

file0 = sys.stdin
dimensions = file0.readline()
dimensions = dimensions.split()
matchesNum = int(dimensions[0])
dim1 = int(dimensions[1])
dim2 = int(dimensions[2])
hypotenuse = sqrt(dim1*dim1 + dim2*dim2)
for _ in range(matchesNum):
    line = int(file0.readline())
    if line <= hypotenuse:
        print("DA")
    else:
        print("NE")
