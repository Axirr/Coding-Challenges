class StockSpanner:

    def __init__(self):
        self.priceHistory = []
        self.runningMax = None
        self.runningMaxCount = 0
        self.maxInRangeList = []
        self.numsInRange = 131
        

    def next(self, price: int) -> int:
        self.priceHistory.append(price)
        self.runningMaxCount += 1
        if (not self.runningMax):
            self.runningMax = price
        else:
            self.runningMax = max(self.runningMax, price)
        if self.runningMaxCount >= self.numsInRange:
            self.maxInRangeList.append(self.runningMax)
            self.runningMax = None
            self.runningMaxCount = 0
        i = len(self.priceHistory) - 1
        count = 0
        foundBreak = False
        while (i >= 0):
            if not foundBreak and i % self.numsInRange == 0 and i != 0:
                # j = len(self.maxInRangeList) - 1
                j = (i // self.numsInRange) - 1
                while (j >= 0):
                    # if self.maxInRangeList[j] > price and (i - self.numsInRange) >= 0:
                    if self.maxInRangeList[j] > price:
                        foundBreak = True
                        break
                        # i -= 1
                    else:
                        count += self.numsInRange
                        i -= self.numsInRange
                    j -= 1
                continue
            if self.priceHistory[i] <= price:
                count += 1
            else:  break
            i -= 1
        return count

def main():
    myStock = StockSpanner()
    # for numList in [[11],[14],[16],[19],[30],[37],[48],[59],[64],[90],[94],[95],[96],[97],[100]]:
    #     print(myStock.next(numList))
    print(myStock.next(100))
    print(myStock.next(80))
    print(myStock.next(60))
    print(myStock.next(70))
    print(myStock.next(60))
    print(myStock.next(75))
    print(myStock.next(85))

main()

        
# Your StockSpanner object will be instantiated and called as such:
# obj = StockSpanner()
# param_1 = obj.next(price)

'''
Data range/assumptions:
Large number of calls
'''

'''
Tests:
First next call
Max number of calls
'''

'''
Ideas:
    Iterate backwards to count each time
    Too slow

Better:
    Cache value for previous counts
    If find less than value, that's the minimum count going back
    If gind greater than value, that's the maximum count going back

    Problem: they're at different points, so their range is counting different numbers
        But we're counting as well, can we use that
    
    If less than us, we can skip those indices and include them in our count
    That's an easy speedup
    Worst case: uniformly ascending list
        Each element has to go all the way back
    
    Max ranges?
        If max over a range isn't greater than our number, can automatically include in our count
        If it is, we know we break in that section
'''