import math

class Solution:
    def intToRoman(self, num: int) -> str:
        maxDigit = math.floor(math.log(num, 10) + 0.0000001)
        print(maxDigit)
        resultString = ""
        while (maxDigit >= 0):
            currentDigit = (num // int(math.pow(10, maxDigit))) % 10
            if maxDigit == 3:
                resultString += currentDigit * 'M'
            elif maxDigit == 2:
                if currentDigit == 9:
                    resultString += 'CM'
                elif currentDigit == 4:
                    resultString += 'CD'
                else:
                    resultString += (currentDigit // 5) * 'D' + (currentDigit % 5) * 'C'
            elif maxDigit == 1:
                if currentDigit == 9:
                    resultString += 'XC'
                elif currentDigit == 4:
                    resultString += 'XL'
                else:
                    resultString += (currentDigit // 5) * 'L' + (currentDigit % 5) * 'X'
            else:
                if currentDigit == 9:
                    resultString += 'IX'
                elif currentDigit == 4:
                    resultString += 'IV'
                else:
                    resultString += (currentDigit // 5) * 'V' + (currentDigit % 5) * 'I'
            print(currentDigit)
            maxDigit -= 1
        return resultString

def main():
    mySol = Solution()
    # num = 1994
    # resultString = mySol.intToRoman(num)
    # print(resultString)
    num = 1000
    resultString = mySol.intToRoman(num)
    print(resultString)

main()

'''
Data range/assumptions:
Non-empty
Medium range (1 - 3999)
Valid roman numerals:
    IVXLCDM
    1   5   10  50  100     500     1000
'''

'''
Test cases:
Combo numerals
    E.g. IV, XC
Double combo
    E.g. XCIV
Large (3999)
Small (1)
~3, 9, 49, 
'''

'''
Ideas:

Subtract largest as many times as possible
    Move to next

What of weird ones
    Both above and below the value
        E.g. 9 and 11    
    See if can be removed with exactyl xxx0 left behind?
    Try 11, then 9, then 10?
    E.g. 19
        11 != % 0

Break into digits?
    4, 6, 9 only matters for last digit?
    11, 19 like a 1/9 for the 10's digit?

Find magnitude of top digit
    Log 10
If 4th
    Try 

E.g. 3999
    3 is thousands
        MMM
    9 is hundreds
        Hundreds cares about 5s
        Not 5, so do normally
        IX
    3   mmm
    2   m
    1   m

    9   cm
    8   dccc
    7   dcc
    6   dc
    5   d
    4   
MMMC
'''