from typing import List

class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        subCases = {}
        subCases[1] = ["()"]
        level = 2
        while level <= n:
            newSolutions = set()
            for subSolution in subCases[level - 1]:
                count = 0
                for i in range(len(subSolution) - 1):
                    if subSolution[i] == '(':
                        if count == 0:
                            for j in range(i+1, len(subSolution)):
                                if subSolution[j] == ')':
                                    newSolutions.add(subSolution[0:i] + "(" + subSolution[i:j+1] + ")" + subSolution[j+1:])
                                    break
                    elif subSolution[i] == ')':
                        count -= 1
                        if count == 0:
                            newSolutions.add("(" + subSolution[0:i+1] + ")" + subSolution[i+1:])
                    if subSolution[i] == '(':
                        count = 1
                newSolutions.add("()" + subSolution)
                newSolutions.add("(" + subSolution + ")")
            subCases[level] = list(newSolutions)
            level += 1
        # for i in range(1, n+1):
        #     print(subCases[i])
        # print()
        return subCases[n]

def main():
    sol = Solution()
    n = 1
    combos = sol.generateParenthesis(n)
    assert combos == ["()"]
    n = 3
    combos = sol.generateParenthesis(n)
    combos.sort()
    print(combos)
    correct = ["((()))","(()())","(())()","()(())","()()()"]
    correct.sort()
    # for item in combos:
    #     if item not in correct:
    #         print(item)
    # print()
    # for item in correct:
    #     if item not in combos:
    #         print(item)
    assert combos == correct
    n = 4
    combos = sol.generateParenthesis(n)
    combos.sort()
    print(combos)
    # print(len(combos))
    correct = ["(((())))","((()()))","((())())","((()))()","(()(()))","(()()())","(()())()","(())(())","(())()()","()((()))","()(()())","()(())()","()()(())","()()()()"]
    correct.sort()
    # print(correct)
    # print(len(correct))
    for item in correct:
        if item not in combos:
            print(item)
    assert combos == correct

main()

'''
Data range/assumptions:
Number of pairs of parentheses n: [1, 8]
'''

'''
Tests:
n = 1
n = 8
'''

'''
Ideas:

Naive:
    recursive bottom up
    Other than the first level, can either
        Enclose current
        Make another beside current

Dynamic programming:
    while n > 0:
        D[i] = (D[i-1]), D[i-1] + ()
    
    D[1] = ()

WRONG

Have to identify any complete pair of brackets and then can enclose those
    Plus add one to the front (or back) once?
'''