class Solution:
    def getSkyline(self, buildings: List[List[int]]) -> List[List[int]]:
        pass


'''
Data range/assumptions:
Non-empty buildings
Non-zero width
Height >= 1
Can have buildings with the same x or y
Front to back ordering doesn't matter

Inpute size: large
    Efficiency required
And x and y values can be large
'''

'''
Important test cases:
Single building
    Critical points are intersections with own lines
Two buildings are the same
Building fully eclipsed by another (i.e. can be removed)
Fully contiguous
Not fully contiguous (gap between groups of buildings)
Critical points that need cleaning up
    I.e. same height
A lot of duplicates
    Potential large speedup if identified
    Undercuts efficiency of window approach, since all fall in windows
Building as wide as the range
Building as tall as the range
    Less important if using width windows approach
No gaps in buildings
    Since exploitable for efficiency
Large area but doesn't block much
'''

'''
Plain language ideas:

Naive:
Buildings are three lines
    [left, 0], left, height
    left height     right height
    right 0         right height
Critical points are intersections between these lines
For each building line
    For each other building line
        If intersect, critical point
Clean up critical points after by combining contiguous ones
    Same height and contiguous
        No intervening critical point with x value between?
Time complexity:
    n^2 even before cleanup

Better:
    Look at various windows on the x axis
        Only deal with lines and intersection which exist in there
    Have to pre-sort into those windows
        n logn
    How large windows?
        1 would be too small
        10?
    Left means can't be in earlier windows
    Right means can't be in later windows
    Use a set for each window
        To save on calculating duplicate intersections

Formal:
    windowSets = []
    windowSets.append(set())
    buildingIndex = 0
    windowSetIndex = 0
    while (buildingIndex < len(buildings)): 
        myBuilding = buildings[buildingIndex]
        linesForBuilding = linesForBuilding(myBuilding)
        for line in linesForBuilding:
            windowSets[myBuilding.left // windowSize].insert()
        buildingIndex += 1
    criticalPoints = []
    for windowSet in windowSets:
        for i in range(len(windowSet));
            line = windowSet[i]
            for j in rnage(i + 1, len(windowSet)):
                intersectionPoint = intersection(line, windowSet[j])
                if (intersectionPoint):     criticalPoints.append(intersectionPoint)


Intersection of two lines:
    Lines are just two ranges
        xrange
        yrange
    Must be a point in x1range in x2range
        Reverse is necessarily implied
    Mathematically:
        (x2high <= x1high and x2high >= x1low) or (same for x2low)
        and (y2high ...)
    That tells us if intersection, but not where
        Vertical/horizontal lines means one dim is fixed
        Other dim: fixed dim of the other one?

buildLines(building):
    left = building[0]
    right = building[1]
    height = building[2]
    lineFormat: [[lowx, lowy], [highx, highy]]
    for each
        left constant
        right constant
        height constant

Sanity and efficiency checks:
    Window set builder work?
        Yes
    Help? No
        With only one boundary, lines would still have to be checked against all others

New idea:
    Need right boundary too
        left in [currentWindow, currentWindow + windowSize]
    Buildings may not fit in windows of those size
    Increase windowSize until encompasses whole range?
        If used in older window size pass, could still be intersected with
    New windowsize = union of old window sizes
        Need to check all those against new buildings that now fit
        But not against each other, since we know they don't intersect

Formal:
    construct sets of buildings that fall completely within some x window
        Removing from remainingBuildings
        Solve for those subsets
    while (remainingBuildings.length > 0)
        double windowSize
        combine neighbouring window sets
        compare new fitting buildings against everything in combined set
            Expensive, but checked less 

What does a big building do critical points of ones it overlaps? 
    For any buildings completely within bounds, critical points irrelevant
        And no critical points with overlapping building itself
    If partially sticking out (either longer or wider), some critical points still matter
        But not with any buildings that are fully covered

Prune irrelevant buildings
    Iteratively construct ranges that can be excluded
        Exclude buildings that entirely fall within
        Would have to recheck old ones though, unless some way to do in good order
            Sort largest height
            Sort largest width
            But could have real tall but skinny, so doesn't block much/anything
            Or wide but short, same
        If did area, would have a better chance of hit, but no guarantee

Find gaps in buildings on x axis
    Then problems independent, and can work with samller subsets
    Naive approach could be foiled by a single large building meaning no gaps
        Subproblems may still be solvable indepedently
        Back to the expanding window situation

solve(problem, parent=None):
    Sort by either width or area
    Starting case: full range
    subproblems = findSubProblems()
    If len(subproblems) > 1:
        for problem in subproblems:
            criticalPoints += solve(problem, parent)
    Else:
        lineSet = set(parentLine1, parentLine2, parentLine3)
        for building in problem:
            if parent:
                if not coveredBy(parent.left, parent.right, parent.height):
                    lineSet.insert(line1, line2, line3)
        for line in lineSet:
            for other line2 in lineSet:
                intersectionPoint = intersection(line1, line2)
                if (intersection):  criticalPoints += intersectionPoint
    cleanUpCriticalPoints(criticalPoints)
    return criticalPoints

How to find gaps:
    Starting with full range
    Go through buildings, inserting bounds
        E.g. []
            Building 4x - 6x
            [[4,6]]
            [[4,6] [6,8]] -> merge [4, 8]
    Can then reuse list?
        Not if merging

Nested class?
    Binary search tree?
        self.building
        self.internal = []
    Else:
        while (true):
            goDeeper = False
            binary search for valid x
            if valid x, binary search for valid y 
                If coveredBy(sub)
                    internal = sub.internal
                    goDeeper = True
                    break;
            if not goDeeper:
                internal.binaryInsert(entity)
    Sorting process would be n log n?
        For each item (n), need to traverse tree
        Not a binary tree though, since multiple nodes
        Worst case: single layer - n * (sigma(n))

How to clean up critical points:
'''