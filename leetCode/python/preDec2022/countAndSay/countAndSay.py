class Solution:
    def countAndSay(self, n: int) -> str:
        if (n == 1):
            return "1"
        return self.convertToSay(self.countAndSay(n - 1))
    
    def convertToSay(self, countSayString):
        prevLetter = countSayString[0]
        count = 1
        resultString = ""
        for i in range(1, len(countSayString)):
            currentLetter = countSayString[i]
            if (currentLetter == prevLetter):
                count += 1
            else:
                resultString += str(count)
                resultString += prevLetter
                count = 1
            prevLetter = currentLetter
        resultString += str(count)
        resultString += prevLetter
        return resultString

def main():
    mySol = Solution()
    stringResult = mySol.countAndSay(4)
    print(stringResult)

main()

'''
Data range/assumptions:
Base case 1 is lowest
N only goes up to 30
'''

'''
Important test cases:
1
30?
'''

'''
Naive:
    From 1 to n, build sequences?
'''