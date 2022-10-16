from collections import Counter

class Solution:
    def getLengthOfOptimalCompression(self, s: str, k: int, level=0) -> int:
        # print("Level ", level)
        print("Remaining k %d" % k)
        print("Starting string ", s)
        countDictionary = Counter()
        prevLetter = s[0]
        count = 1
        twoPrevRunLetter = None
        prevRunCount = None
        prevRunLetter = None
        potentialMins = []
        currentLetter = None
        i = None
        for i in range(1, len(s)):
            currentLetter = s[i]
            if (currentLetter != prevLetter):
                newMax = self.tempFunction(twoPrevRunLetter, k, prevRunCount, prevLetter, i, count, s)
                if (newMax):
                    potentialMins.append(newMax)
                twoPrevRunLetter = prevRunLetter
                prevRunCount = count
                prevRunLetter = prevLetter
                countDictionary[count] += 1
                count = 0
            count += 1
            prevLetter = currentLetter
        countDictionary[count] += 1
        newMax = self.endTempFunction(twoPrevRunLetter, k, prevRunCount, currentLetter, i, count, s)
        if (newMax):
            potentialMins.append(newMax)
        k = min(k, len(s))
        potentialKeys = [2,10,3,4,5,6,7,8,9]
        normalLastDigitOrder = [0,1,2,3,4,5,6,7,8,9]
        for num in normalLastDigitOrder:
            for i in range(1,9):
                potentialKeys.append(i * 10 + num)
        maxCount = max(countDictionary.keys())
        potentialKeys = [item for item in potentialKeys if item <= maxCount]
        while (k > 0):
            if 1 in countDictionary and countDictionary[1] > 0:
                k -= 1
                countDictionary[1] -= 1
                continue
            for num in potentialKeys:
                if countDictionary[num] > 0:
                    k -= 1
                    if (num in [2,0]):
                        countDictionary[num] -= 1
                        if num == 2:
                            countDictionary[1] += 1
                        else:
                            countDictionary[9] += 1
                    else:
                        countDictionary[num] -= 1
                        countDictionary[num - 1] += 1
                    break
        resultInt = 0
        for key in countDictionary:
            myCount = countDictionary[key]
            if myCount > 0:
                if key > 1:
                    resultInt += countDictionary[key] * (len(str(key)) + 1)
                else:
                    resultInt += countDictionary[key]
        potentialMins.append(resultInt)
        return min(potentialMins)
    
    def tempFunction(self, twoPrevRunLetter, k, prevRunCount, prevLetter, i, count, s):
        if (twoPrevRunLetter and k >= prevRunCount):
            if prevLetter == twoPrevRunLetter:
                return self.getLengthOfOptimalCompression(s[0:(i-1-count-prevRunCount + 1)] + s[i - 1 - count + 1:], k - prevRunCount)
        return None

    def endTempFunction(self, twoPrevRunLetter, k, prevRunCount, prevLetter, i, count, s):
        if (twoPrevRunLetter and k >= prevRunCount):
            if prevLetter == twoPrevRunLetter:
                print("ENDER")
                return self.getLengthOfOptimalCompression(s[0:(i-count-prevRunCount + 1)] + s[i -  count + 1:], k - prevRunCount)
        return None

def main():
    mySol = Solution()
    # myString = "aaabcccd"
    # deleteNum = 2
    # resultLength = mySol.getLengthOfOptimalCompression(myString, deleteNum)
    # print(resultLength)
    # assert resultLength == 4
    # myString = "aaaaaaaaaaa"
    # deleteNum = 0
    # resultLength = mySol.getLengthOfOptimalCompression(myString, deleteNum)
    # print(resultLength)
    # assert resultLength == 3
    # myString = "aabbaa"
    # deleteNum = 2
    # resultLength = mySol.getLengthOfOptimalCompression(myString, deleteNum)
    # print(resultLength)
    # assert resultLength == 2
    # myString = "abc"
    # deleteNum = 0
    # resultLength = mySol.getLengthOfOptimalCompression(myString, deleteNum)
    # print(resultLength)
    # assert resultLength == 3
    # myString = "aabaabbcbbbaccc"
    # deleteNum = 6
    # resultLength = mySol.getLengthOfOptimalCompression(myString, deleteNum)
    # print(resultLength)
    # assert resultLength == 4
    myString = "cacbbacadb"
    deleteNum = 7
    resultLength = mySol.getLengthOfOptimalCompression(myString, deleteNum)
    print(resultLength)
    assert resultLength == 2

