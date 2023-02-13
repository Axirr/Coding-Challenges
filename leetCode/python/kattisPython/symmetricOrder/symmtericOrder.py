import sys

def main():
    numberWords = int(sys.stdin.readline().rstrip('\n'))
    setNumber = 1
    while (numberWords > 0):
        print("SET %d" % setNumber)
        words = []
        for i in range(numberWords):
            words.append(sys.stdin.readline().rstrip('\n'))
        # print(words)
        wordList = []
        backWordList = []
        for i in range((numberWords // 2)):
            wordList.append(words[i * 2])
            backWordList.insert(0, words[i * 2 + 1])
        if (numberWords % 2 != 0):
            wordList.append(words[numberWords // 2 * 2])
        wordList = wordList + backWordList
        # print(wordList)
        for word in wordList:
            print(word)
        numberWords = int(sys.stdin.readline().rstrip('\n'))
        setNumber += 1


main()