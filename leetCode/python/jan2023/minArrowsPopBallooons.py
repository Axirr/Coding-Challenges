from typing import List
# from heapq import *

class Solution:
    def findMinArrowShots(self, points: List[List[int]]) -> int:
        if len(points) == 1:  return 1
        # points.sort(key=lambda point: [point[0], point[1] - point[0]])
        points.sort()
        totalArrows = 1
        arrowPosition = points[0][1]
        for i in range(1, len(points)):
            currentPoint = points[i]
            if currentPoint[0] > arrowPosition:
                totalArrows += 1
                arrowPosition = currentPoint[1]
            else:
                arrowPosition = min(currentPoint[1], arrowPosition)
        return totalArrows

    # First attempt before looking at solution
    # def findMinArrowShots(self, points: List[List[int]]) -> int:
    #     points.sort()
    #     minHeap = [[abs(point[0] - point[1]), point[0], point[1]] for point in points]
    #     heapify(minHeap)
    #     deleted = set()
    #     minArrows = 0
    #     while len(points) > 0:
    #         while len(minHeap) > 0:
    #             curSmall = heappop(minHeap)
    #             if not curSmall[1:] in deleted:
    #                 break
    #         left = curSmall[0]
    #         right = curSmall[1]
    #         low = 0
    #         high = len(points)
    #         while low < high:
    #             middle = (low + high) // 2
    #             if points[middle][0] > right:
    #                 high = middle - 1
    #             else:
    #                 break
    #         for i in range(high):
    #             p = points[i]
    #             if (p[0] >= left and p[0] <= right) or (p[1] >= left or p[1] <= left):
    #                 for i in range(left, right + 1):
    #                     pass
    #     return minArrows
    

def main():
    sol = Solution()
    points = [[10,16],[2,8],[1,6],[7,12]]
    minArrows = sol.findMinArrowShots(points)
    print(minArrows)
    assert minArrows == 2
    points = [[1,2],[3,4],[5,6],[7,8]]
    minArrows = sol.findMinArrowShots(points)
    print(minArrows)
    assert minArrows == 4
    points = [[1,2],[2,3],[3,4],[4,5]]
    minArrows = sol.findMinArrowShots(points)
    print(minArrows)
    assert minArrows == 2
    points = [[3,9],[7,12],[3,8],[6,8],[9,10],[2,9],[0,9],[3,9],[0,6],[2,8]]
    minArrows = sol.findMinArrowShots(points)
    print(minArrows)
    assert minArrows == 2
    points = [[9,12],[1,10],[4,11],[8,12],[3,9],[6,9],[6,7]]
    minArrows = sol.findMinArrowShots(points)
    print(minArrows)
    assert minArrows == 2

main()

'''
Data range/assumptions:
num of balloons n: [1, 10^5]
Each balloon has two points
points: [-2^31-1, 2^31]
'''

'''
Tests:
n = 1
n = 10^5
No overlap
Lots of overlap
Super wide balloons
Skinny balloons
Min arrows << n
Two overlap, but one overlaps with way more
Many medium balloons, so focus on small will still take a long time
'''

'''
Ideas:

Naive:
    find min and max
    for each x in there, count balloons on that x
    greedily pop largest x, then update all other points to remove popped balloons

    Don't think it would even work, but also super slow
        n! from the updates

Second naive:
    sort by smallest diameter
    focus on smallest first
        Since hardest to get a match for but still need to be popped
            Problem: smallest may not be small
    for range of smallest, count other balloons that fall in range
        can we use extreme values because we know nothing will be fully contained by smallest
            equal would be
    pop balloons at max point
    now that point (or range?) is eliminated
        keep those results cached so we don't need to look at them again

Determine overlap and eliminate
More complicated though
    E.g. two overlap, but one overlaps with way more
        Better to pop first two separately

General techniques that might apply:
    Expanding window
    Sets of balloons that share a coordinate

Overlap problems, be sure technique doesn't just optimize for:
    Lots of overlap
    Not much overlap
    Little variance
    Much variance

Simpler version: 3 balloons
    Determine overlap range between two balloons and see if third falls in it

Sort on midpoint of balloons to determine proximity

Sort on size of balloons, biggest first
    Contracting sets

Divide and conquer:
    Break repeatedly into half
    Then recombine subproblems

Greedy fails when:
    E.g. three balloons overlap but two overlap with two other disjoint groups
        Can pop with three if pop disjoint
        Same if don't though

Balloon stretch can't bring groups together
    Not linking, they need to be fully in the set

Issue: which coordinate of ballooon to pick to minimize arrows needed
    Maximize intersections with other balloons ranges


Line shadow/projection onto other lines:
    E.g.
        a1---------b1
            a2---------b2
        a2-b1 here
    Naive: check for each point
    Better: 
        min(0, min(rightbounds) - max(leftbounds))
            That's distance, but I need points

If leftbound is larger than right bound of currentBalloon, there is no overlap
If rightbound is smaller than left bound of currentBalloon, there is no overlap

Maintain bother a running minRightBound to index i and minLeftBound to index i
    Then can BST to determine points that need to be searched
        logn each to determine points to search

Sort them rearranges the lists
    Can't just rely on original indices because relationships might not hold?

Since first num is always smaller than second num, can rely on that one only?
    Because if left is too big, we know right is too big too
But same applies to right bound when compared to left of current balloon?
    If right bound smaller than left, we know left bound is smaller
        So *within the right bound list* we only have to look at ones that meet this criteria
            But doesn't help us with the original list indices or the left bound sorted indices?
    Seems like we can use one or the other but not both?
        Gives us a starting point
        And we just break when the starting point exceeds end point
    So use left, and break

Maintaining separate leftBoundPoints and points list seems bad
    Would have to delete from both

Instead, have min heap based on diameter
    Same issue, would have to update for deletions

Keep a visited set
    When pull from min-heap, check if already visited
    Re. duplicates:
        Find to ignore, since any exact duplicate will be popped by dart that popped the first

Disjoint sets within range:
    Naive: recursive, check min of disjoint sets
        Will have bad results on many disjoint sets
            Does using smallest help to minimize disjoints?
                Max disjoints = 2 if using smallest balloon?
                    Since can have one from left, and one from right
                        Any coming from left must overlap
                        And none can exist inside because we're using smallest
                        Makes sense, but seems suspect

Binary search based on left bound
    If [middle].left > current.right, not within
    if middle.left >
'''