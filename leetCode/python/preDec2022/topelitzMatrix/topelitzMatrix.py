from typing import List

class Solution:
    def isToeplitzMatrix(self, matrix: List[List[int]]) -> bool:
        xLen = len(matrix[0])
        yLen = len(matrix)
        
        for y in range (yLen):
            firstElement = matrix[y][0] 
            x = 1
            y += 1
            while (x < xLen and y < yLen):
                if (matrix[y][x] != firstElement):
                    return False
                x += 1
                y += 1
        
        for x in range(1, xLen):
            firstElement = matrix[0][x]
            y = 1
            x += 1
            while (x < xLen and y < yLen):
                if (matrix[y][x] != firstElement):
                    return False
                x += 1
                y += 1
        
        return True
    
'''
Ideas:

Every diagonal starts from outside border
    Upper left or lower right for top or bottom start
    
Left border: x = 0, iterate y
Top borde: y = 0, iteate x

Then increment each by 1 until indices invalid
'''