class Solution:
    def findOriginalArray(self, changed):
        '''
        If odd
            Original
            Add to result
            Find instance of double
            Remove both original and double
        If no double in array -> not original
            Find instance of half, add to result
            Remove double and half
        If double in array
            Sort?
            Lowest must be original
            Count of doubles vs. original
                If equal, all are original
        Naive:
        Remove all odds and their doubles and put in orignals
        Remove all numbers that don't have a double, and their original
        For remaining numbers
        If number is a double, it can't have a double of its own
        Pair things together?
        Look for halves
                If no halves, then original
                For each original, remove a double
        Then just pair remainders, with lower going to orignal and upper being removed
        [1, 2] -> [1, 2, 2, 4]
            4 eliminated
            Others potentially valid
            1 definitely original, since no half
            So find its double and remove
            Then left with just [2], so know it's not original
        [1, 2, 4] -> [1,2,2,4,4,8]
            Remove 8
            1 to orignal, and remove it's half
            [2, 4, 4]
        '''
        resultList = []
        wasFound = True
        if (len(changed) % 2 != 0):
            return []

        while (wasFound and len(changed) >= 2):
            wasFound = False
            for num in changed:
                if (num % 2 == 1):
                    resultList.append(num)
                    wasFound = True
                    changed.remove(num)
                    try:
                        changed.remove(num * 2)
                    except ValueError:
                        return []
                    break

        wasFound = True
        while (wasFound and len(changed) >= 2):
            wasFound = False
            for num in changed:
                doubleNum = num * 2
                if (not doubleNum in changed):
                    wasFound = True
                    halfNum = num // 2
                    resultList.append(halfNum)
                    try:
                        changed.remove(halfNum)
                    except ValueError:
                        return []
                    changed.remove(num)
                    break

        changed.sort()
        while(len(changed) >= 2):
            num = changed[0]
            doubleNum = num * 2
            try:
                changed.remove(doubleNum)
                resultList.append(num)
            except ValueError:
                return []
            try:
                changed.remove(num)
            except ValueError:
                return []

        if (len(changed) > 0):
            return []

        return resultList
    
    #     usedIndices = []
    #     resultOriginal = []
    #     i = 0
    #     for i in range(len(changed))
    #         doubleFound = False
    #         num = changed[i]
    #         # if (num % 2 == 1):
    #         #     usedIndices += [i]
    #         #     resultOriginal += [num]
    #         # else:
    #         doubleNum = num * 2
    #         doubleFound = False
    #         for j in range(len(changed)):
    #             if (j == i):    continue
    #             num = changed[j]
    #             if (doubleNum == num and j not in usedIndices):
    #                 usedIndices += [i, j]
    #                 resultOriginal += [num]
    #                 doubleFound = True
    #                 break
    #         if (not doubleFound):
    #             # Find a valid original
    #             # Put that in resultOriginal
    #             # Mark indices i and valid original as used
    #             half = num // 2
                
    #         i += 1
    #     for i in range(len(changed)):
    #         if (i not in usedIndices):
    #             num = changed[i]
    #     return resultOriginal
    
    # def findIndex(myList, value, usedIndices) :
    #     result = -1
        
    #     return result

def main():
    mySolution = Solution()
    myList = [2,1]
    assert [1] == mySolution.findOriginalArray(myList)
    print("[2, 1] passed.")
    myList = [2,1,6,12]
    assert [1,6] == mySolution.findOriginalArray(myList)
    print("[2,1,6,12] passed.")
    myList = [2,1,6,12,1,6,2,12]
    solutionList = sorted(mySolution.findOriginalArray(myList))
    assert [1,1,6,6] == solutionList
    print("[2,1,6,12,1,6,2,12] passed.")
    myList = [2, 4, 4, 4, 8, 8]
    solutionList = sorted(mySolution.findOriginalArray(myList))
    assert [2, 4, 4] == solutionList
    print("[2, 4, 4, 4, 8, 8] passed")
    myList = [6, 3, 0, 1]
    solutionList = sorted(mySolution.findOriginalArray(myList))
    assert [] == solutionList
    print("[6,3,0,1] passed.")
    myList = [0,0,0,0]
    solutionList = sorted(mySolution.findOriginalArray(myList))
    assert [0,0] == solutionList
    print("[0,0,0,0] passed.")
    myList = [19432,47200,5651,18136,3130,35588,14947,47380,40219,28932,44486,18110,26558,45476,85988,37859,51306,78912,4783,22374,21642,67574,276,43498,32572,16033,79698,27665,3762,16074,30992,25632,13106,30000,19256,11992,4183,644,70128,91980,50472,83142,42312,26945,65348,38707,1302,98256,46699,12748,45734,73628,76048,48578,37112,29789,5624,6441,28508,87524,23529,48468,98092,35151,29870,48984,8140,94658,64420,53178,86142,55346,73254,43543,43916,40684,46615,8518,38443,31230,28858,701,44612,33743,21004,17019,38464,8780,25574,28973,30319,38336,49970,87464,6492,87982,95170,39331,28098,24508,4971,47633,75634,40552,12726,44765,80102,1424,11819,12462,30228,14356,40940,48780,32073,31408,96554,90482,96354,2246,4684,22655,11308,72308,45798,7217,11195,61726,29315,40320,11457,45289,4603,2813,70250,45060,45916,21757,47720,1959,27312,48882,47196,45106,43941,25636,39024,81872,26202,58622,93668,25132,41056,14476,46076,26271,2274,7428,57384,60752,3584,64448,19760,1661,53440,15009,19098,3038,33450,37700,3313,3179]
    print(len(myList))
    solutionList = sorted(mySolution.findOriginalArray(myList))
    print(solutionList)


main()