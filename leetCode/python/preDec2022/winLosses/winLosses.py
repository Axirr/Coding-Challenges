from typing import List
from collections import Counter

class Solution:
    def findWinners(self, matches: List[List[int]]) -> List[List[int]]:
        counter = Counter()
        for match in matches:
            winner = match[0]
            loser = match[1]
            counter[winner] += 1
            # if not -winner in counter:
            #     counter[-winner] = 0
            counter[-loser] += 1
        noLosses = []
        oneWin = []
        for playerId in counter:
            print(playerId, end =" ")
            print(counter[playerId])
            if playerId < 0:
                if counter[playerId] == 1:
                    oneWin.append(-playerId)
            else:
                if -playerId not in counter:
                    noLosses.append(playerId)
        noLosses.sort()
        oneWin.sort()
        return [noLosses, oneWin]

def main():
    mySol = Solution()
    matches = [[1,3],[2,3],[3,6],[5,6],[5,7],[4,5],[4,8],[4,9],[10,4],[10,9]]
    resultList = mySol.findWinners(matches)
    print(resultList)
    matches = [[2,3],[1,3],[5,4],[6,4]]
    resultList = mySol.findWinners(matches)
    print(resultList)

main()

'''
Data range/assumptions:
Non-empty to large
'''

'''
Tests:
Single match
Large number matches
No winner matches
No 1 win matches
'''

'''
Ideas:

Naive:
    Traverse list, looking at both numbers:
        Counting wins for positive number
        Losses for negative number
    For number in counter:
        If losses = 0, add to resultList
        If wins = 1, add to resultList
    
    Time complexity:
        Count is 2n
        Counter traversal is worst case 2n
'''