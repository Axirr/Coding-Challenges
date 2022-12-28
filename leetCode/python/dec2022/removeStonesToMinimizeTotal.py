from typing import List
from math import floor
from queue import PriorityQueue
import heapq

class LinkedListWithIndex:
    def __init__(self, value) -> None:
        self.head = DoublyLinkedNode(value, None, None)
        self.indexDict = {}
        self.indexDict[0] = self.head
        self.length = 1
    
    def append(self, value):
        oldNode = self.indexDict[self.length - 1]
        newNode = DoublyLinkedNode(value, self.indexDict[self.length - 1], None)
        oldNode.next = newNode
        self.length += 1
        self.indexDict[self.length - 1] = newNode

    def get(self, index):
        return self.indexDict[index].value
    
    def pop(self):
        returnNode = self.indexDict[self.length - 1]
        returnValue = returnNode.value
        if returnNode.previous:
            returnNode.previous.next = None
        del self.indexDict[self.length - 1]
        self.length -= 1
        return returnValue
    
    def set(self, index, value):
        self.indexDict[index] = value
    
    def insert(self, index, value):
        if not index == self.length:
            print("NOT end insert")
            oldNode = self.indexDict[index]
            newNode = DoublyLinkedNode(value, oldNode.previous, oldNode)
            if index == 0:
                self.head = newNode
            if oldNode.previous:
                oldNode.previous.next = newNode
            oldNode.previous = newNode
            for i in range(index, self.length):
                self.indexDict[i + 1] = self.indexDict[i]
            self.indexDict[index] = newNode
            # self.indexDict[index + 1] = oldNode
        else:
            print("end insert")
            endNode = self.indexDict[self.length - 1]
            newNode = DoublyLinkedNode(value, endNode, None)
            endNode.next = newNode
            self.indexDict[index] = newNode
        self.length += 1
    
    def printLL(self):
        currentNode = self.head
        while currentNode:
            print(currentNode.value, end = " ")
            currentNode = currentNode.next
        print("end")
    
    def sum(self):
        total = 0
        currentNode = self.head
        while currentNode:
            total += currentNode.value
            print(total)
            currentNode = currentNode.next
        return total

class DoublyLinkedNode:
    def __init__(self, value, previous, next):
        self.value = value
        self.previous = previous
        self.next = next

class Solution:
    def minStoneSum(self, piles: List[int], k: int) -> int:
        myHeap = [-x for x in piles]
        heapq.heapify(myHeap)
        while k > 0:
            current = -heapq.heappop(myHeap)
            current = current - floor(current // 2)
            heapq.heappush(myHeap, -current)
            k -= 1
        return -sum(myHeap)

    def brokenminStoneSum(self, piles: List[int], k: int) -> int:
        lengthPiles = len(piles)
        if lengthPiles == 1:
            return piles[0] - self.numRemoved(piles[0], k)
        piles.sort()
        myLinkedList = LinkedListWithIndex(piles[0])
        for i in range(1, len(piles)):
            myLinkedList.append(piles[i])
        myLinkedList.printLL()
        while k > 0:
            largest = myLinkedList.pop()
            largest = largest - floor(largest // 2)
            low = 0
            high = lengthPiles - 2
            middle = (high + low) // 2
            while True:
                middle = (high + low) // 2
                val = myLinkedList.get(middle)
                if val == largest:
                    break
                if val > largest:
                    high = middle - 1
                else:
                    low = middle + 1
                if low >= high:
                    if low == high and largest < myLinkedList.get(low):
                        low -= 1
                        high -= 1
                    break
            myLinkedList.insert((low + high) // 2 + 1, largest)
            myLinkedList.printLL()
            k -= 1
        return myLinkedList.sum()

    def numRemoved(self, i, k):
        original = i
        while (i > 1 and k > 0):
            i = i - floor(i // 2)
            k -= 1
        return original - i

    def powersOfTwoTest(self):
        upToK = 2
        for i in range(1, 50):
            neighbour = i + 1
            lowRemoved = self.numRemoved(i, upToK)
            highRemoved = self.numRemoved(neighbour, upToK)
            # if not lowRemoved <= highRemoved:
            if True:
                print(i, end = " ")
                print(lowRemoved)
                print(neighbour, end = " ")
                print(highRemoved)
                if lowRemoved > highRemoved:
                    print("LOW BETTER")
                elif highRemoved > lowRemoved:
                    print("HIGH BETTER")
                else:
                    print("EQUAL")
                print()
    

def main():
    sol = Solution()
    # piles = [18]
    # k = 30
    # minStones = sol.minStoneSum(piles, k)
    # print(minStones)
    # assert minStones == 1
    # piles = [18]
    # k = 3
    # minStones = sol.minStoneSum(piles, k)
    # print(minStones)
    # assert minStones == 3
    # piles = [1]
    # k = 3
    # minStones = sol.minStoneSum(piles, k)
    # print(minStones)
    # assert minStones == 1
    piles = [5,4,9]
    k = 2
    minStones = sol.minStoneSum(piles, k)
    print(minStones)
    assert minStones == 12
    piles = [4,3,6,7]
    k = 3
    minStones = sol.minStoneSum(piles, k)
    print(minStones)
    assert minStones == 12
    piles = [1391,5916]
    k = 3
    minStones = sol.minStoneSum(piles, k)
    print(minStones)
    assert minStones == 2131
    piles = [4122,9928,3477,9942]
    k = 6
    minStones = sol.minStoneSum(piles, k)
    print(minStones)
    assert minStones == 8768
    piles = [8916,7289,8226,4395,589,450,5965,7617,5218,6227]
    k = 7
    minStones = sol.minStoneSum(piles, k)
    print(minStones)
    assert minStones == 30165
    piles = [2695,9184,2908,3869,3779,391,2896,5328]
    k = 10
    minStones = sol.minStoneSum(piles, k)
    print(minStones)
    assert minStones == 10946

main()

'''
Data range/assumptions:
Number of piles (n): [1, large]
Stones in piles (m): [1, large]
Number of operations (k): [1, large]
'''

'''
Tests:
One pile
Many piles
Small piles
Large piles
Need to take from different piles from optimal
[11,10], 2 operations
'''

'''
Ideas:

Naive:
    sort piles
    take from largest pile and resort

Larger pile always right choice?

Does odd versus even choice matter?
    E.g. 11 vs. 10 -> 5 for either
        But then 6 vs. 5, can take more from 6 (3 vs 2)
    What if odd is below?
    E.g. 9 vs. 10
        4 vs 5
        Then goes to 5, 5, and will be equal for th rest

Best case, power of 2?
    Since will never round down and will take full halves
    E.g. 9 vs 8
        For 9: 5 3 2
        For 8: 4 2 1
    So that's an instance where greedy on large doesn't work
        Nor using odd is better in some way
    WRONG
    8 gets to a lower number but they remove the same number since 9 starts 1 higher

Closer to power of two better?
    Using sort, get max
    Keep a running power of 2 that you want to be closest to


What happens when low == high?
    Two different circumstances
        Low was modified
        High was modified
    Whatever was modified, other is correct and should insert there?
        No
        Two examples require different treatment, but don't know why

Ordered data structure with constant time insert?
    Linked list?
        Don't need to reorder on constant time but not constant time to find insert point
    Linked list with dictionary providing index lookup?
        Same problem: need to update indices for everything after insertion
        Would a running sum of insertions work?
            Seems complicated
'''