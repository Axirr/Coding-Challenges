import myAssert from '../march2023/Trie';
import funcs from  './swapEverySecondNode'

function topKFrequent(nums: number[], k: number): number[] {
    let countMap:Map<number, number> = new Map();
    for (let i = 0; i < nums.length; i++) {
        let currentNum:number = nums[i];
        if (!countMap.has(currentNum)) {
            countMap.set(currentNum, 0)
        }
        countMap.set(currentNum, countMap.get(currentNum)! + 1);
    }

    let values:number[] = Array.from(countMap.values());
    values.sort((a, b) => {
        if (a > b) return -1;
        else if (a < b) return 1;
        return 0;
    })
    let topValues:Set<number> = new Set(values.slice(0, Math.min(values.length+1, k)));

    let result:number[] = [];
    for (const keyValuePair of countMap) {
        if (topValues.has(keyValuePair[1]))  result.push(keyValuePair[0]);
    }

    return result;
};

function mainTopKFrequent():void {
    let nums:number[];
    let k:number;
    let result:number[];
    let correctResult:number[];
    let doQuitIfAssertFails:boolean = true;

    nums = [1,1,1,2,2,3];
    k = 2;
    result = topKFrequent(nums, k);
    console.log(`Final result ${result}`);
    correctResult = [1,2];
    myAssert(funcs.listEquality(result, correctResult), doQuitIfAssertFails);

    nums = [1];
    k = 1;
    result = topKFrequent(nums, k);
    console.log(`Final result ${result}`);
    correctResult = [1];
    myAssert(funcs.listEquality(result, correctResult), doQuitIfAssertFails);
}

mainTopKFrequent();

/*
Data range/assumptions:
*/

/*
Tests:
*/

/*
Ideas:

Naive:
    Count all elements into a map
    Sort the values
    Get the top k values in a set
    for pair of map
        if kValues.has(pair[1])  result.push(pair[0j])
*/

/*
Completion time (minutes): 13
Question difficulty: medium
How did it go (1 - 6): 6
    Simple solution
    Decently fast
    No bugs
*/