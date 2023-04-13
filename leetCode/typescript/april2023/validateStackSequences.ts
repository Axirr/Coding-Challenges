import myAssert from "../march2023/Trie";

function validateStackSequences(pushed: number[], popped: number[]): boolean {
    let currentPushIndex:number = 0;
    let currentPopIndex:number = 0;
    let stack:number[] = [];

    while (currentPushIndex < pushed.length) {
        if (stack.length > 0 && stack[stack.length - 1] === popped[currentPopIndex]) {
            while (currentPopIndex < popped.length && stack[stack.length - 1] === popped[currentPopIndex]) {
                stack.pop();
                currentPopIndex++;
            }
        } else  {
            stack.push(pushed[currentPushIndex]);
            currentPushIndex++;
        }
    }

    // Empty remaining stack
    while (currentPopIndex < popped.length && stack[stack.length - 1] === popped[currentPopIndex]) {
        stack.pop();
        currentPopIndex++;
    }

    return currentPopIndex === popped.length && currentPushIndex === pushed.length;
};

function mainValidateStackSequences():void {
    let pushed:number[];
    let popped:number[];
    let isValid:boolean;
    let doQuitIfAssertFails:boolean = true;

    pushed = [1,2,3,4,5];
    popped = [4,5,3,2,1];
    isValid = validateStackSequences(pushed, popped);
    console.log(`Final result valid is ${isValid}`);
    myAssert(isValid, doQuitIfAssertFails);

    pushed = [1,2,3,4,5];
    popped = [4,3,5,1,2];
    isValid = validateStackSequences(pushed, popped);
    console.log(`Final result valid is ${isValid}`);
    myAssert(!isValid, doQuitIfAssertFails);
}

mainValidateStackSequences();

/*
Data range/assumptions:
length stacks n: [1, 1000]
popped is a permutation of pushed
values: [1, 1000]
    All unique
*/

/*
Tests:
n = 1
n = 1000
possible
not possible
not all pushes before first pop
*/

/*
Ideas:

Naive:
    Try pushes until first pop value found
    If reach the end, pop until empty or one is not what it should be
*/

/*
Completion time (minutes):
Question difficulty:
How did it go (0 - 6):
*/