from typing import List

class Solution:
    def sumSubarrayMins(self, arr: List[int]) -> int:
        minStack = []
        runningSum = 0

        for i in range(len(arr) + 1):
            while len(minStack) > 0 and (i == len(arr) or arr[i] < arr[minStack[-1]]):
                mid = minStack.pop()
                if len(minStack) == 0:
                    start = -1
                else:
                    start = minStack[-1]
                runningSum += (mid - start) * (i - mid) * arr[mid]
            minStack.append(i)
                
        return runningSum % 1000000007
    
    def distance(self, mid, start, finish):
        return (mid - start) * (finish - mid)

    def squaredComplexitySumSubarrayMins(self, arr: List[int]) -> int:
        cachedResults = dict()
        runningSum = sum(arr)
        windowSize = 1
        arrayLength = len(arr)
        for i in range(0, arrayLength - windowSize):
            j = i + windowSize
            newMin = min(arr[i], arr[j])
            runningSum += newMin
            cachedResults[i] = newMin
        for windowSize in range(2, arrayLength):
            for i in range(0, arrayLength - windowSize):
                j = i + windowSize
                newMin = min(cachedResults[i], arr[j])
                runningSum += newMin
                cachedResults[i] = newMin
        return runningSum % 1000000007

def main():
    mySol = Solution()
    arr = [3,1,2,4]
    arrSum = mySol.sumSubarrayMins(arr)
    print(arrSum)
    assert arrSum == 17
    arr = [11,81,94,43,3]
    arrSum = mySol.sumSubarrayMins(arr)
    print(arrSum)
    # assert arrSum == 444

main()

'''
Data range/assumptions:
Large array
Large values
Non-empty
'''

'''
Tests:
Single 1x1 array
Large example for time complexity
Large, all the same value
'''

'''
Ideas:

Naive has no chance of working
    Looks like n!

Better:
    Minimums of larger arrays have to be one of the minimums of a subarray
    Dynamic programming?
    min D[i:j] = min(D[i] + D[j])

Window size from one to n
Size:       Time:
1           n
2           (n - 1) * 2
...
n - 1       2 * (n - 1)
n           1 * n

Approx n * 2n ~= n^2
Not great, but at least not factorial

But that is checking all the single elements maxes
    Record each level, high space complexity, but then each additional lookup is O(1)
        How to combine though
            E.g. [1:5] [2:6]
    Use a mix of sizes
        E.g. use [1:5] and [6]

for windowSize in range(2, n):
    for i in range(n - windowSize):
        j = i + windowSize
        newMin = min(cachedResults[i:j-1], cachedResults[j])
        if windowSize > 1:
            del cachedResults[i:j - 1]
        cachedResults[i:j] = newMin

Deletion saves space complexity
    Only need to keep first level and last level


Solution works but is too slow, even though improved


Better: exploit min function
    One low number is likely to be the minimum for many arrays
    Find top level min
        Then find the earliest (?) occurence of that number
            Any subarray with that index has that as a min
                Possibly could include multiple indices
    Reduce size by one, do the same thing?
        If not captured by previous shortcuts, do the same process
        Will need to have mins in an order to check
    Gradually, will order the entire list as minimums
        Puts an upper bound on how many times the slow work has to be done?

Bad cases:
    All the same number/repeats more generally
        E.g. a list of one number would result in all of them being in the mins
    Descending list
        Since max of biggest won't be max of any subarrays except last

Slight modification: partition?
    Find instance of minimum
    Set windowSize around it
    Find minimums of other parts
        Maybe thirds?
    Then until windowSize is below n/3, every array is some overlap of those minimums

Wouldn't even have to find global minimum, it would just be in one of the 1/3
Once window size gets below n/3, apply 1/3 to each 1/3?
Same thing, overlaps
At a certain scale it likely becomes unworkable, could I use a different strategy there?

Previous solution, iterations were constant time so number of iterations became the key
    I.e. small windowSize would be the largest part of workload, since so many more windows

That's unavoidable, so even if this sped up large windowSize (debatable), it wouldn't help small
    In fact, would possibly make these non-constant time
        Very bad

Need to focus on smallWindow acceleration

Try to find windows where minimum stays constant
    Then can skip some iterations
    Unlikely to work for many datasets

Vague understanding of monotonic stack
Will try to implement on my own

Traverse array, maintaining a monotonically decreasing stack
When pop something from the array, we know it was the minimum for some distance
Formula for figuring out the sub arrays in that distance (likely combinations) and then multiply by the min

Not clear on:
    How do we maintain the distance
        Stack must also store start index?
    How does this deal with arrays being centered around number, not necessairly starting on it?

Ultimately just had to copy their strategy
'''