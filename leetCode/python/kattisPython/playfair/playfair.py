import sys

isVerbose = False

def prettyPrintCipher(cipherTable):
    count = 0
    for letter in cipherTable:
        if (count == 5):
            print("")
            count = 0
        print(letter, end='')
        count += 1
    print('')

def prettyPrintCleanedMessage(cleanedMessage):
    for i in range(len(cleanedMessage)):
        print(cleanedMessage[i], end='')
        if (i % 2) == 1:
            print(' ', end='')
    print('')

def rowForIndex(index):
    return index // 5

def colForIndex(index):
    return index % 5

def newIndexSameCol(index):
    index = (index + 5)
    if (index > 24):
        index = index % 25
    return index

def newIndexSameRow(index):
    index = index + 1
    if (index % 5 == 0):
        index = index - 5
    return index



keyPhrase = sys.stdin.readline().rstrip("\n")
keyPhrase = [letter for letter in keyPhrase if (letter != "q" and letter != " ")]
keyPhrase = keyPhrase + list("abcdefghijklmnoprstuvwxyz")
cipherTable = []
for letter in keyPhrase:
    if (not letter in cipherTable):
        cipherTable.append(letter)
if (isVerbose):
    prettyPrintCipher(cipherTable)
message = sys.stdin.readline().rstrip("\n")
cleanedMessage = ""
isSecond = False
for letter in message:
    if (letter == ' ' or letter == 'q'):
        continue
    if (isSecond):
        if (len(cleanedMessage) > 0):
            if (cleanedMessage[-1] == letter):
                cleanedMessage = cleanedMessage + 'x'
                isSecond = False    # want it to be True, but will be reversed below
    isSecond = not isSecond
    cleanedMessage = cleanedMessage + letter
if (isSecond):
    cleanedMessage = cleanedMessage + 'x'
if (isVerbose):
    prettyPrintCleanedMessage(cleanedMessage)
i = 0
encryptedMessage = ""
while(i < (len(cleanedMessage) - 1)):
    firstLetter = cleanedMessage[i]
    secondLetter = cleanedMessage[i + 1]
    indexFirstLetter = cipherTable.index(firstLetter)
    indexSecondLetter = cipherTable.index(secondLetter)
    firstRow = rowForIndex(indexFirstLetter)
    secondRow = rowForIndex(indexSecondLetter)
    firstCol = colForIndex(indexFirstLetter)
    secondCol = colForIndex(indexSecondLetter)
    if (firstCol == secondCol):
        encryptedMessage += cipherTable[newIndexSameCol(indexFirstLetter)]
        encryptedMessage += cipherTable[newIndexSameCol(indexSecondLetter)]
    elif (firstRow == secondRow):
        encryptedMessage += cipherTable[newIndexSameRow(indexFirstLetter)]
        encryptedMessage += cipherTable[newIndexSameRow(indexSecondLetter)]
    else:
        encryptedMessage += cipherTable[firstRow * 5 + secondCol]
        encryptedMessage += cipherTable[secondRow * 5 + firstCol]

    i += 2
encryptedMessage =  encryptedMessage.upper()
if (isVerbose):
    prettyPrintCleanedMessage(encryptedMessage)
print(encryptedMessage)