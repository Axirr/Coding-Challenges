class Solution:
    def pushDominoes(self, dominoes: str) -> str:
        pass


'''
Data range/assumptions
Non-empty
Large scale
'''

'''
Important test cases:
1 dominoes
RL
Different ranges, like one they gave
    .L.R...LR..L..
'''

'''
Naive:
    Try to propogate one out from each L or R domino
    If no interference, interior spots are locked, only need to follow exteriors?
    Deteremine "will be affected" indices first before changing anything
        If index only affected by one domino, make change
        Else, determine competing forces to determine proper change
More detailed second by second approach
    Frontier of dominoes that will move
    Dominoes that can be affected
    while (frontier)
        for each domino in frontier:
            List domino affected in 1 cycle
                Domino can't have been previously affected
            If domino only affected by one, change
                Add to frontier
            Add moved dominoes to newFrontier
        frontier = newFrontier
    MORE


Different approach:
For each stationary domino, iterate out in both directions until find first directional one
    If single, take direction
    Else, stationary
'''