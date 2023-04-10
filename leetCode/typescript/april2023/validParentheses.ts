import myAssert from "../march2023/Trie";

function isValid(s: string): boolean {
    let openStack:string[] = [];
    let bracketMapping:Map<string,string> = new Map();
    bracketMapping.set('(', ')');
    bracketMapping.set('[', ']');
    bracketMapping.set('{', '}');

    let backwardsSet:Set<string> = new Set(bracketMapping.values());

    for (const letter of s) {
        if (bracketMapping.has(letter)) {
            openStack.push(letter);
        } else if (backwardsSet.has(letter)) {
            if (openStack.length === 0)  return false;
            if (letter !== bracketMapping.get(openStack.pop()!))  return false;
        }
    }

    return openStack.length === 0;
};

function mainIsValid():void {
    let s:string;
    let result:boolean;
    let doQuitIfAssertFails:boolean = true;

    s = "()";
    result = isValid(s);
    console.log(`Final result ${result}`);
    myAssert(result, doQuitIfAssertFails);

    s = "()[]{}";
    result = isValid(s);
    console.log(`Final result ${result}`);
    myAssert(result, doQuitIfAssertFails);

    s = "(]";
    result = isValid(s);
    console.log(`Final result ${result}`);
    myAssert(!result, doQuitIfAssertFails);
}

mainIsValid();

/*
Data range/assumptions:
s length n: [1, 10^4]
Can be ()[]{}
*/

/*
Tests:
n = 1
n = 10^4
mix of types
mix of types where one closes a different kind but still invalid
*/

/*
Ideas:

Naive:
    Stack for each type of parentheses
    If close fund and corresponding stack empty, invalid
    If get to end and all stacks not empty, invalid
    Else valid

Idea doesn't work because closing needs to happen to the last open bracket
One universal stack
*/

/*
Completion time (minutes):
Question difficulty:
How did it go (0 - 6):
*/