import math

class Solution:
    def reverse(self, x: int) -> int:
        maxPositiveDigitList = [2,1,4,7,4,8,3,6,4,7]
        maxNegativeDigitList = [2,1,4,7,4,8,3,6,4,8]
        isNeg = False
        if (x < 0):
            isNeg = True
            x = -x
        if (x == 0):
            return 0

        doCheck = True
        if (x <= 999999999 or (x % 10) < 2):
            doCheck = False

        currentSum = 0
        currentDigitDivisor = 1
        maxDigits = math.ceil(math.log(x + 1, 10))
        maxPowerValue = int(math.pow(10, maxDigits - 1))

        if (doCheck):
            maxDigits = 10
            checkDigitList = maxPositiveDigitList
            if (isNeg):
                checkDigitList = maxNegativeDigitList
            for i in range(maxDigits):
                currentDigit = (x // currentDigitDivisor) % 10
                if (currentDigit > checkDigitList[i]):
                    return 0
                if (currentDigit < checkDigitList[i]):
                    break
                currentSum += currentDigit * (maxPowerValue // currentDigitDivisor)
                currentDigitDivisor *= 10
        while (currentDigitDivisor <= maxPowerValue):
            currentSum += ((x // currentDigitDivisor) % 10) * (maxPowerValue // currentDigitDivisor)
            currentDigitDivisor *= 10
        if (isNeg):   currentSum *= -1
        return currentSum

def main():
    mySol = Solution()
    myInt = 123
    myReverseInt = mySol.reverse(myInt)
    print(myReverseInt)
    myInt = -123
    myReverseInt = mySol.reverse(myInt)
    print(myReverseInt)
    myInt = 214748364
    myReverseInt = mySol.reverse(myInt)
    print(myReverseInt)
    myInt = -214748364
    myReverseInt = mySol.reverse(myInt)
    print(myReverseInt)
    myInt = 2147483642
    myReverseInt = mySol.reverse(myInt)
    print(myReverseInt)
    myInt = 2147483602
    myReverseInt = mySol.reverse(myInt)
    print(myReverseInt)
    myInt = 8463847412
    myReverseInt = mySol.reverse(myInt)
    print(myReverseInt)
    myInt = 7463847412
    myReverseInt = mySol.reverse(myInt)
    print(myReverseInt)
    myInt = 1
    myReverseInt = mySol.reverse(myInt)
    print(myReverseInt)
    myInt = 10
    myReverseInt = mySol.reverse(myInt)
    print(myReverseInt)
    myInt = -2147483412
    myReverseInt = mySol.reverse(myInt)
    print(myReverseInt)

main()

'''
Data range/assumptions:
-2^31 to 2^31
Integer non-null
Sign maintained
'''

'''
Important test cases:
0
Negative
Positive
Flips outside range
Leading 0's
absolute min value          -> valid
absolute min value - 1      -> 0
absolute max value          -> valid
absolute max value + 1      -> 0
'''

'''
Naive (turn into string, then can work without int space constraint):
    maxVal = 2147483647
    minVal = -2147483648
    isNegative
    make positive
    string of the int digits
    reverse
    check len
        Only certain lens that can go inside outside range
        If one of those:
            Check highest order digits as required
                log10(2^31) = 9.333
                Any 9 digit will be valid?
                Some of the 10 digit ints will be invalid
                    Check digits by digit against maxVal and minVal strings 
    
    Sanity check on assumptions:
        All 9 digits valid reversed?
            Largest 999999999 is still valid
        Some 10 digits invalid reversed:
            1000000009 -> 9000000001 > 21474...
        String conversion allowed?
            Yes
        Leading zeroes?
            Need to be accomodated for, but not actually reduce digits, thus make valid
        Digits decimal not binary?
            Yes, see examples

Non-string version:
    Sum up digits, checking each against max digits

    maxDigitList = [2,1,4,...]
    bool isNeg = False
    if (num < 0) {
        isNeg = True
        num = abs(num)
    }
    bool noCheck = False
    if (num <= 999999999) {
        noCheck = True
    }
    currentSum = 0
    currentDigitDivisor = 1
    maxDigits = ceil(log10(num))
    if (noCheck) {
        for i in range(maxDigits):
            currentSum += (num // currentDigitDivisor) % 10 * pow(10, maxDigits - 1)
            currentDigitDivisor *= 10
    } else {

    }
'''