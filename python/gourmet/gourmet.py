import sys
'''
Algorithm:
    Recursive function with number of courses and time remaining reduced
'''

functionCache = {}

def main():
    minutes = int(sys.stdin.readline().rstrip('\n'))
    totalCourses = int(sys.stdin.readline().rstrip('\n'))
    courses = []
    while (True):
        line = sys.stdin.readline().rstrip('\n')
        if (line == ''):
            break
        courses.append(int(line))
    numResults = pickCourses(courses, totalCourses, minutes)
    print(numResults)

def pickCourses(courses, numCourses, remainingTime):
    myKey = (numCourses, remainingTime)
    if (myKey in functionCache.keys()):
        return functionCache[myKey]
    validCount = 0
    for course in courses:
        if (course == remainingTime):
            validCount += 1
        elif (course < remainingTime):
            validCount += pickCourses(courses, numCourses - 1, remainingTime - course)
    functionCache[myKey] = validCount
    return validCount

main()