main()

'''
Data range/assumptions:
Non-empty
Medium length max
Delete can be as long as the string
Only lowercase letters
'''

'''
Test cases:
Single char string
DeleteNum as long as the string
    Return 0
Count loses a digit
All duplicates
k = 0
'''

'''
Ideas:
Naive:
    for i in range
        delete letter[i]
        for j in range(newString)
            delete letter[j]
            compress
            record minimum lengt
    
    That works for k = 2, not the general
    General: n ^ k, even before compression

Better:
    Two main cases:
    delete singletone ->    len - 1
    delete multiple
        if count=2  ->      len - 1
        if count=loses a digit      -> len - 1
            10, 100, 1000
    else: no change in len

    Singleton the safest bet
        If # singletons >= k, optimal = len - k
        Then count [2, 10, 100, 1000] next best
        Else, can't change it?
            WRONG
            Can change with multiple deletions
            So the next things to do (if we have more than 2 deletions left would be)
                All the goodDeletionsList + 1
                    Take 2 to make a change
                All the goodDeletionList + 2
                    Take 3 to make a change
                    Etc.
            AND, these deletions can cascade, so we need to update in the count dictionary?
                Since may want to delete the new number
                But as long as these heuristics mean we do it in the right order, it shouldn't be quadratic
    Complexity:
        Count: n
        Deletions:
            Worst case: all k complicated
                Search for best deletion
                    Worst case, 100 if all singletons
                    100k ~= 100n ~= n
                    Seems doable

Formal:
    singletonCount
    dictionary of letter runs by count?
        Won't change their place once we count them

Do we even need string compression?
String compression:
    travese string, counting
        when letter changes, if count > 1
            replace n + letter
    time complexity: n
    Seems reasonable, but would make naive n ^ (k + 1)

Approach passes 50 tests, but has major problem:
    Can't merge segments that have different letters between them
        E.g. aaabcaaa 
    Problem: b/c would be removed through normal single deletions
        Those always come after merging
    Solution:
        Do a single optimal step, and then recheck for optimal steps
        E.g. single deletion might be local best, but then recheck for merges, etc.
        Problem:
            That would require modification of countDictionary approach
                Since merges require knowledge of ordering of runs
                And their letters

Given length of string is only 100, could just make (runLength, runLetter) tuples for whole thing
    In order
    Can then assess merges by if run[i - 1] and run[i + 1] have same runLetter

Fundamental problem:
    My ordering approach breaks down when have actions that reduce length by the same amount for the same k
    Since which is optimal? Can't choose
    Possibly solvable by recursive search choosing each optimally greedy action
    But not so sure
    And even aside from that, is it even the case that local greedy would work
        Have had problems where I've been skeptical of this but it has worked
        E.g. aabbaad, k = 2
            This would work currently, but only because we prioritize trying run merges
            Local greedy would take d, then not be able to remove double b for big savings
            Merges are always better though?
                Since have savings of merge, but also savings from removing the middle run itself
                Minimum of one for singleton
                Commonly two
                So maybe my approach would work, if I reran merge check each time
                    Could get a lot of recursive calls though when s large

Dynamic programming hint:
    Build up from base case?
    x, k=1
        0
    x, k = 0
        1
    xx, k = x, 0 + x, 1 = 1 + 0
        1
    xx, k = 0 = x, 0 + x, 0
        = 2         ("2x")
    xy, k = 1 = min(x, k = 1 + y, k = 0 OR y, k = 1 + x, k = 0
Works well for (count, letter)
And can even work to choose between (count, letter1) (count, letter2)
    With no other conditions (e.g. merges), can choose either
special case 100 of a kind?
But how does it deal with merges?

Merge cost benefit:
    normal benefit for the middle + merge benefit
    merge benefit:
        xxa + xxa always saves 2, excluding 100 special case
        xa + xxa always saves 1, excluding 100 special case
        xa + ya may save 1 if (x + y) < 10
        xa + a may save 1 if (x + 1) < 10
        a + a is a wash
Max savings for non-merge deletion
    Max of 1:
        For 2 -> 1,     1 -> 9,     and 10 -> 9

So if (normalBenefit + mergeBenefit >= 1):
    merge

THIS IS NOT DYNAMIC PROGRAMMING
Add one letter for dynamic programming?
Or find all the optimal one letter solutions?
    Then 2 letter
    Etc.
    Second sounds ugly

Hint: DP state = currentIndex, remainingK
    0, k
    1, k = 
'''