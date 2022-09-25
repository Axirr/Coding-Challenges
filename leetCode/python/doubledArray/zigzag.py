import copy

class Solution:
    def convert(self, s: str, numRows: int) -> str:
        '''
        Write full column top to bottom
        Write one letter in (bottom, top, 1)
        Write to [top, bottom, 1] row until reach end
        Then write to 
        '''
        resultRows = []
        for _ in range(numRows):
            resultRows.append([])
        isNormal = True
        normalRows = list(range(numRows - 1, 0 - 1, -1))
        zagRows = []
        rowsToWrite = copy.copy(normalRows)
        if (numRows <= 2):
            zagRows = copy.copy(normalRows)
        else:
            # zagRows = list(range(numRows - 2, 0, -1))
            zagRows = list(range(1, numRows - 1))
        for letter in s:
            if (len(rowsToWrite) == 0):
                if (isNormal):
                    rowsToWrite = copy.copy(zagRows)
                else:
                    rowsToWrite = copy.copy(normalRows)
                isNormal = not isNormal
            resultRows[rowsToWrite.pop()].append(letter)
        resultStr = ""
        # print(resultRows)
        for line in resultRows:
            resultStr += "".join(line)
        return resultStr

def main():
    mySolution = Solution()
    # myString = "PAYPALISHIRING"
    # print(mySolution.convert(myString, 3))
    myString = "PAYPALISHIRING"
    print(mySolution.convert(myString, 4))
    myString = "ABC"
    print(mySolution.convert(myString, 2))

main()