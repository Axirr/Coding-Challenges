from typing import List
import heapq

class Solution:
    def getOrder(self, tasks: List[List[int]]) -> List[int]:
        for i in range(len(tasks)):
            tasks[i] = tasks[i] + [i]
        tasks.sort(reverse=True)
        available = []
        heapq.heapify(available)
        time = tasks[-1][0]
        taskOrder = []
        while (len(tasks) > 0 or len(available) > 0):
            while len(tasks) > 0:
                if tasks[-1][0] <= time:
                    heapq.heappush(available, tasks.pop()[1:3])
                else:
                    break
            if not len(available) == 0:
                currentTask = heapq.heappop(available)
                time += currentTask[0]
                taskOrder.append(currentTask[1])
            else:
                time = tasks[-1][0]
        return taskOrder


def main():
    sol = Solution()
    tasks = [[1,2],[2,4],[3,2],[4,1]]
    order = sol.getOrder(tasks)
    print(order)
    assert order == [0,2,3,1]
    tasks = [[7,10],[7,12],[7,5],[7,4],[7,2]]
    order = sol.getOrder(tasks)
    print(order)
    assert order == [4,3,2,0,1]
    tasks = [[1,9]]
    order = sol.getOrder(tasks)
    print(order)
    assert order == [0]
    tasks = [[1,3], [5,1]]
    order = sol.getOrder(tasks)
    print(order)
    assert order == [0, 1]

main()

'''
Data range/assumptions:
n of tasks: [1, large]
processing and enqueue time of tasks: [1, very large]
'''

'''
Tests:
One task
Many tasks
Fairly uniform task time
Very random task time
Enqueue means shortest processed later
Gap in processing time
'''

'''
Ideas:

CPU choice Rules:
    1) Shortest processing time, with index as tiebreaker
    2) But only if available at enqueue time

Naive:
    Sort by enqueue time
    Process shortest from available
    At end of process, move from enqueue to available 
    Minheap of available based on processing time

    Time complexity:
        sort: nlogn
        heap insert: logn each, n times total   -> nlogn
        heap pop: logn each, n times total      -> nlogn
        Total: 3nlogn -> O(nlogn)
'''