class TimeMap:

    def __init__(self):
        self.valueDict = dict()
        

    def set(self, key: str, value: str, timestamp: int) -> None:
        if key in self.valueDict:
            self.valueDict[key].append((timestamp, value))
        else:
            self.valueDict[key] = [(timestamp, value)]
        

    def get(self, key: str, timestamp: int) -> str:
        if (not key in self.valueDict):  return ""
        valueList = self.valueDict[key]
        maxEqualIndex = self.binaryFindMaxEqual(valueList, timestamp)
        if (maxEqualIndex == -1):       return ""
        else:                           return valueList[maxEqualIndex][1]
    
    def binaryFindMaxEqual(self, valueList, timeStamp):
        low = 0
        high = len(valueList) - 1
        currentMax = -1
        while (high >= low):
            mid = (low + high) // 2
            valueTimestamp = valueList[mid][0]
            if valueTimestamp <= timeStamp:
                currentMax = max(currentMax, mid)
                low = mid + 1
            elif (valueTimestamp > timeStamp):
                high = mid - 1
        return currentMax

def main():
    myTimeMap = TimeMap()
    myTimeMap.set("a", "hello", 1)
    myResult = myTimeMap.get('a', 1)
    assert myResult == "hello"
    myResult = myTimeMap.get('a', 0)
    assert myResult == ""
    myResult = myTimeMap.get('a', 2)
    assert myResult == "hello"
    print("All tests passed")

main()
        


# Your TimeMap object will be instantiated and called as such:
# obj = TimeMap()
# obj.set(key,value,timestamp)
# param_2 = obj.get(key,timestamp)

'''
Data range/assumptions:
Non-empty key/valid key
Large number of calls
Timestamps always increasing
'''

'''
Important test cases:
Large number of calls
Large number of conflicts (i.e. same key different timestamps)
Empty value
Empty key?
Same timestamp different value?
'''

'''
Plain language ideas:

Naive:
    Dictionary with list of (value, timestamp)

Better:
    List has to be ordered in some way
    By timeStamp
    Automatically actually?
        Since timestamps always getting bigger
    Then can binary search by timestamp to find

    Set: time complexity:
        Dictionary lookup O(1)
        list.append: O(1)
    
    Get: time complexity:
        Dictionary lookup O(1)
        Binary search on list: log(n)

Alternate: dictionary of dictionaries?
    key, dictionary
        timestamp, value
    Don't think possible with the requirement to return any timestamp less than
        Since unordered

Not just return timestamp ==
    So we need list internally
    And then can do a binary search max or equal

Improvement:
    Constant time lookup data structure with time stamps in it
    But can one do constant time lookup of an interval?
        No, potentially k lookups for [0, k] where k = timestamp
    Can't do it in a data structure of individual elements
    But what about one of ranges?
        pass
    But ranges can devolve to individual elements in the worst case
        Would still seem to be a binary search problem
'''