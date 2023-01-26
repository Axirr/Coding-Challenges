from typing import List, Tuple
from queue import PriorityQueue

class Solution:
    flights:List[List[int]] = []

    def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
        self.flights = flights
        flightsTaken:int = 0
        flights.sort()
        newFrontier:PriorityQueue[Tuple[int, int]] = PriorityQueue()
        frontier:PriorityQueue[Tuple[int, int]] = PriorityQueue()
        myTup:Tuple[int, int] = (0, src)
        frontier.put(myTup)
        largeConstant:int = 10 ** 6 + 1
        minCost:int = largeConstant
        costs:List[int] = [largeConstant] * n
        while frontier.qsize() > 0 and flightsTaken <= k:
            currentNode:Tuple[int, int] = frontier.get()
            currentCost:int = currentNode[0]
            sourceCity:int = currentNode[1]

            firstIndex:int = self.earliestIndex(sourceCity)
            if firstIndex != -1:
                for i in range(firstIndex, len(self.flights)):
                    if flights[i][0] != sourceCity:  break
                    newCity:int = flights[i][1]
                    newCost:int = currentCost + flights[i][2]
                    if newCity == dst:
                        minCost = min(minCost, newCost)
                    else:
                        if newCost < costs[newCity]:
                            costs[newCity] = newCost
                            newFrontier.put((newCost, newCity))

            if frontier.qsize() == 0:
                frontier = newFrontier
                newFrontier = PriorityQueue()
                flightsTaken += 1

        if minCost == largeConstant:
            return -1
        return minCost
    
    def earliestIndex(self, sourceCity:int) -> int:
        low:int = 0
        high:int = len(self.flights) - 1
        resultIndex:int = -1
        while low <= high:
            middle:int = (low + high) // 2
            value:int = self.flights[middle][0]
            if value > sourceCity:
                high = middle - 1
            elif value < sourceCity:
                low = middle + 1
            else:
                resultIndex = middle
                high = middle - 1
        return resultIndex

def main() -> None:
    sol:Solution = Solution()
    n: int
    flights: List[List[int]]
    src:int
    dst:int 
    k:int 
    cheapestPrice:int

    n = 4
    flights = [[0,1,1],[0,2,5],[1,2,1],[2,3,1]]
    src = 0
    dst = 3
    k = 0
    cheapestPrice = sol.findCheapestPrice(n, flights, src, dst, k)
    print(cheapestPrice)
    assert cheapestPrice == -1

    n = 4
    flights = [[0,1,1],[0,2,5],[1,2,1],[2,3,1]]
    src = 0
    dst = 3
    k = 1
    cheapestPrice = sol.findCheapestPrice(n, flights, src, dst, k)
    print(cheapestPrice)
    assert cheapestPrice == 6

    n = 3
    flights = [[0,1,100],[1,2,100],[0,2,500]]
    src = 0
    dst = 2
    k = 1
    cheapestPrice = sol.findCheapestPrice(n, flights, src, dst, k)
    print(cheapestPrice)
    assert cheapestPrice == 200
    n = 4
    flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]]
    src = 0
    dst = 3
    k = 1
    cheapestPrice = sol.findCheapestPrice(n, flights, src, dst, k)
    print(cheapestPrice)
    assert cheapestPrice == 700

main()

'''
Data range/assumptions:
num cities n: [1, 100]
Flight lengths: [0, n * (n-1) / 2]
prices: [1, 10^4]
stops k: [0, n - 1]
'''

'''
Tests:
n = 1
n = 100
flights = 0
flights = max
k = 0
k = n - 1
impossible in k stops
'''

'''
Ideas:

Naive:
    Weighted graph, so step wise BFS won't work
    Priority queue necessary?
    Collect all flights starting in src
    Priority queue based on distance travelled
    To ensure optimality though, need to run all that are in queue when find a path to destination
        I.e. stop adding new ones but keep evaluating if distanceSoFar < optimalPath
    Priority queue format: [distanceTravelled, flightsTaken, currentCity]
        Actually, flightsTaken can be removed and just kept globally
    Time complexity:
        Worst case: impossible, so have to run every flight
            Fully connected, need to use every flight
            n^2
    Used visitedSet to avoid cycles

Alternatives:
    Work backwards from destination

Looked at solution, and modified BFS without priority queue seems to work
    But Dijkstra works, which is essentially my idea

Problem with visited solution:
    Multiple flights from a city are valid
    And with weighted graph, might be better ways to get there?
    Apply visited only for the next level?
        Anything that tries to go from frontier back to city we've been to is suboptimal

Finding all flights from a source city efficiently
    Sort on source city
    Binary search for earliest instance of that city
    Iterate until source city changes or flights array ends

Time limit being exceeded:
'''