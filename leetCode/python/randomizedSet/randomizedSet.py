import random

class RandomizedSet:

    def __init__(self):
        self.indexDict = dict()
        self.myList = []
        random.seed()
        

    def insert(self, val: int) -> bool:
        isFound = val in self.indexDict
        if not isFound:
            self.myList.append(val)
            self.indexDict[val] = len(self.myList) - 1
        return not isFound
        

    def remove(self, val: int) -> bool:
        try:
            listIndex = self.indexDict[val]
            del self.indexDict[val]
            lastElement = self.myList[-1]
            if lastElement in self.indexDict:
                self.indexDict[lastElement] = listIndex
            self.myList[listIndex] = self.myList[-1]
            self.myList.pop()
            return True
        except KeyError:
            return False
        

    def getRandom(self) -> int:
        targetIndex = random.randint(0, len(self.myList) - 1)
        return self.myList[targetIndex]

def main():
    mySet = RandomizedSet()
    print(mySet.insert(0))
    print(mySet.insert(1))
    print(mySet.remove(0))
    print(mySet.insert(2))
    print(mySet.remove(1))
    print(mySet.indexDict)
    print(mySet.myList)
    print(mySet.insert(1))
    # print(mySet.insert(1))
    # print(mySet.insert(1))
    # print(mySet.remove(2))
    # print(mySet.insert(2))
    # print(mySet.remove(2))
     ## print(mySet.insert(0))
    # print(mySet.getRandom())
        
main()

'''
Data ranges/assumptions:
Values can be large
Large number of calls
'''

'''
Tests:
Ensure random
Remove item not in set
Remove item in set
Insert item in set
Insert item not in set
'''

'''
Ideas:
Get random is the hardest part

Naive:
    Random number in range
    Iterate until get there

    O(n)
        Not great

Better:
    If had indexable container then could index to random index in O(1)
    But then insert and remove would be more difficult
    Solution: have both
'''