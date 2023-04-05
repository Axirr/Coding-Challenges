import myAssert from "../march2023/Trie";

function minimizeArrayValue(nums: number[]): number {
    let currentMinMax:number = nums[0];
    let total:number = 0;

    let currentN:number = 0;
    for (const num of nums)  {
        total += num;
        currentN+= 1;
        currentMinMax = Math.max(currentMinMax, Math.ceil(total / currentN));
    }

    let conservativeAverage:number = Math.ceil(total / nums.length);

    return Math.max(currentMinMax, conservativeAverage);
};

function mainMainimizeArrayValue():void {
    let nums:number[];
    let result:number;
    let doQuitIfFail:boolean = false;

    nums = [13,13,20,0,8,9,9];
    result = minimizeArrayValue(nums);
    console.log(`Final result ${result}`);
    myAssert(result === 16, doQuitIfFail);

    nums = [3,7,1,6];
    result = minimizeArrayValue(nums);
    console.log(`Final result ${result}`);
    myAssert(result === 5, doQuitIfFail);

    nums = [10,1];
    result = minimizeArrayValue(nums);
    console.log(`Final result ${result}`);
    myAssert(result === 10, doQuitIfFail);
}

mainMainimizeArrayValue();

/*
Data range/assumptions:
nums length n: [2, 10^5]
values: [0, 10^9]
*/

/*
Tests:
n = 2
n = max
lots of 0 values
uniforma values
varied values
Greedy fails
*/

/*
Ideas:

Naive:
    a
Intuition:
    Can we calculate the value that can be passed around?
    Can only pass from back to front
        But, can pass all values
    And then just move that to the na
    Minimizing the max is spreading the values as much as possible
    Calculate average
    Pass values forward until value is the average

Traversal from back to front gets us possible minimums
    i = 0 is a lower bound on the minimum
    Redistribute everything else until equal
        Must figure out how to deal with uneven
    If back average > front, start increasing front


Trace:
    [10, 5, 20]
        Lower bound: 10
    [10, 13, 12]
        Since 10 lower than average, include it
    [12, 12, 12]
Isn't this the same as just, minMax = Math.max(num[0], Math.ceill(sum(num) / num.length?))

Trace:
[13,13,20,0,8,9,9]
    18
    26
    26

Problem: lower bound idea of first index is generalizable to everything in front
Running average as min?
*/

/*
Completion time (minutes): 26
Question difficulty: medium
How did it go (0 - 6): 5
Describe:
    Easy question
    Took me longer than it should, but still not that long
*/