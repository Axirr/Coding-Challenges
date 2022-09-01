import sys

# minValue = 1
# maxValue = 10
# isDishonest = False
# while (True):
#     guess = sys.stdin.readline().rstrip("\n")
#     guess = int(guess)
#     if (guess == 0):
#         break
#     response = sys.stdin.readline().rstrip("\n")
#     if (response == "too low"):
#         newMin = guess + 1
#         if (newMin < minValue):
#             isDishonest = True
#         else:
#             minValue = newMin
#     elif (response == "too high"):
#         newMax = guess - 1
#         if (newMax > maxValue):
#             isDishonest = True
#         else:
#             maxValue = newMax
#     elif (response == "right on"):
#         if (isDishonest or (not (guess >= minValue and guess <= maxValue))):
#             print("Stan is dishonest")
#         else:
#             print("Stan may be honest")
#         minValue = 1
#         maxValue = 10
#         isDishonest = False

possibleValues = [1,2,3,4,5,6,7,8,9,10]
# isDishonest = False
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
        # isDishonest = False

'''
Dishonest = previously ruled out guess is correct
Honest = final answer not contradicted by any previous assertions
Assertions rule out whole ranges of numbers
    low, rules out every value below and self
    high, rules out eveyr value above and self
'''