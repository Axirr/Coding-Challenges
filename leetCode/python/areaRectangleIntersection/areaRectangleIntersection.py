class Solution:
    def computeArea(self, ax1: int, ay1: int, ax2: int, ay2: int, bx1: int, by1: int, bx2: int, by2: int) -> int:
        aArea = abs( (ay2 - ay1) * (ax2 - ax1))
        bArea = abs( (by2 - by1) * (bx2 - bx1))

        xOverlap = min(ax2, bx2) - max(ax1, bx1)
        yOverlap = min(ay2, by2) - max(ay1, by1)

        intArea = 0
        if xOverlap > 0 and yOverlap > 0:
            intArea = xOverlap * yOverlap
        
        return aArea + bArea - intArea
        # Horizontal 1 with vertical 2
        # if ax1 == bx1 and ax2 == bx2 and ay1 == by1 and ay2 == by2:
        #     return abs(ax2 - ax1) * abs (ay2 - ay1)
        # intersectionArea = None

        # targets = [ax1, ax2, ay1, ay2, bx1, bx2, by1, by2]
        # ranges = [[bx1, bx2], [bx1, bx2], [by1, by2], [by1, by2], [ax1, ax2], [ax1, ax2], [ay1, ay2], [ay1, ay2]]
        # i = 0
        # isAEnclosed = False
        # isBEnclosed = False
        # count = 0
        # while (i < len(targets)):
        #     if i == 4:
        #         count = 0
        #     currentTarget = targets[i]
        #     currentRange = ranges[i]
        #     if self.targetRange(currentTarget, currentRange[0], currentRange[1]):
        #         count += 1
        #     if count == 4:
        #         if i < 4:
        #             isAEnclosed = True
        #         else:
        #             isBEnclosed = True
        #         intersectionArea = 0
        #         break
        #     i += 1

        # validVert1 = True
        # validHor1 = True
        # if intersectionArea == 0:
        #     pass
        # elif ax1 == ax2 or ay1 == ay2 or bx1 == bx2 or by1 == by2:
        #     intersectionArea = 0
        # else:
        #     minEqualY1 = self.returnMinEqual([ay1, ay2], [by1, by2])
        #     vertical1 = None
        #     if minEqualY1 != None:
        #         vertical1 = minEqualY1
        #     else:
        #         if self.targetRange(ay1, by1, by2):
        #             vertical1 = ay1
        #         elif self.targetRange(ay2, by1, by2):
        #             vertical1 = ay2
        #         else:
        #             # intersectionArea = 0
        #             vertical1 = min(by1, by2)
        #             validVert1 = False
            
        #     horizontal1 = None
        #     minEqualX1 = self.returnMinEqual([ax1, ax2], [bx1, bx2])
        #     if minEqualX1 != None:
        #         horizontal1 = minEqualX1
        #     else:
        #         if self.targetRange(ax1, bx1, bx2):
        #             horizontal1 = ax1
        #         elif self.targetRange(ax2, bx1, bx2):
        #             horizontal1 = ax2
        #         else:
        #             # intersectionArea = 0
        #             validHor1 = False
        #             horizontal1 = min(bx1, bx2)
        
        #     vertical2 = None
        #     maxEqualY1 = self.returnMaxEqual([by1, by2], [ay1, ay2])
        #     if maxEqualY1 != None:
        #         vertical2 = maxEqualY1
        #     else:
        #         if self.targetRange(by1, ay1, ay2):
        #             vertical2 = by1
        #         elif self.targetRange(by2, ay1, ay2):
        #             vertical2 = by2
        #         else:
        #             if validVert1:
        #                 vertical2 = max(ay1, ay2)
        #             else:
        #                 intersectionArea = 0
            
        #     horizontal2 = None
        #     maxEqualX1 = self.returnMaxEqual([bx1, bx2], [ax1, ax2])
        #     if maxEqualX1 != None:
        #         horizontal2 = maxEqualX1
        #     else:
        #         if self.targetRange(bx1, ax1, ax2):
        #             horizontal2 = bx1
        #         elif self.targetRange(bx2, ax1, ax2):
        #             horizontal2 = bx2
        #         else:
        #             if validHor1:
        #                 horizontal2 = max(ax1, ax2)
        #             else:
        #                 intersectionArea = 0
        
        # aArea = abs(ax2 - ax1) * abs(ay2 - ay1)
        # bArea = abs(bx2 - bx1) * abs(by2 - by1)
        # regularArea = 0
        # if not (isAEnclosed or isBEnclosed):
        #     regularArea = aArea + bArea
        # else:
        #     if isAEnclosed:
        #         regularArea = bArea
        #     else:
        #         regularArea = aArea
        # if intersectionArea == None:
        #     intersectionArea = abs(horizontal2 - horizontal1) * abs(vertical2 - vertical1)
        # return regularArea - intersectionArea
        

        # Vertical 1 with horizontal 2
    
    # def targetRange(self, target, lowRange, highRange):
    #     if target > lowRange and target < highRange:
    #         return True
    #     return False
    
    # def returnMinEqual(self, targetList, equalList):
    #     # targetList.sort()
    #     minReturn = None
    #     for i in range(1, len(targetList)):
    #         target = targetList[i]
    #         if target in equalList:
    #             if minReturn == None:
    #                 minReturn = target
    #             else:
    #                 minReturn = min(minReturn, target)
    #     return None

    # def returnMaxEqual(self, targetList, equalList):
    #     # targetList.sort(reverse=True)
    #     maxReturn = None
    #     for i in range(1, len(targetList)):
    #         target = targetList[i]
    #         if target in equalList:
    #             if maxReturn == None:
    #                 maxReturn = target
    #             else:
    #                 maxReturn = max(maxReturn, target)
    #     return None
    
