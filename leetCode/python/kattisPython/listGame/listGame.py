import sys

def recursiveFactor(factorList, storedResults):
    candidateList = []
    maxNumber = factorList[-1]
    fullyFactored = []
    # Multiple numbers
    if len(factorList) > 1:
        for number in factorList:
            if number in storedResults:
                #print("Cached result found!")
                toAppend = storedResults[number]
            else:
                toAppend = recursiveFactor([number], storedResults)
                storedResults[number] = toAppend
            fullyFactored = fullyFactored + toAppend
            #print(fullyFactored)
        return fullyFactored
    # Single number, maybe not prime
    else:
        for i in range(2, (maxNumber//2 + 1)):
            if (maxNumber % i) == 0:
                factorPair = maxNumber // i
                #print(i)
                #print(factorPair)
                fullyFactored = recursiveFactor([i, factorPair], storedResults)
                #print("returning")
                return fullyFactored
    # Single number, prime
    return factorList

def wrappingFunction():
    target = [int(sys.stdin.readline().rstrip("\n"))]
    cachedResults = {}
    result = recursiveFactor(target, cachedResults)
    return result

#print(result)
#print("Points: ", end='')
tempDict = dict()
#for i in range(1000000000):
#    #print(i)
#    #print(len(recursiveFactor([i], tempDict)))
#    recursiveFactor([i], tempDict)
print(len(recursiveFactor([65536],tempDict)))
print(len(recursiveFactor([127381],tempDict)))
#print(len(wrappingFunction()))
