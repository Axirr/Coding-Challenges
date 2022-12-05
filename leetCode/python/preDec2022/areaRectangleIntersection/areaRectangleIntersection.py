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