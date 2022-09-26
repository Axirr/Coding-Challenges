class Solution:
    def equationsPossible(self, equations):
    # def equationsPossible(self, equations: List[str]) -> bool:
        freeVariables = set("abcdefghijklmnopqrstuvwxyz")
        existingVariables = set()
        equalitySets = []
        inequalityPairs = []
        for eqn in equations:
            var1 = eqn[0]
            var2 = eqn[3]
            isEqual = False
            if (eqn[1] == '='):
                isEqual = True
            if (isEqual):
                existingVariables.add(var1)
                existingVariables.add(var2)
                equalitySetIndex1 = -1
                equalitySetIndex2 = -1
                for i in range(len(equalitySets)):
                    checkSet = equalitySets[i]
                    if var1 in checkSet:
                        equalitySetIndex1 = i
                        break
                for i in range(len(equalitySets)):
                    checkSet = equalitySets[i]
                    if var2 in checkSet:
                        equalitySetIndex2 = i
                        break
                # eqSet1 = [i for (i, eqSet) in enumerate(equalitySets) if var1 in eqSet]
                # eqSet2 = [i for (i, eqSet) in enumerate(equalitySets) if var2 in eqSet]
                if (equalitySetIndex1 >= 0 and equalitySetIndex2 >= 0):
                    if (equalitySetIndex1 != equalitySetIndex2):
                        # equalitySets[equalitySetIndex1] = list(set(equalitySets[equalitySetIndex1] + equalitySets[equalitySetIndex2]))
                        equalitySets[equalitySetIndex1] = list(set(equalitySets[equalitySetIndex1] + equalitySets[equalitySetIndex2]))
                        equalitySets.pop(equalitySetIndex2)
                    else:
                        continue
                elif (equalitySetIndex1 >= 0):
                    equalitySets[equalitySetIndex1].append(var2)
                elif (equalitySetIndex2 >= 0):
                    equalitySets[equalitySetIndex2].append(var1)
                else:
                    equalitySets.append([var1, var2])

                if (var1 not in freeVariables or var2 not in freeVariables):
                    if (not self.isConditionsValid(equalitySets, inequalityPairs, existingVariables)):
                        return False
            else:
                if (var1 == var2):  return False

                freeVariables.discard(var1)
                freeVariables.discard(var2)

                pair = [var1, var2]
                pair.sort()
                if (pair not in inequalityPairs):
                    inequalityPairs.append(pair)
                    if (not self.isConditionsValid(equalitySets, inequalityPairs, existingVariables)):
                        return False
        
        return True
    
    def isConditionsValid(self, equalitySets, inequalityPairs, existingVariables):
        if (len(inequalityPairs) == 0):     return True
        for pair in inequalityPairs:
            letter1 = pair[0]
            letter2 = pair[1]
            if (letter1 in existingVariables and letter2 in existingVariables):
                eqSet1 = []
                eqSet2 = []
                for eqSet in equalitySets:
                    if letter1 in eqSet:
                        eqSet1 = eqSet
                        break
                for eqSet in equalitySets:
                    if letter2 in eqSet:
                        eqSet2 = eqSet
                        break
                # eqSet1 = [eqSet for eqSet in equalitySets if letter1 in eqSet][0]
                # eqSet2 = [eqSet for eqSet in equalitySets if letter2 in eqSet][0]
                if (eqSet1 == eqSet2):
                    return False

        return True

'''
Data range/assumptions:
Non-empty
Variables can be the same in a condition
Always == or !=
Lowercase letters
Could be up to 500 conditions
'''

'''
Test cases
Single condition
    Always true
Two incompatible conditions
All conditions work except first and last
Condition with the same variable
    Check if !=, in which case auto false
Chain of equalities, with last one breaking e.g. a = b = c = d,   a != d
Merge two sets non directly
    E.g. a = b, c = d, b = c
'''

'''
Plain language:
Broadstrokes:
    Record conditions, and check if new condition violates
    Can only violate if symbol already used
    Also check self violation
    Sets of values that are equivalent
    Inequality: a check that equality set doesn't contain two variables
        Do repeatedly each time we modify sets?
            Inefficent
Specific:
    Travese equations
    Determine = or !
    If =
        For each variable, find if exists in a set yet
        And find if it exists in an inequality
        0 sets
            Create new set with 2
            Check inequalities still valid if exists in inequalityList
        1 set
            Add no-set letter to set
            Check inequalities still valid if exists in inequalityList
        2 sets
            Merge sets
            Check inequalities still valid if exists in inequalityList
        If different sets, combine sets
        If no set, create a set
    If !=
        If in noRestrictions, remove
        Create a new pair to check
        Check this new pair against equality sets
            Don't have to check old pairs?
            Don't think so
        return if sets violated
'''

def main():
    mySolution = Solution()
    returnBool = mySolution.equationsPossible(["a==b"])
    assert returnBool
    returnBool = mySolution.equationsPossible(["a==b","b!=a"])
    assert not returnBool
    returnBool = mySolution.equationsPossible(["b==a","a==b"])
    assert returnBool
    returnBool = mySolution.equationsPossible(["a==b","e==c","b==c","a!=e"])
    assert not returnBool
    print("All passed.")


main()