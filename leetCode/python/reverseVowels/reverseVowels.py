class Solution:
    def reverseVowels(self, s: str) -> str:
        left = -1
        right = len(s)
        vowelList = 'aeiouAEIOU'
        resultList = list(s)
        while (True):
            # move left until vowel or end
            oldLeft = left
            for i in range(left+1, right):
                currentLetter = s[i]
                if currentLetter in vowelList:
                    left = i
                    break
            if oldLeft == left:
                break

            # move right until vowel or start
            oldRight = right
            for i in range(right-1, left, -1):
                currentLetter = s[i]
                if currentLetter in vowelList:
                    right = i
                    break
            if oldRight == right:
                break

            if left < right:
                temp = resultList[left]
                resultList[left] = resultList[right]
                resultList[right] = temp
            else:
                break
        return ''.join(resultList)

def main():
    mySol = Solution()
    s = "hello"
    resultStr = mySol.reverseVowels(s)
    print(resultStr)

main()

'''
Data range/assumptions:
Long string
Non-empty
Printable ASCII?
    So both capital and lowercase vowels
'''

'''
Single character string
Long string with many vowels
No vowels
Single vowel
    Shouldn't change place
All vowels
Capital vowels
Mixed vowels
'''

'''
Ideas:

Two pointers to farthest vowels
    leftIndex = 0
    rightIndex = len(s) - 1
    while (true):
        # move left until vowel or end

        # move right until vowel or start

        if left < right:
            temp = str[left]
            str[left] = str[right]
            str[right] = temp
        else:
            break


'''