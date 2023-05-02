import myAssert from "../march2023/Trie";

function arraySign(nums: number[]): number {
    let negativeCount:number = 0;

    for (let i = 0; i < nums.length; i++) {
        const currentNum = nums[i];
        if (currentNum === 0)  return 0;
        else if (currentNum < 0)  negativeCount++;
    }

    if (negativeCount % 2 === 0)  return 1;
    return -1;
};

function mainArraySign():void {
    let nums:number[];
    let sign:number;
    let doQuitIfAssertFails:boolean = true;

    nums = [-1,-2,-3,-4,3,2,1];
    sign = arraySign(nums);
    console.log(`Final result ${sign}`);
    myAssert(sign === 1, doQuitIfAssertFails);
}

mainArraySign();

/*
Data range/assumptions:
*/

/*
Tests:
*/

/*
Ideas:

Naive:
*/

/*
Completion time (minutes): 4
Question difficulty: Easy
How did it go (0 - 6): 6
    Very easy
    No bugs
*/