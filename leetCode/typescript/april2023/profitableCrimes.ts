import myAssert from "../march2023/Trie";

function tempprofitableSchemes(n: number, minProfit: number, group: number[], profit: number[]): number {
    console.log("implement");
    return 1;
};

function profitableSchemes(n: number, minProfit: number, group: number[], profit: number[]): number {
    let groupCombos:number[][] = generateAllCombinations(group);
    let profitCombos:number[][] = generateAllCombinations(profit);
    // for (const element of profitCombos)  console.log(element)

    let profitableCount:number = 0;
    if (minProfit === 0)  profitableCount = 1;

    for (let i = 0; i < profitCombos.length; i++) {
        let currentProfits:number[] = profitCombos[i];
        let currentGroup:number[] = groupCombos[i];
        let calculatedProfit:number = naiveRecursive(n, currentGroup, currentProfits, 0);
        if (calculatedProfit >= minProfit)  profitableCount++;

        // console.log(`calculatedProfit ${calculatedProfit}`)
        // if (calculatedProfit >= minProfit)  {
        //     console.log("MATCH FOUND")
        //     profitableCount++;
        // } else  console.log("NOT ENOUGH")

    }

    return profitableCount;
};

function naiveRecursive(n:number, group:number[], profit:number[], startIndex:number):number {
    let doProfit = 0;

    if (group[startIndex] <= n) doProfit = profit[startIndex];
    else return -1;

    let nextProfit:number = 0;
    // Only do recursion if next startIndex will be valid
    if (startIndex < group.length - 1)  nextProfit = naiveRecursive(n - group[startIndex], group, profit, startIndex + 1);
    if (nextProfit === -1) return -1;
    else  doProfit += nextProfit;

    // console.log(`doProfit ${doProfit}`)
    return doProfit;
}

function generateAllCombinations(numbers:number[]):number[][] {
    let generatedSubsets:number[][] = [];
    let maxDigits:number = numbers.length;
    let maxMask:number = 2 ** maxDigits;

    let outerMask:number = 1;
    while (outerMask < maxMask) {
        let workingMask:number = outerMask;
        let currentSubset:number[] = [];

        let currentItem = 0;
        while (workingMask > 0) {
            let bit:number = workingMask % 2;
            if (bit === 1) {
                currentSubset.push(numbers[currentItem]);
            }

            currentItem++;
            workingMask =  Math.floor(workingMask / 2);
        }

        if (currentSubset.length > 0) {
            // console.log(`subset ${currentSubset}`);
            generatedSubsets.push(currentSubset);
        }

        outerMask++;
    }


    return generatedSubsets;
}


function mainProfitableSchemes():void {
    let n:number;
    let minProfit:number;
    let group:number[];
    let profit:number[];
    let result:number;
    let doQuitIfAssertFails:boolean = true;

    // group = [1, 2, 3, 4, 5];
    // let temp:number[][] = generateAllCombinations(group);
    // return;

    n = 5;
    minProfit = 3;
    group = [2,2];
    profit = [2,3];
    result = profitableSchemes(n, minProfit, group, profit);
    console.log(`Final result ${result}`);
    myAssert(result === 2, doQuitIfAssertFails);

    n = 10, minProfit = 5, group = [2,3,5], profit = [6,7,8];
    result = profitableSchemes(n, minProfit, group, profit);
    console.log(`Final result ${result}`);
    myAssert(result === 7, doQuitIfAssertFails);

    n = 64, minProfit = 0, group = [80, 40], profit = [88, 88];
    result = profitableSchemes(n, minProfit, group, profit);
    console.log(`Final result ${result}`);
    myAssert(result === 2, doQuitIfAssertFails);
}

mainProfitableSchemes();

/*
Data range/assumptions:
n: [1, 100]
minProfit: [0, 100]
group and profit length k: [1, 100]
profit: [0, 100]
*/

/*
Tests:
n = 1
n = 100
high min profit
group restrictions conflict between most profitable jobs
many low profit jobs outweigh one high profit job
*/

/*
Ideas:

Naive:
    Remove all jobs and groups that are below minProfit
    For job, can either do or skip
    Get max(do, skip) recursively
    Set of members

Misunderstood question:
    Minprofit applies to the total profit for a selection of schemes, not to each one

Proper naive:
    Construct all subsets of schemes
    Work out max profit for schemes using previous naive
    Return count where profit >= minProfit

General loop form for generating all combos:
    Window size starts = collection.length
    One combo: use all
    Others: remove different one from each
    Recursively reuse non-use all combos to generate next ones by
    Doesn't work:
        Consistent one level deeper but starts to make duplicates lower than that
    Better:
        Build up from small ones and combine them?

How to speed up naive?
    If evaluate in order from small subsets to large ones then if parent small subset is profitable all its supersets will be
        Don't have to calculate, just need to count
    Worst case: only last job is profitable so we still need to calculate them all
        Same as naive
    Sort by profit per person and use to define bounds
        Likely not correct because of profitable but too many people
            E.g. n = 5, with some very profitable job that needs 6 people but 

Anything other than dynamic programming is probably a waste of time
Each subset is a sum of it's consituent subsets
Rather than generating naively, if created larger subsets out of smaller ones could use results for them
Increasing window size
*/

/*
Completion time (minutes):
Question difficulty:
How did it go (0 - 6):
*/