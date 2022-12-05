class Solution:
    def pushDominoes(self, dominoes: str) -> str:
        solutionCache = {}
        subProblems = []

        resultString = ""
        if (len(dominoes) <= 1):
            return dominoes

        leftEnd = '.'
        if (dominoes[0] != '.'):
            leftEnd = dominoes[0]
        count = 1

        for i in range(1, len(dominoes)):
            letter = dominoes[i]
            if (letter == 'L' or letter == 'R'):
                subProblems.append((leftEnd, letter, count - 1))
                leftEnd = letter
                count = 0
            count += 1

        if dominoes[-1] == '.':
            subProblems.append((leftEnd, '.', count - 2))

        # for problem in subProblems:
        #     print(problem)

        firstLetter = subProblems[0][0]
        firstEnd = subProblems[0][1]
        if firstLetter == "." and firstEnd == "L":
            firstLetter = ""
        resultString = firstLetter + self.solveTwoEndDomino(subProblems[0], solutionCache)
        
        for i in range(1, len(subProblems)):
            problem = subProblems[i]
            resultString += self.solveTwoEndDomino(problem, solutionCache)
        
        return resultString
    
    def solveTwoEndDomino(self, problem, solutionCache):
        if (problem in solutionCache):
            # print(self.solutionCache[problem])
            return solutionCache[problem]
        resultString = ""
        left = problem[0]
        right = problem[1]
        interiorLength = problem[2]

        if (left == '.' and right == '.' or \
            left == '.' and right == 'R' or \
            left == 'L' and right == '.' or \
            left == 'L' and right == 'R'):
            resultString = '.' * interiorLength + right
        else:
            if (left == right):
                resultString = right * (interiorLength + 1)
            elif (left == "R" and right == "."):
                resultString = "R" * (interiorLength + 1) 
            elif (left == '.' and right == 'L'):
                resultString = "L" * (interiorLength + 2)
            else:
                middle = ''
                if (interiorLength % 2 != 0):
                    middle = '.'
                resultString = "R" * (interiorLength // 2) + middle + "L" * (interiorLength // 2) + right


        solutionCache[problem] = resultString
        return resultString

def main():
    mySolution = Solution()
    dominoString = ".L.R...LR..L.." 
    # dominoString = "LL.R...LR..L.R" 
    # dominoString = "..."
    # dominoString = "."
    # dominoString = ".."
    # dominoString = ".L.R."
    # dominoString = ".R..L."
    # dominoString = "R."
    # dominoString = "R.R.L"
    dominoString = "R..L..R..LR.R.R....." 
    resultString = mySolution.pushDominoes(dominoString)
    print(resultString)

main()


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
    frontier: Frontier of dominoes that will move
    resolved: dominoes that can be affected
    while (frontier)
        for each domino in frontier:
            List domino affected in 1 cycle
                Domino can't have been previously affected
            If domino only affected by one, change
                Add to frontier if leaning
            Add moved dominoes to newFrontier
        frontier = newFrontier
    MORE


Different approach:
For each stationary domino, iterate out in both directions until find first directional one
    If single, take direction
    Else, stationary

Another approach:
    Leaning dominoes present hard boundaries
        Nothing can ever propogate through an already leaning boundary
    Collection of sub problems, defined as startIndex = leftMost leaner, endIndex rightMost leaner
        Reuse the right boundary in the next subproblem
    Caching solutions?
        l.....r -> no change
        l.....l -> all l
        r.....r -> all r
        r.....l -> length determines
            If even, no stander
            If odd, one stander, right in the middle
        Define key as leftEnd, rightEnd, length
    Do sub problems interact?
        No, they can't
    Exclude sub problems with length 2 (i.e. only endpoints)
    Accomodate for start and end of the dominoes that may be an endpoint despite having no leaner
'''