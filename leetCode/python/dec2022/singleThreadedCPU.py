from typing import List
import heapq

class Solution:
    def getOrder(self, tasks: List[List[int]]) -> List[int]:
        # Add original indexes to tasks and sort based on enqueue time
        sortedTasks = [[enq, proc, i] for i, (enq, proc) in enumerate(tasks)]
        sortedTasks.sort(reverse=True)

        available = []
        taskOrder = []
        while (len(sortedTasks) > 0 or len(available) > 0):
            # Change time to next time with enqueued task if none currently available
            if not len(available) == 0:
                currentTask = heapq.heappop(available)
                time += currentTask[0]
                taskOrder.append(currentTask[1])
            else:
                time = sortedTasks[-1][0]

            # Push any tasks to the heap that are valid for current time
            while len(sortedTasks) > 0:
                if sortedTasks[-1][0] <= time:
                    heapq.heappush(available, sortedTasks.pop()[1:3])
                else:
                    break
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
        append indexes to tasks: n
        sort: nlogn
        heap insert: logn each, n times total   -> nlogn
        heap pop: logn each, n times total      -> nlogn
        Total: n + 3nlogn -> O(nlogn)
'''