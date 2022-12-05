class Solution:
    def maximum69Number (self, num: int) -> int:
        stringNum = str(num)
        for i in range(len(stringNum)):
            if stringNum[i] == '6':
                stringNum = stringNum[0:i] + '9' + stringNum[i+1:]
                break
        return int(stringNum)

def main():
    mySol = Solution()
    myInt = 9996
    resultInt = mySol.maximum69Number(myInt)
    print(resultInt)

main()

'''
Data range/assumptions:
Small number range
'''

'''
Tests:
Single digit
All 9's
Only last digit non-9
'''

'''
Ideas:
Naive:
    Convert to string
    for letter in s
        if 6:
            change to 9
            break
    convert to int
'''