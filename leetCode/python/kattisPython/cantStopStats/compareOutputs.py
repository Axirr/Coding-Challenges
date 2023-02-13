import sys

filename1 = "largeSampleOutputCantStop.txt"
filename2 = "largeSampleProbabilityDistribution.txt"

f1 = open(filename1, 'r')
f2 = open(filename2, 'r')

while (True):
    line1 = f1.readline().rstrip('\n')
    line2 = f2.readline().rstrip('\n')
    if (line1 == '' or line2 == ''):
        break
    key1 = line1.split(" ")[0]
    key2 = line2.split(" ")[0]
    # key1 = line1.split(" ")
    # key2 = line2.split(" ")

    if (key1 != key2):
        print(key1)
        print(key2)
        print()