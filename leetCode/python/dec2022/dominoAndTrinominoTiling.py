class Solution:
    cache = {}
    def numTilings(self, n: int) -> int:
        return self.helperNumTilings(n, False) % (10**9 + 7)

    def helperNumTilings(self, n: int, isPartiallyOccupied: bool) -> int:
        if (n, isPartiallyOccupied) in self.cache:
            return self.cache[(n, isPartiallyOccupied)]
        total = 0
        if n > 2:
            if not isPartiallyOccupied:
                # Sideways domino pair
                total += self.helperNumTilings(n-2, False)

                # Upright domino
                total += self.helperNumTilings(n-1, False)

                # Trinomino, top and bottom isPartiallyOccupied
                total += 2 * self.helperNumTilings(n-1, True)
            else:
                # Sideways domino
                total += self.helperNumTilings(n-1, True)
                # Complimentary trimino
                total += self.helperNumTilings(n-2, False)
        elif n == 2:
            if not isPartiallyOccupied:
                total += 2
            else:
                total += 1
        elif n == 1 and not isPartiallyOccupied:
            total += 1
        self.cache[(n, isPartiallyOccupied)] = total
        return total

def main():
    sol = Solution()
    n = 3
    combos = sol.numTilings(n)
    print(combos)
    assert combos == 5
    n = 1
    combos = sol.numTilings(n)
    print(combos)
    assert combos == 1
    n = 4
    combos = sol.numTilings(n)
    print(combos)
    assert combos == 11
    n = 30
    combos = sol.numTilings(n)
    print(combos)
    assert combos == 312342182

main()

'''
Data range/assumptions:
width of board (n): [1, 1000]
'''

'''
Tests:
n = 1
n = 1000
'''

'''
Ideas:

Naive:
    recursive
    n > 3, anything
    n = 2, flag matters
        0: no trinominos
        1: only 1 trinomino, in a certain orientation
        2: ditto
    n = 1, flag matters, vertical domino at most
        0: 1
        1: 0
        2: 0

Base cases:
    2 x 1: 1 way
    2 x 2: 2 ways
        Both all dominos but some sideways
    2 x 3:
        all dominos: 3
        All triminos: 2
        Total: 5

Triminos only valid if at least 3 width left?
    NOT TRUE, since may have singletons protruding from old pieces

Could try and deal with triminos as only working with even numbers
But even dominos have this intrusion issue

Better: have a flag indicating status of first column
    Is it first column or previous column?
    First column, and if not fully covered, must pass to next call
    Flag: [0,2]
        0 = free
        1 = bottom
        2 = top
'''