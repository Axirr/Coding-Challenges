from typing import List
from copy import copy

class Solution:
    def possibleBipartition(self, n: int, dislikes: List[List[int]]) -> bool:
        copyDislikes = copy(dislikes)
        copyDislikes.sort(key=lambda myTup: myTup[1])
        exclusiveSet = dict()
        for i in range(1, n+1):
            exclusiveSet[i] = set()
        for i in range(n, 0, -1):
            while len(dislikes) > 0:
                if dislikes[-1][1] == i:
                    myDislike = dislikes.pop()
                    a = myDislike[0]
                    b = myDislike[1]
                    exclusiveSet[a].add(b)
                    exclusiveSet[b].add(a)
                    continue
                break
            # while len(copyDislikes) > 0:
            #     if copyDislikes[-1][1] == i:
            #         myDislike = copyDislikes.pop()
            #         a = myDislike[0]
            #         b = myDislike[1]
            #         exclusiveSet[a].add(b)
            #         exclusiveSet[b].add(a)
            #         continue
            #     break
            pass
            mySet = exclusiveSet[i]
            for num in mySet:
                if num in exclusiveSet:
                    if len(exclusiveSet[num].intersection(mySet)) > 0:  return False
            exclusiveSet[i] = mySet
            # if len(dislikes) == 0 or len(copyDislikes) == 0:  break
        return True

    def slowRecursive(self, n: int, dislikes: List[List[int]]) -> bool: 
        set1 = set()
        set2 = set()
        return self.recursiveHelper(n, dislikes, set1, set2)

    def recursiveHelper(self, n, dislikes, set1, set2):
        if len(dislikes) == 0: return True
        dis = dislikes.pop()
        a = dis[0]
        b = dis[1]
        if a in set1 and b in set1:
            return False
        if a in set2 and b in set2:
            return False
        if a in set1:
            # set2.add(a)
            set2.add(b)
            return self.recursiveHelper(n, dislikes, set1, set2)
        elif a in set2:
            # set1.add(a)
            set1.add(b)
            return self.recursiveHelper(n, dislikes, set1, set2)
        elif b in set1:
            # set2.add(b)
            set2.add(a)
            return self.recursiveHelper(n, dislikes, set1, set2)
        elif b in set2:
            # set1.add(b)
            set1.add(a)
            return self.recursiveHelper(n, dislikes, set1, set2)
        else:
            copySet1 = copy(set1)
            copySet2 = copy(set2)
            copyDislikes = copy(dislikes)
            copySet1.add(a)
            copySet2.add(b)
            isPossible = self.recursiveHelper(n, copyDislikes, copySet1, copySet2)
            if isPossible:  return True
            copySet1 = copy(set1)
            copySet2 = copy(set2)
            copyDislikes = copy(dislikes)
            copySet1.add(b)
            copySet2.add(a)
            return self.recursiveHelper(n, copyDislikes, copySet1, copySet2)

def main():
    sol = Solution()
    # n = 4
    # dislikes = [[1,2],[1,3],[2,4]]
    # isPossible = sol.possibleBipartition(n, dislikes)
    # print(isPossible)
    # assert isPossible
    # n = 3
    # dislikes = [[1,2],[1,3],[2,3]]
    # isPossible = sol.possibleBipartition(n, dislikes)
    # print(isPossible)
    # assert not isPossible
    n = 5
    dislikes = [[1,2],[2,3],[3,4],[4,5],[1,5]]
    isPossible = sol.possibleBipartition(n, dislikes)
    print(isPossible)
    # assert not isPossible

main()

'''
Data range/assumptions:
n: [1, 2000]
dislikes k: [0, 10^4]
    Each entry len 2
First number in dislike < than second
'''

'''
Tests:
n 1, k 1
n large, k 1
Long n
Long k
Impossible by one
Impossible by a lot
Repeat dislikes?
'''

'''
Ideas:

Naive:
    Two lists (need to be ordered)
    For each restriction, check if can validly go in either set
        If not, return False
        If needs reverse, reverse
            But might have to reverse multiple

Has to be some chain to make impossible
    E.g. simple case, [1, 2], [2, 3] [1, 3]
        1 in notTwo set
        3 in two set
        3 in notTwoSet
    But can chain further

Don't put restrictions into sets until get number in two restrictions?

Define sets not by inclusion, but by restriction?
    Same problem: which set has the restriction

Not just two sets, many sets, and then combine at the end
    E.g. simple case, [1, 2], [2, 3]
        Defines set [1, 3] and [2]
    If sets mutually exclusive, can be combined with no restrictions
    If not mutually exclusive, have to check

Dislikes ordered
If next start is greater than a, b of previous, can discard those sets, disjoint
    Helpful for efficiency but doesn't solve problem

Restrictions combinations that mandate
Dictionary
    Key: number
    Value: set of numbers can't be with
for each restriction
    For a, check if a set has b, else add b
    V.v. for b

Update every number that our number contains
    E.g. 1: 2, 2: 1
        [2, 4]
        2: 1, 4
        Then for 1, 1: 2, 4
    Would work, but would spiral

Free values: haven't been referenced
Work backwards through chain until come to free value?

Because of ordering, can we never get situation where previously unlinked become linked?
    E.g. 1,2   1,4   2, 4
    No

Copy and sort based on second
Then combine all [1, x] with [x, 1] to get full class
If not internally contradictory, can discard and move on to next?
'''