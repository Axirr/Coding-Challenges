import sys

def rotationValue(message: str) -> int:
    total: int = 0
    for letter in message:
        total += (ord(letter) - 65)
    return total

def rotateWord(message: str, rotateValue: int) -> str:
    newWord: str = ""
    for letter in message:
        newValue: int = (ord(letter) - 65 + rotateValue) % 26
        newWord = newWord + chr(newValue + 65)
    return newWord

message: str = sys.stdin.readline().strip()
strLength: int = len(message)
firstHalf: str = message[0:strLength // 2]
secondHalf: str = message[strLength//2:]
firstRotValue: int = rotationValue(firstHalf)
secondRotValue: int = rotationValue(secondHalf)
firstHalf = rotateWord(firstHalf, firstRotValue)
secondHalf = rotateWord(secondHalf, secondRotValue)
#print(firstHalf)
#print(secondHalf)
result: str = ""
for i in range(strLength//2):
    result = result + rotateWord(firstHalf[i],ord(secondHalf[i]) - 65)
print(result)
