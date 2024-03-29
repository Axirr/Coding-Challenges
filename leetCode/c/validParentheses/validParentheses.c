#include <stdbool.h>
#include <stdio.h>

bool isValid(char * s);
bool isCloseBracket(char currentChar);
bool validCloseBracket(char currentChar, char closestOpen);
bool isOpenBracket(char currentChar);
void wrong();
/*
Data range and assumptions
Not 0 length
All characters are parentheses
String can be long
    17 bits can contain count of string characters
*/

/*
Test cases
Single unclosed e.g. (
Closed with wrong bracket type e.g. (]
Long and all the same type, to test overflow counter
Right number, wrong order e.g. ([)]
All open
Single closing bracket
*/

/*
Plain language
When find opening bracket, start internal count of openers and closers
    When find closing, count must be evenly resolved
If get to closing and not all zeroed out, return False
If get to end and didn't find closing, return False
Return True if get to end without breaking

Recursive?
Nearest open bracket defines stack?
Keep track of length of counter when bracket opens?
If not same length, return False
Closer can only close if it's the current closest open
    E.g. ([ can only be closed by ], not (
Close = subtract
*/

/*
Simple test case runthrough
()
[0,0,0]
char = (
clostest = (
while loop passes
check not valid
    ( returns true
changeCounters returns [1,0,0]
char = )
closest
*/

void wrong() {
    printf("WRONG\n");
}

bool isValid(char * s) {
    bool verbose = false;
    char openArray[10001];
    int openIndex = 0;
    int stringIndex = 0;
    char currentChar = s[stringIndex];
    while (currentChar != '\0') {
        // printf("%c", currentChar);
        if (isOpenBracket(currentChar)) {
            openArray[openIndex] = currentChar;
            openIndex += 1;
        } else {
            if (openIndex <= 0) {
                if (verbose) {  printf("open index too low");  }
                return false;
            }
            if (!validCloseBracket(currentChar, openArray[openIndex - 1])) { 
                if (verbose) {  printf("Not valid close bracket");  }
                return false;
            }
            openIndex -= 1;
        }

        stringIndex += 1;
        currentChar = s[stringIndex];
    }

    if (openIndex != 0) {
        return false;
    }

    return true;
}

bool validCloseBracket(char currentChar, char closestOpen) {
    if (currentChar == ')' && closestOpen == '(') {
        return true;
    }
    if (currentChar == ']' && closestOpen == '[') {
        return true;
    }
    if (currentChar == '}' && closestOpen == '{') {
        return true;
    }

    return false;
}

bool isOpenBracket(char currentChar) {
    if (currentChar == '(') {
        return true;
    } else if (currentChar == '[') {
        return true;
    } else if (currentChar == '{') {
        return true;
    }
    return false;
}

int main() {
    bool returnBool = isValid("()");
    if (!returnBool) {
        wrong();
        return 0;
    }
    returnBool = isValid(")");
    if (returnBool) {
        wrong();
        return 0;
    }
    returnBool = isValid("((");
    if (returnBool) {
        wrong();
        return 0;
    }
    returnBool = isValid("(]");
    if (returnBool) {
        wrong();
        return 0;
    }
    returnBool = isValid("()[]{}");
    if (!returnBool) {
        wrong();
        return 0;
    }
    
    printf("Correct\n");
    return 0;
}