def main():
    mySol = Solution()
    resultInt = mySol.computeArea(ax1 = -3, ay1 = 0, ax2 = 3, ay2 = 4, bx1 = 0, by1 = -1, bx2 = 9, by2 = 2)
    print(resultInt)
    assert resultInt == 45
    resultInt = mySol.computeArea(ax1 = -2, ay1 = -2, ax2 = 2, ay2 = 2, bx1 = -2, by1 = -2, bx2 = 2, by2 = 2)
    print(resultInt)
    assert resultInt == 16
    resultInt = mySol.computeArea(ax1 = -2, ay1 = -2, ax2 = 2, ay2 = 2, bx1 = -1, by1 = -1, bx2 = 1, by2 = 1)
    print(resultInt)
    # Unsure assertion
    assert resultInt == 16
    resultInt = mySol.computeArea(ax1 = -2, ay1 = -2, ax2 = 2, ay2 = 2, bx1 = 2, by1 = 2, bx2 = 3, by2 = 3)
    print(resultInt)
    # Unsure assertion
    assert resultInt == 17
    resultInt = mySol.computeArea(ax1 = -2, ay1 = -2, ax2 = 2, ay2 = 2, bx1 = -3, by1 = -3, bx2 = 3, by2 = -1)
    print(resultInt)
    assert resultInt == 24
    resultInt = mySol.computeArea(ax1 = -3, ay1 = -3, ax2 = 3, ay2 = -1, bx1 = -2, by1 = -2, bx2 = 2, by2 = 2)
    print(resultInt)
    assert resultInt == 24

main()

'''
Data range/assumptions:
Coordinates can be large integers
'''

'''
Tests:
No intersection
Full intersection
Fully enclosed
Share a line, but no area
'''

'''
Ideas:

Naive:
    Equal sides checks to rule out wall share only
    Calculate two intersection points
        Figure out if top/bottom or left/right is relevant intersection
    Create other points by mixing coordinates of intersections
    Calculate area of rectangle

Relevant sides:
    Three cases:
        Side falls in between two sides of other rectangle
        Side falls outside
        Side falls right on
    Only provides a theoretical intersection, may not exist


Diaster:
Long time and still not done

Intersection definition was wrong
    Doesn't work for enclosed ones

Looked up solution, but left my horrible solution behind as a reminder
'''