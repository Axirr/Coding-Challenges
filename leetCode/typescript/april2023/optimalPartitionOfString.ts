import myAssert from "../march2023/Trie";

function partitionString(s: string):number {
    let allowedRunningSum:number[] = [];
    for (let i = 0; i < 26; i++) {
        allowedRunningSum.push(0);
    }

    let workingRunningSum:number[] = {...allowedRunningSum};
    let count:number = 1;
    let i = 0;

    while (i < s.length) {
        let alphaIndex:number = s.charCodeAt(i) - 97;
        if (workingRunningSum[alphaIndex] > allowedRunningSum[alphaIndex]) {
            count++;
            allowedRunningSum = {...workingRunningSum};
        } else {
            workingRunningSum[alphaIndex] += 1;
            i++;
        }
    }

    return count;
}

function hasDupsAtIndex(index:number, startIndex:number, runningSumsForLetters:number[][]):boolean {
    if (index === startIndex) return false;

    for (const array of runningSumsForLetters) {
        let beforeCount:number = array[startIndex];
        let currentCount:number = array[index];
        if ((currentCount - beforeCount) > 1) {
            return true;
        }
    }

    return false;
}


function recursiveBinarySearchAnswer(s:string, runningSumsForLetters:number[][], startIndex:number):number {
    if (startIndex >= s.length)  return 0;
    if (startIndex === s.length - 1) return 1;

    let low:number = startIndex;
    let high:number = s.length;
    let middle:number = Math.floor((low + high) / 2);
    let maxValid:number = -1;

    while (low <= high) {
        middle = Math.floor((low + high) / 2);
        let hasDups:boolean = hasDupsAtIndex(middle, startIndex, runningSumsForLetters);
        if (hasDups) {
            high = middle - 1;
        } else {
            maxValid = middle;
            low = middle + 1;
        }
    }

    if (maxValid === s.length)  return 1
    return 1 + recursiveBinarySearchAnswer(s, runningSumsForLetters, maxValid);
}


function slowPartitionString(s: string):number {
    let countDictionary:Map<string, number> = new Map();
    let duplicateCount:number = 0;
    for (let i = 0; i < s.length; i++)  {
        let letter:string = s[i];
        if (!countDictionary.has(letter))  countDictionary.set(letter, 1);
        else {
            let currentCount:number = countDictionary.get(letter)!;
            if (currentCount === 1)  duplicateCount++;
            countDictionary.set(letter, currentCount + 1);
        }
    }

    if (duplicateCount === 0)  return 1;
    return recursivePartition(s, countDictionary, duplicateCount, 0);
};

function recursivePartition(s: string, countDictionary:Map<string, number>, duplicateCount:number, finalIndex:number):number {
    if (finalIndex > s.length - 1)  return 0;
    let nextCountDictionary:Map<string, number> = new Map();

    let i:number;
    for (i = s.length - 1; i >= finalIndex; i--) {
        let currentLetter:string = s[i];
        let currentCount:number = countDictionary.get(currentLetter)!;
        let nextCount:number | undefined = nextCountDictionary.get(currentLetter);
        nextCountDictionary.set(currentLetter, (nextCount === undefined ? 0 : nextCount) + 1);
        countDictionary.set(currentLetter, currentCount - 1);
        if (currentCount === 2)  {
            duplicateCount--;
            if (duplicateCount === 0)  break;
        }
    }

    let newDuplicateCount:number = 0;
    for (const pair of nextCountDictionary) {
        if (pair[1] > 1) newDuplicateCount++;
    }

    if (newDuplicateCount === 0) return 2;
    return 1 + recursivePartition(s, nextCountDictionary, newDuplicateCount, i + 1);
}

function mainPartitionString():void {
    let s:string;
    let minStrings:number;
    let doQuitIfFail:boolean = false;

    s = "cuieokbs";
    minStrings = partitionString(s);
    console.log(`Final result ${minStrings}`);
    myAssert(minStrings === 1, doQuitIfFail);

    s = "abacaba";
    minStrings = partitionString(s);
    console.log(`Final result ${minStrings}`);
    myAssert(minStrings === 4, doQuitIfFail);

    s = "ssssss";
    minStrings = partitionString(s);
    console.log(`Final result ${minStrings}`);
    myAssert(minStrings === 6, doQuitIfFail);
}

mainPartitionString();

/*
Data range/assumptions:
s length n: [1, 10^5]
lowercase letters only
*/

/*
Tests:
n = 1
n = max
no duplicates
all duplicates
greedy combine all until doesn't work is sub optimal
*/

/*
Ideas:

Naive:
    Try all combinations?
    I.e. split at each index, then run recursively to get the minimum for each half

Better:
    Finding two same letters indicates that there has to be a partition in range between them
    Could try combos in there, but only marginally improves
        And likely not in worst case

Expand valid base cases:
    Each letter, valid
    Try and combine them until not valid?

Sliding validity window, starting length = 1
    D[i:j] = D[i] + D[j]
        - 1 if they can be validly combined

Count dictionary for whole thing, then reduce until one half only has counts <= 1
Then do again on next half
    Modifying original count dictionary with reduction of count dictionary from the final other half
Would maybe get good to have a class with a value >= 2 counter

Solution works but is too slow
Something like binary search instead of traversal?
    But would have to count up, so doesn't work

Running sum for each letter
Then add these all up
Could do binary search on something like that?
Memory intensive, but not so crazy
    ~ 26 * 10 ^ 5 worst case
*/

/*
Completion time (minutes): 114
Problem difficulty: medium
How did it go (0 - 6): 2
Describe:
    Spent a fair amount of time on a n^2 solution that was obviosuly going to fail
    And then next solution had some hard debugging
        Poor understanding of required behaviour for for edge case indices
    Don't use debugger for typescript, which slowed down debugging
*/