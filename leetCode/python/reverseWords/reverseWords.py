class Solution:
    def reverseWords(self, s: str) -> str:
        wordList = [word for word in s.split(' ') if len(word) >= 1]
        wordList.reverse()
        print(wordList)
        return " ".join(wordList)

def main():
    mySol = Solution()
    myString = "the sky is blue" 
    resultString = mySol.reverseWords(myString)
    print(resultString)
    myString = "  hello world  "
    resultString = mySol.reverseWords(myString)
    print(resultString)
    myString = "a good   example"
    resultString = mySol.reverseWords(myString)
    print(resultString)

main()