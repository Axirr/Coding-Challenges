class Solution:
    def largestOverlap(self, img1, img2):
        xOffset = 1
        maxOffset = len(img1)
        maxCount = 0
        while (xOffset <= maxOffset):
            minX = maxOffset - xOffset
            for i in range(minX, maxOffset):
                currentCount = 0
                print("New column")
                for j in range(0, maxOffset):
                    currentImg1 = img1[maxOffset - 1 - j][maxOffset - 1 - i]
                    currentImg2 = img2[j][i]
                    # print("IMG2")
                    print(currentImg2)
                    # print("IMG1")
                    print(currentImg1)
                    print("")
            if currentImg1 == currentImg2 and currentImg1 == 1:
                currentCount += 1
            print("Count %d" % currentCount)
            if (currentCount > maxCount):  maxCount = currentCount
            xOffset += 1
            print("New x offset")
        return maxCount

def main():
    mySol = Solution()
    img1 = [[1,1,0],[0,1,0],[0,1,0]]
    img2 = [[0,0,0],[0,1,1],[0,0,1]]
    resultInt = mySol.largestOverlap(img1, img2)
    print(resultInt)
    # assert resultInt == 3

main()

'''
Data range/assumptions:
Small-medium n of 30
    Squared that is large though
'''

'''
No translation
'''

'''
Ideas:

Naive:
    Search, trying all combos?
        But once done left, shouldn't do right
            Same for up and down
                Could make unique shapes, but would only have 0's in them?
        So do corss [up, down] and [left, right], and then go through those step by step
            Up to n times each?
            Up, do all left
            Up, do all left
            n^2`
            4 n^2 when include all combos
                But then each needs to be searched for 1's count
                n ^ 2 search
                    Can speedup search by not searching areas that now have 0's post translation
    Ugly, and too slow

Better: focus on 1's in target image, and try and make them in the other image?
    Problem: good for individual patterns, but global patterns may conflict
        Max one, means minimizing others

Record pattern as growing from one square to its surrounding ones
    Try to place pattern in various spots on image to be translated

Overlap target image on original image, centered on a different spot
    Check valid indices for count
'''