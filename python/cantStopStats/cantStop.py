from random import randrange
'''
Algorithm:
For each different triplet of 3 numbers [2,12]
Roll dice, make all possible pairs
Record average roll numbers until disqualified, for some sample size

Expected value = value * probability
    Value varies for each triplet?
        1 if survive
        0 if die
'''
def main():
    triplets = []
    for i in range(2, 13):
        for j in range(i, 13):
            if (not i == j):
                for k in range(j, 13):
                    if (not (i == k or j == k)):
                        triplets.append([i,j,k])

    # print(triplets)

    randomSampleRankings(triplets)

    # probabilityDistributionRankings(triplets)


def randomSampleRankings(triplets):
    sampleNumber = 100000
    results = {}
    for triplet in triplets:
        for i in range(sampleNumber):
            survivedRolls = 0
            while (True):
                isDead = True
                pairs = rollPairs()
                for num in pairs:
                    if (num in triplet):
                        isDead = False
                        break
                if (isDead):
                    break
                survivedRolls += 1
            stringList = [str(num) for num in triplet]
            stringKey = ''.join(stringList)
            if (not stringKey in results.keys()):
                results[stringKey] = []
            results[stringKey].append(survivedRolls)
    for key in results.keys():
        # results[key] = sum(results[key]) / len(results[key])
        results[key] = round(sum(results[key]) / len(results[key]), 1)
    sortedResults = [value for value in results.values()]
    sortedResults = list(set(sortedResults))
    sortedResults.sort()
    for value in sortedResults:
        keyList = []
        for key in results.keys():
            # if (abs(results[key] - value) < 0.01):
            if results[key] == value:
                keyList.append(key)
        keyList.sort()
        print(keyList, value)

def probabilityDistributionRankings(triplets):
    probabilityDict = {}
    rolls = 10000000
    for i in range(rolls):
        diceRolls = []
        for i in range(4):
            diceRolls.append(randrange(1,7))
        diceRolls.sort()
        diceRolls = [str(num) for num in diceRolls]
        diceRolls = ' '.join(diceRolls)
        if (not diceRolls in probabilityDict.keys()):
            probabilityDict[diceRolls] = 0
        probabilityDict[diceRolls] += 1
    for key in probabilityDict.keys():
        probabilityDict[key] = probabilityDict[key] / rolls
    secondResults = {}
    for triplet in triplets:
        for key in probabilityDict.keys():
            intDiceNumbers = [int(num) for num in key.split(" ")]
            rolls = []
            rolls.append(intDiceNumbers[0] + intDiceNumbers[1])
            rolls.append(intDiceNumbers[2] + intDiceNumbers[3])
            rolls.append(intDiceNumbers[0] + intDiceNumbers[2])
            rolls.append(intDiceNumbers[1] + intDiceNumbers[3])
            rolls.append(intDiceNumbers[0] + intDiceNumbers[3])
            rolls.append(intDiceNumbers[1] + intDiceNumbers[2])
            for num in rolls:
                if num in triplet:
                    stringKey = ''.join([str(tempNum) for tempNum in triplet])
                    if (not stringKey in secondResults.keys()):
                        secondResults[stringKey] = 0
                    secondResults[stringKey] += probabilityDict[key]
                    break
    secondSortedResults = [value for value in secondResults.values()]
    secondSortedResults.sort()
    for value in secondSortedResults:
        for key in secondResults.keys():
            if secondResults[key] == value:
                print("%s      %.4f" % (key, value * 10))
                break

def rollPairs():
    diceRolls = []
    for i in range(4):
        diceRolls.append(randrange(1,7))
    summedDice = []
    # print(diceRolls)
    summedDice.append(diceRolls[0] + diceRolls[1])
    summedDice.append(diceRolls[2] + diceRolls[3])
    summedDice.append(diceRolls[0] + diceRolls[2])
    summedDice.append(diceRolls[1] + diceRolls[3])
    summedDice.append(diceRolls[0] + diceRolls[3])
    summedDice.append(diceRolls[1] + diceRolls[2])
    # for i in range(len(diceRolls)):
    #     for j in range(i, len(diceRolls)):
    #         summedDice.append(diceRolls[i] + diceRolls[j])
    summedDice = list(set(summedDice))
    # print(summedDice)
    return summedDice

main()