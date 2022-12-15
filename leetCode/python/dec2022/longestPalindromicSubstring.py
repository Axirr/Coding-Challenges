class Solution:
    def longestPalindrome(self, s: str) -> str:
        n = len(s)
        if n % 2 == 1:
            low = 0
            high = n - 1
            isPlaindrome = True
            while (low < high):
                if s[low] != s[high]:
                    isPlaindrome = False
                    break
                low += 1
                high -= 1
            if isPlaindrome:  return s
        bestForIndex = {}
        currentLongest = s[0]
        for i in range(n-1):
            # if i == n // 2:
            #     bestForIndex[i] = s[i]
            if s[i+1] == s[i]:
                bestForIndex[i] = s[i:i+2]
                currentLongest = bestForIndex[i]
                bestForIndex[-i] = s[i]
            else:
                bestForIndex[i] = s[i]
        bestForIndex[n-1] = s[n-1]
        doBreak = False
        for windowSize in range(2, n + 1):
            if doBreak:  break
            minAllowedI = 0 + windowSize - 1
            maxAllowedI = n - windowSize
            for i in range(minAllowedI, maxAllowedI + 1):
                if i in bestForIndex:
                    oldValue = bestForIndex[i]
                    if len(oldValue) % 2 == 1:
                        changeValue = (len(oldValue) // 2) + 1
                        newLeft = i - changeValue
                        newRight = i + changeValue
                    else:
                        changeValue = (len(oldValue) // 2)
                        newLeft = i - changeValue
                        newRight = i + changeValue + 1
                    if not newRight >= n and not newLeft < 0 and s[newLeft] == s[newRight]:
                        bestForIndex[i] = s[newLeft] + bestForIndex[i] + s[newRight]
                        if len(bestForIndex[i]) > len(currentLongest):
                            currentLongest = bestForIndex[i]
                    else:
                        del bestForIndex[i]
                if -i in bestForIndex:
                    oldValue = bestForIndex[-i]
                    if len(oldValue) % 2 == 1:
                        changeValue = (len(oldValue) // 2) + 1
                        newLeft = i - changeValue
                        newRight = i + changeValue
                    else:
                        changeValue = (len(oldValue) // 2)
                        newLeft = i - changeValue
                        newRight = i + changeValue + 1
                    if not newRight >= n and not newLeft < 0 and s[newLeft] == s[newRight]:
                        bestForIndex[-i] = s[newLeft] + bestForIndex[-i] + s[newRight]
                        if len(bestForIndex[-i]) > len(currentLongest):
                            currentLongest = bestForIndex[-i]
                    else:
                        del bestForIndex[-i]
        return currentLongest



def main():
    sol = Solution()
    s = "babad"
    longest = sol.longestPalindrome(s)
    print(longest)
    assert longest == "bab"
    s = "cbbd"
    longest = sol.longestPalindrome(s)
    print(longest)
    assert longest == "bb"
    s = "ccc"
    longest = sol.longestPalindrome(s)
    print(longest)
    assert longest == "ccc"
    s = "abb"
    longest = sol.longestPalindrome(s)
    print(longest)
    assert longest == "bb"
    s = "aacabdkacaa"
    longest = sol.longestPalindrome(s)
    print(longest)
    assert longest == "aca"
    s = "xaabacxcabaaxcabaax"
    longest = sol.longestPalindrome(s)
    print(longest)
    assert longest == "xaabacxcabaax"
    s = "azwdzwmwcqzgcobeeiphemqbjtxzwkhiqpbrprocbppbxrnsxnwgikiaqutwpftbiinlnpyqstkiqzbggcsdzzjbrkfmhgtnbujzszxsycmvipjtktpebaafycngqasbbhxaeawwmkjcziybxowkaibqnndcjbsoehtamhspnidjylyisiaewmypfyiqtwlmejkpzlieolfdjnxntonnzfgcqlcfpoxcwqctalwrgwhvqvtrpwemxhirpgizjffqgntsmvzldpjfijdncexbwtxnmbnoykxshkqbounzrewkpqjxocvaufnhunsmsazgibxedtopnccriwcfzeomsrrangufkjfzipkmwfbmkarnyyrgdsooosgqlkzvorrrsaveuoxjeajvbdpgxlcrtqomliphnlehgrzgwujogxteyulphhuhwyoyvcxqatfkboahfqhjgujcaapoyqtsdqfwnijlkknuralezqmcryvkankszmzpgqutojoyzsnyfwsyeqqzrlhzbc"
    longest = sol.longestPalindrome(s)
    print(longest)
    assert longest == "sooos"
    s = "iptmykvjanwiihepqhzupneckpzomgvzmyoybzfynybpfybngttozprjbupciuinpzryritfmyxyppxigitnemanreexcpwscvcwddnfjswgprabdggbgcillisyoskdodzlpbltefiz"
    longest = sol.longestPalindrome(s)
    print(longest)
    assert longest == "illi"


main()

'''
Data range/assumptions:
string length [1, 1000]
s values: alphanumeric
'''

'''
Tests:
single letter
1000 letter
odd len
even len
plaindrome not at front
'''

'''
Ideas:
Trying for a dynamic programming solution only

longest(i:j) = best[i] + j if j == last letter
Where do we start?
Back to forward?

Increase length repeatedly?
best[i] = best starting on i for len current  - 1
Time complexity: n^2
    Since n + n - 1 + n - 2 ...
    sum(n:0) = n (n + 1) / 2

Centered on i instead of starting on i?
    Since expanding by 1 on either side

What about non-centered ones
E.g. aa
Rounding down?

Keep furthest index out


Algorithm is right but implementation bad
Can't rely on key being deleted, unless do it manually
Can't rely



General firstIndex and lastIndex for given i
i is always len // 2
    If even, exact
    If odd, rounds down, which is correct

E.g. aba, center would be index 1 (len//2)
E.g. bb, center would be index 0 (len //2)


Indices to compare:
    Even is simpler case
        front and back are equidsistant from the center index
        E.g. 3 is center, ranges are 
            [3:3]
            [2:4] i.e. i - 1/ i + 1
            i - 2/ i + 2
            i - 3/ i + 3
            General formula for change: (oldLen // 2) + 1
    Odd is harder:
        E.g. 'bb' is [3:4], 3 is "center"
            [3:4]
            [2:5] i - 1, i + 2
            [1:6] i - 2, i + 3
        right change value: oldLen//2
        left change value: oldLen//2 + 1
    Next ones would be 2 and 5
    distance from the center = length + 2 / 
'''