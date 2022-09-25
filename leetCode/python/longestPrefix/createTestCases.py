import sys
'''
Random strings won't be good test cases
    Much less overlap than words
Alternate:
    Use dictionary/word list, randomly choose words that meet the length criteria
If running the same test cases, should not just do performance collectively, but on each test case
    Since performance may suffer on a particular case
    If non-indicative of the general case, may not be as significant
Pick distribution of inputs
    Groupings?
    E.g.
        Long words with lots of prefixes
        Long words with few prefixes
        Many short words
        Words about equal in length
        Words very variable in length
    Union of different features
        length [short, long, variable]
        numberOfWords [few, many]
        prefixes [few, many, variable]
        length X numberOfWords X prefixes = 18 groups
    Test groupings independently
        Probably better than looking at each test individually when unsure of representativeness of the test
        Groupings as a whole less variable
'''

filePath = "/usr/share/dict/words"

file = open(filePath)
words = []
for line in file:
    words.append(line.rstrip("\n"))
testProperties = [["ShortWords", "LongWords", "VariableWords"], ["FewWords", "ManyWords"], ["FewPrefixes", "ManyPrefixes", "VaraiblePrefixes"]]
numTestCases = 5
testCases = []
for prop1 in testProperties[0]:
    for prop2 in testProperties[1]:
        for prop3 in testProperties[2]:
            testCases.append([prop1, prop2, prop3])
for testList in testProperties:
    for i in range(numTestCases):
        filename = ''.join(testList) + str(i) + ".txt"
        writeFile = open(filename, 'w')
        sys.stdout = writeFile
        print("test")
        writeFile.close()

file.close()