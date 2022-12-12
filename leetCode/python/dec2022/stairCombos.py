class Solution:
    memo = {}
    def climbStairs(self, n: int) -> int:
        count = 0
        if n not in self.memo:
            if n == 1:
                count += 1
            elif n == 2:
                count += 2
            elif n > 2:
                count += self.climbStairs(n - 2) + self.climbStairs(n - 1)
                self.memo[n] = count
        else:
            count += self.memo[n]
        return count

def main():
    sol = Solution()
    n = 2
    combos = sol.climbStairs(n)
    print(combos)
    assert combos == 2
    n = 3
    combos = sol.climbStairs(n)
    print(combos)
    assert combos == 3
    n = 4
    combos = sol.climbStairs(n)
    print(combos)
    n = 5
    combos = sol.climbStairs(n)
    print(combos)
    n = 38
    combos = sol.climbStairs(n)
    print(combos)

main()

'''
Data range/assumptions:
n: [1, 45]
'''

'''
Tests:
1 step
45 steps
5 steps
'''

'''
Ideas:

Naive:
    Recursive
        count = 0
        If currentN == 0
        If currentN == 1
            count += 1
        If currentN > 1:
            count += 1 + climb(currentN - 1)
        If currentN >= 2
            count += 2 + climb(currentN - 2)

3 steps
1 1 1
2 1
4 steps:
1 1 1 1
2 1 1
2 2
1 1 2
5:
1 1 1 1 1
2 1 1 1
2 2 1
1 1 2 1
'''