import myAssert from "../march2023/Trie";

function findNumberOfLIS(nums: number[]): number {
    let n:number = nums.length;
    let previousPathsFromIndex:number[] = [];
    let currentPathsFromIndex:number[] = [];
    // for (let i = 0; i < nums.length; i++) {
    //     previousPathsFromIndex.push(1);
    //     currentPathsFromIndex.push(0);
    // }
    previousPathsFromIndex.push(1);

    for (let i = n - 1; i >= 0; i--) {
        let seqEndElement:number = nums[i];
        let total:number = 0;
        let collectiveTotal:number = 0;
        for (let j = i + 1; j < n; j++) {
            let potentialNewEndElement:number = nums[j];
            if (potentialNewEndElement > seqEndElement)  total += previousPathsFromIndex[j];
        }


        previousPathsFromIndex[i] = total;
        previousPathsFromIndex = currentPathsFromIndex;
        currentPathsFromIndex = []
        if (collectiveTotal === 0)  break;
        currentPathsFromIndex
    }

    return previousPathsFromIndex[0];
}
function slowFindNumberOfLIS(nums: number[]): number {
    let n:number = nums.length;
    let previousIndexCounts:Map<number, number> = new Map();
    let currentIndexCounts:Map<number, number> = new Map();

    for (let i = 0; i < n; i++) {
        previousIndexCounts.set(i, 1);
    }

    let windowSize:number = 2;
    // let didFind:boolean = true;

    while (windowSize <= n) {
        for (const startSeqEndIndex of previousIndexCounts.keys()) {
            // didFind = false;
            let endSeqElement:number = nums[startSeqEndIndex];
            // console.log(`end index ${startSeqEndIndex}`)
            for (let j = startSeqEndIndex + 1; j < nums.length; j++) {
                let newElement:number = nums[j];
                // console.log(`new element ${newElement}`)
                if (newElement > endSeqElement) {
                    // didFind = true;
                    if (currentIndexCounts.has(j)) {
                        currentIndexCounts.set(j, currentIndexCounts.get(j)! + previousIndexCounts.get(startSeqEndIndex)!);
                        // currentIndexCounts.set(j, currentIndexCounts.get(j)! + 1);
                    } else {
                        currentIndexCounts.set(j, previousIndexCounts.get(startSeqEndIndex)!);
                    }
                } 
            }
        }

        // for (const element of currentIndexCounts.keys())  console.log(`\t${element} value ${currentIndexCounts.get(element)!}`);
        // console.log()
        if (currentIndexCounts.size === 0)  break;
        // if (!didFind)  break;
        // didFind = true;
        windowSize++;
        previousIndexCounts = currentIndexCounts;
        currentIndexCounts = new Map();
    }


    let total:number = 0;
    // console.log('previous')
    // for (const element of previousIndexCounts.keys())  console.log(`\t${element} value ${previousIndexCounts.get(element)!}`);
    // console.log()
    for (const value of previousIndexCounts.values())  total += value;

    return total;
}

function mainFindNumLIS():void {
    let nums:number[];
    let result:number;
    let correctResult:number;
    let doQuitIfAssertFails:boolean = true;

    nums = [1,2,4,3,5,4,7,2];
    correctResult = 3;
    result = findNumberOfLIS(nums);
    console.log(`final result is ${result} and correct result is ${correctResult}`);
    myAssert(result === correctResult, doQuitIfAssertFails);

    nums = [1,3,5,4,7];
    correctResult = 2;
    result = findNumberOfLIS(nums);
    console.log(`final result is ${result} and correct result is ${correctResult}`);
    myAssert(result === correctResult, doQuitIfAssertFails);

    nums = [2,2,2,2,2];
    correctResult = 5;
    result = findNumberOfLIS(nums);
    console.log(`final result is ${result} and correct result is ${correctResult}`);
    myAssert(result === correctResult, doQuitIfAssertFails);

    nums = [1,2];
    correctResult = 1;
    result = findNumberOfLIS(nums);
    console.log(`final result is ${result} and correct result is ${correctResult}`);
    myAssert(result === correctResult, doQuitIfAssertFails);
}

mainFindNumLIS();

/*
Data range/assumptions:
number of nums n: [1, 2000]
values: [-10^6, 10^6]
*/

/*
Tests:
n = 1
n = 2000
Long longest increase sequence
Many of same longest increasing
All decreasing, therefore # of longest = n
Whole thing is an increasing sequence (result = 1)
*/

/*
Ideas:

Naive:

Better:
    Every increasing subsequence starts from a pre-existing one
    Increasing window size, starting at 2
    Keep result from last pass
    If none are found at current pass, use last pass
    Make sure to deal with situation

Need to keep starting index as well to know what new element to try to add
    startindIndex + windowSize = newElement
    if (newElement > previousSequence[-1])  currentSequences.push(previousSequence.push(newElement))
Don't need to copy lists, since they can only generate one additional sequence at the next level
    Will modify copy in previousSquences, but that only needs the count
Certain sequences will be automatically dropped because window size will exceed possible
    Last sequence, everytime?

Misunderstood problem
    It's ordered permutations, not linearly extending window
    Bad mistake, should have known

Solution has space issues
    What if I just keep a count of sequences at the current level ending at an index
    Can calculate once and then multiply by number of sequences that got there
    I.e. at endIndex i, how many additional sequences can be generated from here
    Then multiply by number of sequences that got there
    Time complexity:
        At each window size, have to calc each index with all further along ones
        Summation n, ..., 1
        n^2
        Times all window sizes -> n ^ 3

Space solved, but time issues now
    Memoization will fix?
        Only need to calculate "additional sequences from a certain end index" once
            Since it doesn't matter how we got there
        But the way I'm doing it, I recalculate it everytime
    Problem: repeated calculation is how we determine where they end up on next windowSize iteration
    Can't do step by step if only calculating once

Dynamic programming, starting at end
    D[i] = summation from i to n - 1 of all further along indexes iff further index element > D[i] element

Problem: that calculates all the subsequences
    But only want count of the ones that are max length
    How to only keep track of subsequences that are the longest?
    Seems like increasing window size again
    We're currently tracking sequences with minimum length 1
    Can we just use the previous level?
        I think so

But recalculating each level is expensive
    Each level n^2
    N times -> n ^ 3

If we knew the length of the longest sequence, would that be faster?
    Could maybe find by binary search type procedure
    Lets us eliminate some from the end, but minor
        And nothing in case longest is small / 1
    Not thinking it helps much

What about a running maximum from an index
    O(n) to calculate
    Would let you know if any longer sequences exist
    Can update for a window size by combining running maxes?
        E.g. nums = [1,3,7,4,5];
            runningMax = [7,7,7,5]
                [7,7,5]
                [7,5]
    Combine with runningMin, quick way to determine existence of a sequence of a length
    And thus max length sequence
    But that doesn't help us
    And even if it did, does it help if max length is small?

*/

/*
Completion time (minutes):
Question difficulty:
How did it go (1 - 6):
*/