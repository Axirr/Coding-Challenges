import myAssert from "../march2023/Trie";

function sortFunction(a:number, b:number):number {
    if (a > b) return 1
    if (a < b) return -1
    return 0
}

function minCost(nums: number[], cost: number[]): number {
    nums.sort(sortFunction);
    cost.sort(sortFunction);

    let totalCost:number = 0;
    for (const element of cost)  totalCost += element;
    let cnt:number = 0;
    let i:number = 0;
    while (i < nums.length) {
        cnt += cost[i]
        if (cnt > totalCost) {
            target = nums[i]
            break
        }
        totalCost += nums[i] * cost[i];

        i++;
    }

    // let unrounded:number = weightedAverage(nums, cost);
    // let finalValue:number = Math.round(unrounded);
    // console.log(`final average ${finalValue}`)
    // console.log(`unrounded ${unrounded}`)

    // let totalCost:number = 0;
    // for (let i = 0; i < nums.length; i++) {
    //     totalCost += Math.abs(finalValue - nums[i]) * cost[i];
    // }

    return totalCost;
};

function weightedAverage(nums:number[], cost:number[]): number {
    let total:number = 0;
    let weightCount:number = 0;
    let maxInt:number = 9007199254740991;
    let decreaseFactor = 1;
    for (let i = 0; i < nums.length; i++) {
        let currentNum:number = nums[i];
        let currentCost:number = cost[i];
        if (currentNum > maxInt / currentCost)  console.log('HEREERERE')
        let nextIncrement:number = currentNum * currentCost;
        console.log(`next increment ${nextIncrement}`)
        while (maxInt - total < nextIncrement) {
            console.log('HERE')
            console.log()
            console.log()
            decreaseFactor *= 10
            total /= 10;
        }
        total += nextIncrement / decreaseFactor
        weightCount += currentCost
        console.log(`total ${total}`)
    }
    return total / weightCount * decreaseFactor;
}

function mainMinCost():void {
    let nums:number[];
    let cost:number[];
    let result:number;
    let doQuitIfAssertFails:boolean = true;

    // nums = [735103,366367,132236,133334,808160,113001,49051,735598,686615,665317,999793,426087,587000,649989,509946,743518];
    // cost = [724182,447415,723725,902336,600863,287644,13836,665183,448859,917248,397790,898215,790754,320604,468575,825614];
    // result = minCost(nums, cost);
    // console.log(`result ${result}`);
    // myAssert(result === 1907611126748, doQuitIfAssertFails);
    // return

    nums = [1,3,5,2], cost = [2,3,1,14];
    result = minCost(nums, cost);
    console.log(`result ${result}`);
    myAssert(result === 8, doQuitIfAssertFails);

    nums = [2,2,2,2,2], cost = [4,2,8,1,3];
    result = minCost(nums, cost);
    console.log(`result ${result}`);
    myAssert(result === 0, doQuitIfAssertFails);
}


mainMinCost();

/*
Data range/assumptions:
nums and cost length n: [1, 10^5]
nums and cost values: [1, 10^6]
*/

/*
Tests:
n = 1
large values
small values
mixed values
*/

/*
Ideas:

Naive:

Simpler problem: all costs = 1
    To minimize number of changes, calculate average value and move to that
    How to deal with fractional average?
        Simple rounding enough?
        Alternatively, move all numbers to either floor or ceiling of float average
        Whichever has more, move the others to that

Principles here:
    Minimize moving high cost numbers to the extent possible
    Weighted average based on cost to get "average" value
*/

/*
Completion time (minutes):
Question difficulty:
How did it go (1 - 6):
*/