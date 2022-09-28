/*
Modified binary search ideas:

Build high exponentially from 1 until match or high >= len
    1   2   4   8   16  ...
    1   10  100 1000
    Initial stages give very little info unless there's a miss (and thus they are a high)
    Start at 8, at least gets something
        Many data sets may fall into this range, so average case could be good
    Accelerates much more quickly too
    Power of 2 is a good idea? Helps even splits?
Try decent low and mid, hoping to get a hit on either
    E.g.
Single low check then go BST
    Constant time cost
*/