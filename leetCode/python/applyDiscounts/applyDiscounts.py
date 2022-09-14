class Solution:
    def discountPrices(self, sentence: str, discount: int) -> str:
        resultList = []
        floatDiscount = (1.0 - discount / 100.0)
        splitSentence = sentence.split(" ")
        for word in splitSentence:
            if (self.isValidPrice(word)):
                word = "$%.2f" % (int(word[1:]) * floatDiscount)
            resultList.append(word)
        resultString = " ".join(resultList)
        # resultString = resultString[0:-1]
        return resultString
    
    def isValidPrice(self, myStr):
        isValid = True
        if (len(myStr) <= 1):
            isValid = False
        elif (myStr[0] != "$"):
            isValid = False
        else:
            for letter in myStr[1:]:
                if (not letter.isdigit()):
                    isValid = False
                    break
        return isValid

def main():
    mySolution = Solution()
    inputChoice = 1
    if (inputChoice == 0):
        sentence = "there are $1 $2 and 5$ candies in the shop"
        discount = 50
    else:
        sentence = "1 2 $3 4 $5 $6 7 8$ $9 $10$"
        discount = 100        
    print(mySolution.discountPrices(sentence, discount), end='')

main()