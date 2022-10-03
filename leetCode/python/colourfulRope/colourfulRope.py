class Solution:
    def minCost(self, colors, neededTime):
        timeCount = 0
        startIndex = 0
        prevBalloon = colors[0]
        currentSum = neededTime[0]
        currentMax = neededTime[0]

        for i in range(1, len(colors)):
            currentBalloon = colors[i]
            currentTime = neededTime[i]
            if (currentBalloon != prevBalloon):
                # Add sum - min only if run is longer than 1
                if ((i - startIndex) > 1):
                    timeCount += currentSum - currentMax

                # Reset running sum and min
                startIndex = i
                currentSum = currentTime
                currentMax = currentTime
            else:
                # Update running sum and min
                currentSum += currentTime
                currentMax = max(currentMax, currentTime)
            prevBalloon = currentBalloon
        if (startIndex != len(colors) - 1):
            timeCount += currentSum - currentMax

        return timeCount        

def main():
    mySolution = Solution()
    testColors = "abaac"
    testNeededTime = [1,2,3,4,5]
    mySolution.minCost(testColors, testNeededTime)

main()


'''
Manual test case:
aabcc
15324

timeCount 0
start 0
prev a
current 1
min 1

curr == prev
    sum 6
    min 1
    prev a
curr != prev
    timeCount 5
    sum 3
    min 3
curr != prev
    3 - 2 !> 1
        no add time
    start 3
    curr

'''

'''
Data range/assumptions:
Non-empty
Colors are lowercase letters
Large data sets
'''

'''
Important test cases:
Single balloon
    Already colorful, return
All same color
    Remove all except one
        Keep the one with the highest removal time
Two options to remove, with one being quicker
Rope already colourful
    Remove none
Last element in a run and is minimum
'''

'''
Plain language algorithm ideas:

Naive:
    Identify ranges with consecutive balloons
    Remove quickest

Too simple?
    Ever have to keep really expensive balloons?
        No, cannot insert, so two neighbours can only be fixed by removing one

Always run of n -> run of 1

Destorying runs entirely an option?
    No advantage

Formal:
'''
