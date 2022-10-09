class MyCalendarThree:

    def __init__(self):
        self.events = []
        self.maxK = 0
        

    def book(self, start: int, end: int) -> int:
        count = 1
        for event in self.events:
            eventStart = event[0]
            eventEnd = event[1]
            if ( (start >= eventStart and start <= eventEnd) or ((end - 1) <= eventEnd and (end - 1) >= eventStart)):
                count += 1
                event[2] += 1
        # Add event to event list
        if (count > self.maxK):      self.maxK = count
        self.events.append([start, end - 1, count])
        return self.maxK

def main():
    myCal = MyCalendarThree()
    resultK = myCal.book(10,20)
    print(resultK)
    assert resultK == 1
    resultK = myCal.book(50,60)
    print(resultK)
    assert resultK == 1
    resultK = myCal.book(10,40)
    print(resultK)
    resultK = myCal.book(5,15)
    print(resultK)
    resultK = myCal.book(5, 10)
    print(resultK)
    assert resultK == 3
    resultK = myCal.book(25, 55)
    print(resultK)


main()
        
'''
Manual example
events: [(10,20)]
newEvent 5,10
should be 2
5 <= 10 and 
'''

'''
Data range/assumptions
Need to deal with empty
400 bookings
Very large range start to end
'''

'''
Important test cases:
Adding to empty
Adding to non-empty but disjoint
Large number
Add same range event twice
Many events, all the same, large joint
Large joint, but not identical so set doesn't solve
'''

'''
Ideas:

Naive:
    Check every event against others?
    n!?
    Really bad

Better:
    Maintain possible joint list for each event?
    Go through them in order from most joints to least
        Can stop if we find a joint that is larger than the remaining joints
    So if added event joins with new event, max joint for that is all the things it joins?
        Wrong
        E.g. [1,5] joing with [3,7], could join with [6,7]
        Check the remainder too?
            I.e. the non-joint part?
            Union of [1,5] U [6,7] check with everything else?
    Not everthing joint with something will be joint with something it is joint with
    As per last example
    But it does limit the number of things we have to check
        Instead of all, only check joint ones
        If all joint, still devolves into n!/really bad?
            Use a set to eliminate duplicates
            But keep a count to indicate how many duplicates the set entry keeps track of
            Dictionary Counter
                Keys = set
    Now worst case is non-identical large join
    



Complexity of maintaining possible joint list
    When add, new event, we're calculating the joint anyways?
    Just keep the list of joints in addition to the count of joints?
        Only 400 possible bookings

Not just join, but fully enclose
    Means all joins of that one are automatically included, don't need to be checked
    Again, just a heuristic that could help the average case but not the worst case

How to not make the worst case terrible
    Worst case:
        All join
        Non-identical
        Non-fully enclosed

Am I overthinking this?
    With 400 calls, wouldn't it just be O(400n)
        Don't have to check everything against each other
        Just new-event against old events
            (newLow <= oldLow and newHigh >= oldLow) or (newLow <= oldHigh and newHigh >= oldHigh)
    The scope issues don't come from the single calls, it's the sum of all the calls
        1 + 2 + 3 ... + 400
        sigma(400) < 400^2, 160000, not crazy scale?

Naive version:
    Collection of all events
        List should be fine
    count = 1
    for event in events:
        if (above condition):   count += 1

Understanding was wrong:
    Not just about intersections with the newEvent
    Must all mutually intersect for it to be valid
    E.g. [1,5] [8,10] [4,9]
        insections both, but not at the same time

If maintain list off all that intersect
    Then check against that list
    But still need to check others
'''