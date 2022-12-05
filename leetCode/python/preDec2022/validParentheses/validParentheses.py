class Solution:
    def isValid(self, s: str) -> bool:
        openBrackets = ['(', '[', '{']
        openBracketsStack = []
        
        for letter in s:
            if letter in openBrackets:
                openBracketsStack.append(letter)
            else:
                if (len(openBracketsStack) == 0 or not self.isValidClosedBracket(letter, openBracketsStack[-1])):
                    return False
                else:
                    openBracketsStack.pop()
        
        if len(openBracketsStack) > 0:
            return False
        
        return True
    
    def isValidClosedBracket(self, letter, openBracket):
        if (letter == ")" and openBracket == "(") or \
        (letter == ']' and openBracket == '[') or \
        (letter == '}' and openBracket == '{'):
            return True
        return False