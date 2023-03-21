import myAssert from "./Trie";

function zeroFilledSubarray(nums: number[]): number {
    let total:number = 0;
    let consecutiveCount:number = 0;

    for (let i = 0; i < nums.length; i++) {
        const currentNum:number = nums[i];
        if (currentNum !== 0) {
            if (consecutiveCount > 0) {
                // Formula for sum of numbers from 1 to consecutiveCount
                total += (consecutiveCount * (consecutiveCount + 1)) / 2;
                consecutiveCount = 0;
            }
        } else {
            consecutiveCount += 1;
        }
    }

    if (consecutiveCount > 0) {
        total += (consecutiveCount * (consecutiveCount + 1)) / 2;
        console.log(total)
    }

    return total;
};

function mainZeroFilled():void {
    let nums:number[];
    let arrayCount:number;
    let doQuit:boolean = true;

    nums = [1,3,0,0,2,0,0,4];
    arrayCount = zeroFilledSubarray(nums);
    console.log(arrayCount);
    myAssert(arrayCount === 6, doQuit);

    nums = [1,3,0,2,0,0,4];
    arrayCount = zeroFilledSubarray(nums);
    console.log(arrayCount);
    myAssert(arrayCount === 4, doQuit);

    nums = [1,3,5,7,-100,-50]
    arrayCount = zeroFilledSubarray(nums);
    console.log(arrayCount);
    myAssert(arrayCount === 0, doQuit);
}

mainZeroFilled();

/*
Data range/assumptios:
nums length n: [1, 10^5]
values: [-10^9, 10^9]
*/

/*
Tests:
n = 1
n = 10^5
all single 0's
multiple runs of 0's
*/

/*
Ideas:

Naive:
    It's all about consecutive runs of 0's?
    A consecutive run of zeros will have 2^k-1 subarries?
    So just traverse, count, and add once consecutive run ends
    Make sure to add last one too
*/

/*
Completion time (minutes): 18
How did it go? very well
Describe
    It was a medium problem but probably shouldn't have been
    Initially I had the wrong formula for how many subarrays
    But I was able to figure it out
    Then it was just linear traversal
*/