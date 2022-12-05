import math

class Solution:
    def isUgly(self, n: int) -> bool:
        if n <= 0:  return False

        allowedFactors = [2,3,5]

        for num in allowedFactors:
            while (n % num == 0):
                n = n // num
        
        # factor = 6
        # maxFactor = math.sqrt(n)
        # while (factor <= maxFactor):
        #     if (n % factor == 0):  return False
        #     factor += 2

        if n not in [1,2,3,5]:
            return False

        return True

def main():
    mySol = Solution()
    n = 14
    resultBool = mySol.isUgly(n)
    assert resultBool == False
    n = 6
    resultBool = mySol.isUgly(n)
    assert resultBool == True
    n = 8
    resultBool = mySol.isUgly(n)
    assert resultBool == True
    # n = 113
    # resultBool = mySol.isUgly(n)
    # assert resultBool == True
    n = 114
    resultBool = mySol.isUgly(n)
    n = -2147483648
    resultBool = mySol.isUgly(n)
    assert resultBool == False
    n = 0
    resultBool = mySol.isUgly(n)
    assert resultBool == False
    n = 9
    resultBool = mySol.isUgly(n)
    assert resultBool == True
    n = 21
    resultBool = mySol.isUgly(n)
    assert resultBool == False


main()

'''
Ideas:

Naive:
From 2 to n//2, try all factors

Better:
    Change limit to reflect factors already tried

How to determine primes?
    Can't be even, other than 2
    Nor end in 5, other than 5
    1 3 7 9
'''