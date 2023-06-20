import myAssert from "../march2023/Trie";

function getAverages(nums: number[], k: number): number[] {
    let currentTotal:number = 0;
    let totalLength:number = 2 * k + 1;
    let resultAverages:number[] = [];

    for (let i=0; i < nums.length; i++) {
        currentTotal += nums[i];
        let lowestIndex:number = i - totalLength;
        if (lowestIndex >= 0) {
            currentTotal -= nums[lowestIndex];
        }
        if (i >= totalLength - 1) resultAverages.push(Math.floor(currentTotal / totalLength))
        else if (i >= k) resultAverages.push(-1)
    }

    while (resultAverages.length < nums.length) {
        resultAverages.push(-1);
    }

    return resultAverages;
};

function mainGetAverages():void {
    let nums:number[];
    let k:number;
    let result:number[];
    let correctResult:number[];
    let doQuitIfAssertFails:boolean = true; 

    nums = [7,4,3,9,1,8,5,2,6];
    k = 3;
    correctResult = [-1,-1,-1,5,4,4,-1,-1,-1];
    result = getAverages(nums, k);
    console.log(`result ${result}`)
    myAssert(result.length === correctResult.length, doQuitIfAssertFails);
    for (let i = 0; i < result.length; i++) {
        myAssert(result[i] === correctResult[i], doQuitIfAssertFails);
    }

    nums = [100000], k = 0;
    result = getAverages(nums, k);
    console.log(`result ${result}`)

    nums = [8], k = 100000;
    result = getAverages(nums, k);
    console.log(`result ${result}`)
}

mainGetAverages();

/*
Data range/assumptions:
*/

/*
Tests:
*/

/*
Ideas:

Naive:
    Keep a running total
        Subtracting oldest element, adding newest when window size of k has been achieved
*/

/*
Completion time (minutes): 45
Question difficulty: Medium
How did it go (1 - 6): 1
    Problem wasn't difficult but I was out of it and it took me a long time
*/