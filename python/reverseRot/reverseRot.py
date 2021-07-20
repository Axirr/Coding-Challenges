import sys

for line in sys.stdin.readlines():
    splitList = line.split(" ")
    splitList[0] = splitList[0].strip()
    if splitList[0] == "0":
        break
    result: str = ""
    splitList[1] = splitList[1].strip()
    for letter in splitList[1]:
        numCode: int = -1
        if letter == "_":
           numCode = 26
        elif letter == ".":
            numCode = 27
        else:
            numCode = ord(letter) - 65
        rotValue = int(splitList[0])
        numCode = (numCode + rotValue) % 28
        if (numCode == 26):
            result = result + "_"
        elif (numCode == 27):
            result = result + "."
        else:
            result = result + chr(numCode + 65)
    print(result[::-1])
