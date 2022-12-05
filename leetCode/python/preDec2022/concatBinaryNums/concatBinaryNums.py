import math

class Solution:
    def concatenatedBinary(self, n: int) -> int:
        '''
        Data range/assumptions
        Lowest value 1
        Highest value large
        '''
        
        '''
        Test cases
        Single digit
        Below 10^9 + 7
        Above 10^9 + 7
        Repeted same digits
        '''
        
        '''
        Ideas:
        String will likely get too long to be turned back into an int
        10^9 would be moving decimal, but this is harder
        Only digits less than modulo matter?
        Once string value passes the modulo, only low digits matter
        10 lowest digits only?
        10000000007 -> 10 digits
        log2 num -> 29... round up to 30
        Not just bits, need values in them
        So if the 30th or higher bit has a 1 in it, then good
            All values other than 0 will have at least a 1 in them
            24 bit = 3 nums
            So have to check digits on 5th num
            6th num will always do it, unless 0
        
        Problem:
            Digits vary
            E.g. a 30 digit number would potentially fully fill
            E.g.
        
        Plain language:
            Iterate backwards constructing string up to 30 digits
            If digits less than 30, fine
            If digits greater than 30, add as many digits as we have
            Convert string to decimal number
            Mod number
        
        Assumption fatally flawed
        Need to check that first!!!
        12345 % 107
        345 % 107
        not same

        Covert number into base modValue?
            Then modValue goes into any digits above evenly, and can't assume those away
            Would need a manually modulus function though?
        
        Plain language
        Construct string
        If string large enough to put into base modValue
        Break
        Convert to mod value
        Maintain digits less than modValue digits?
        Would only be 1 digit?
            Because it's a prime?

        Try with small prime
        % 7
        If assumption true xxxxx7 % 7 should always equal the same thing
            Counter: 17 % 7 = 3
                    27 % 7 = 6
        Discarding digits approach just doesn't work


        Need a whole new approach
            If exceed base, calculate mod of that and use somehow?
            E.g. 7 -> 111
                s
            Digits pass 3
            5
                110
            4
                110110
                passed 3
                    Keep result and 
            3
                1011110
            2

        Ultimately, the string isn't important, it's just the structure
        If we know the current digit, we can just shift the current num by that before adding to a sum
        That will work, if we don't surpass size of int doing it
        Digits 7 -> 111
            110
            101
            100
            11
            10
            1
        Digits = sum (n^2)
        Given n

        Only add mod for anything over base?
        base: 7
        101110 % 7
        mod(8) = 1 + 
        I think there's something here
        '''
        verbose = False

        fullValue = 1000000007
        overflowDigit = math.ceil(math.log(fullValue, 2))
        usedDigits = 0
        num = -1
        binaryString = ""
        # Add digits until digits more than 30, or used all nums
        for num in range(n, 0, -1):
            numDigits = math.ceil(math.log(num, 2))
            usedDigits += numDigits
            # print(self.binStringForNum(num))
            binaryString = self.binStringForNum(num) + binaryString
            # if (usedDigits >= overflowDigit):
            #     break
        correctConcat = "1101110010111011110001001101010111100"
        if (verbose):
            print(binaryString)
            print("012345678901234567890123456789")
            print(correctConcat)
        convertedInt = self.intFromBinaryString(binaryString, overflowDigit)
        if (verbose):
            print((self.intFromBinaryString(correctConcat, overflowDigit) % fullValue))
        # print((self.intFromBinaryString("10111011110001001101010111100")))
        return convertedInt % fullValue
    
    def binStringForNum(self, num):
        resultString = ""
        while (num > 1):
            digit = num % 2
            resultString = str(digit) + resultString
            num = num // 2
        resultString = str(num) + resultString
        return resultString
    
    def intFromBinaryString(self, binaryString, maxDigits):
        multiplier = 1
        mySum = 0
        # count = maxDigits
        for i in range(len(binaryString) - 1, -1, -1):
            letter = binaryString[i]
            mySum += int(letter) * multiplier
            multiplier *= 2
            # count -= 1
            # if count <= 0:
            #     break
        # print("Decimal value is %d" % mySum)
        return mySum

def main():
    mySolution = Solution()
    myResult = mySolution.concatenatedBinary(1)
    print(myResult)
    myResult = mySolution.concatenatedBinary(3)
    print(myResult)
    myResult = mySolution.concatenatedBinary(12)
    print(myResult)

main()