from typing import List
from collections import Counter
from heapq import *

class Solution:
    def minimumTime(self, time: List[int], totalTrips: int) -> int:
        countDictionary = Counter()
        for element in time:
            countDictionary[element] += 1
        

        minHeap = []
        for key in countDictionary:
            heappush(minHeap, [key, key, countDictionary[key]])
        
        currentTrips = 0
        currentTime = 0
        while (currentTrips < totalTrips):
            currentMin = minHeap[0]
            currentTime = currentMin[0]
            currentTrips += currentMin[2]
            heapreplace(minHeap, [currentMin[0] + currentMin[1], currentMin[1], currentMin[2]])

        return currentTime



def main():
    sol = Solution()
    time = []
    totalTrips = 1
    minTime = 0

    time = [1,2,3]
    totalTrips = 5
    minTime = sol.minimumTime(time, totalTrips)
    print(minTime)
    assert(minTime == 3)


if __name__ == "__main__":
    main()