import sys

possibleValues = [1,2,3,4,5,6,7,8,9,10]
while (True):
    guess = sys.stdin.readline().rstrip("\n")
    guess = int(guess)
    if (guess == 0):
        break
    response = sys.stdin.readline().rstrip("\n")
    if (response == "too low"):
        possibleValues = [num for num in possibleValues if num > guess]
    elif (response == "too high"):
        possibleValues = [num for num in possibleValues if num < guess]
    elif (response == "right on"):
        if (guess in possibleValues):
            print("Stan may be honest")
        else:
            print("Stan is dishonest")
        possibleValues = [1,2,3,4,5,6,7,8,9,10]