import re
import string
from collections import Counter
import random
import itertools

MIN_WORD_LENGTH = 4
MAX_WORD_LENGTH = 10

def isValidMultiWordAnagram(word, wordDictionary, startLetterIndex):
    wordLength = MIN_WORD_LENGTH
    while wordLength <= MAX_WORD_LENGTH:
        startIndex = startLetterIndex
        endIndex = startIndex + wordLength

        currentWord = word[startIndex:endIndex]

        currentLetterCount = generateLetterCountString(currentWord)
        if currentLetterCount in wordDictionary:
            if (endIndex != len(word)):
                # print("remaining word %s" % word[endIndex:])
                resultList = isValidMultiWordAnagram(word, wordDictionary, endIndex)
                if len(resultList) > 0:
                    print("match found for %s" % currentWord)
                    return [currentLetterCount] + resultList
            else:
                print("match found for %s" % currentWord)
                return [currentLetterCount]

        startIndex += 1
        endIndex = startIndex + wordLength

        wordLength += 1
    
    return []

def generateFastDict():
    wordFile = open('/usr/share/dict/words', 'r')
    currentLine = wordFile.readline()
    letterCountSet = set()
    letterDictionary = {}

    while currentLine:
        # currentLine = currentLine.rstrip('\n').lower()
        currentLine = currentLine.rstrip('\n')


        if len(currentLine) < MIN_WORD_LENGTH or re.fullmatch('[a-z]+', currentLine) == None:
            currentLine = wordFile.readline()
            continue

        currentLetterCountString = generateLetterCountString(currentLine)
        letterCountSet.add(currentLetterCountString)
        if currentLetterCountString in letterDictionary:
            letterDictionary[currentLetterCountString].append(currentLine)
        else:
            letterDictionary[currentLetterCountString] = [currentLine]

        currentLine = wordFile.readline()

    wordFile.close()
    
    return (letterCountSet, letterDictionary)

def generateLetterCountString(word):
    letterCount = Counter()

    for letter in word:
        letterCount[letter] += 1

    tempList = []
    for letter in string.ascii_lowercase:
        tempList.append(str(letterCount[letter]))
    
    return ''.join(tempList)

def mainIsValidMultiWordAnagram():
    letterCountSet, wordLookupDict = generateFastDict()
    doQuitIfAssertFail = True

    testWord = "heorlllodw"
    letterCodeList = isValidMultiWordAnagram(testWord, letterCountSet, 0)
    print("Final result for %s is" % testWord)
    for countCode in letterCodeList:
        currentWordList = wordLookupDict[countCode]
        print(currentWordList)
        print(currentWordList[random.randrange(0, len(currentWordList))], end="")
        print("     (num word choices is %d)" % len(currentWordList))
    myAssert(len(letterCodeList) > 0, doQuitIfAssertFail)
    return

    testWord = "lacroolad"
    letterCodeList = isValidMultiWordAnagram(testWord, letterCountSet, 0)
    print("Final result for %s is" % testWord)
    for countCode in letterCodeList:
        currentWordList = wordLookupDict[countCode]
        print(currentWordList)
        print(currentWordList[random.randrange(0, len(currentWordList))], end="")
        print("     (num word choices is %d)" % len(currentWordList))
    myAssert(len(letterCodeList) > 0, doQuitIfAssertFail)

    testWord = "ehlolrldow"
    letterCodeList = isValidMultiWordAnagram(testWord, letterCountSet, 0)
    print("Final result for %s is" % testWord)
    for countCode in letterCodeList:
        currentWordList = wordLookupDict[countCode]
        print(currentWordList)
        print(currentWordList[random.randrange(0, len(currentWordList))], end="")
        print("     (num word choices is %d)" % len(currentWordList))
    myAssert(len(letterCodeList) > 0, doQuitIfAssertFail)

    testWord = "helloworld"
    letterCodeList = isValidMultiWordAnagram(testWord, letterCountSet, 0)
    print("Final result for %s is" % testWord)
    for countCode in letterCodeList:
        currentWordList = wordLookupDict[countCode]
        print(currentWordList)
        print(currentWordList[random.randrange(0, len(currentWordList))], end="")
        print("     (num word choices is %d)" % len(currentWordList))
    myAssert(len(letterCodeList) > 0, doQuitIfAssertFail)

    testWord = "sandygator"
    letterCodeList = isValidMultiWordAnagram(testWord, letterCountSet, 0)
    print("Final result for %s is" % testWord)
    for countCode in letterCodeList:
        currentWordList = wordLookupDict[countCode]
        if len(currentWordList) > 1:
            print(currentWordList)
        print(currentWordList[random.randrange(0, len(currentWordList))], end="")
        print("     (num word choices is %d)" % len(currentWordList))
    myAssert(len(letterCodeList) > 0, doQuitIfAssertFail)


def myAssert(myBool, doQuit):
    if not myBool:
        print("ASSERTION FAILED")
        if (doQuit):
            exit()

mainIsValidMultiWordAnagram()

'''
/*
Problem description:
For a string, determine if all letters can be used to make a valid anagram from words in a dictionary
Words greater than minimumLength
Spaces don't count
*/

/*
Data range/assumptions:
*/

/*
Tests:
*/

/*
Ideas:

Naive:
    initial window length = min size
    Check if word is in dictionary
        Dictionary should be reorganized to letter count sets
    If it is, recursive on the remaining part
    If not, traverse at that size
    If still not, increase window length and traverse at that size

Converting normal dictionary to fast searchable one
Normal dict: string[]
Better dict for anagrams
    Sets, since order doesn't matter
    But has to be a count not just presence of a letter
        E.g. helo vs hello
    Map is natural way to do letter count
    But hard to search in constant time
    If keep letter count of words to single digit, could do it by 26 digit string
*/

/*
Completion time (minutes):
Question difficulty:
How did it go (0 - 6):
*/
'''