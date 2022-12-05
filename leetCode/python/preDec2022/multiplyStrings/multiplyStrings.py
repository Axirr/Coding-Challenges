class Solution:
    def multiply(self, num1: str, num2: str) -> str:
        intNum1 = self.ownIntConversion(num1)
        intNum2 = self.ownIntConversion(num2)
        return str(intNum1 * intNum2)

    def ownIntConversion(self, numString: str) -> int:
        resultInt = 0
        strLen = len(numString)
        tenFactor = strLen - 1
        for i in range(strLen):
            letter = numString[i]
            digit = None
            # Lookup table
            if (letter == '0'):
                digit = 0
            elif (letter == '1'):
                digit = 1
            elif (letter == "2"):
                digit = 2
            elif (letter == "3"):
                digit = 3
            elif (letter == "4"):
                digit = 4
            elif (letter == "5"):
                digit = 5
            elif (letter == "6"):
                digit = 6
            elif (letter == "7"):
                digit = 7
            elif (letter == "8"):
                digit = 8
            elif (letter == "9"):
                digit = 9

            # Multiply by 10
            digit = digit * pow(10, tenFactor)

            # Add to resultInt
            resultInt += digit

            #Increment tenFactor
            tenFactor -= 1
        return resultInt

def main():
    mySolution = Solution()
    # strNum1 = "123"
    # strNum2 = "456"

    strNum1 = "2"
    strNum2 = "3"

    intNum1 = int(strNum1)
    intNum2 = int(strNum2)
    print("Own: ")
    print(mySolution.multiply(strNum1, strNum2))
    print("Actual: ")
    print(intNum1 * intNum2)

main()