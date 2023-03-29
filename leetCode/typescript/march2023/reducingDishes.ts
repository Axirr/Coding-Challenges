import myAssert from "./Trie";

function maxSatisfaction(satisfaction: number[]): number {
    satisfaction.sort((a, b) => a - b);
    if (satisfaction[satisfaction.length - 1] <= 0)  return 0;
    let n:number = satisfaction.length;
    let firstIndex:number = n - 1;
    let resultMax:number = 0;

    while (firstIndex >= 0) {
        let currentTime:number = 1;
        let currentMax:number = 0;

        for (let i = firstIndex; i < n; i++) {
            currentMax += satisfaction[i] * currentTime;
            currentTime++;
        }

        resultMax = Math.max(resultMax, currentMax);

        firstIndex--;
    }

    return resultMax;
};

function mainReducingDishes():void {
    let satisfaction:number[];
    let result:number;
    let doQuit:boolean = true;

    satisfaction = [-1,-8,0,5,-9];
    result = maxSatisfaction(satisfaction);
    console.log(`Final result ${result}`);
    myAssert(result === 14, doQuit);

    satisfaction = [4,3,2]
    result = maxSatisfaction(satisfaction);
    console.log(`Final result ${result}`);
    myAssert(result === 20, doQuit);

    satisfaction = [-1,-4,-5]
    result = maxSatisfaction(satisfaction);
    console.log(`Final result ${result}`);
    myAssert(result === 0, doQuit);
}

mainReducingDishes();

/*
Data range/assumptions:
satisfaction length n: [1, 500]
satisfaction values: [-1000, 1000]
*/

/*
Tests:
n = 1
n = 500
need to discard dishes
need to use negative dishes
don't end up in sorted order?
    No, this never happens
skip dish but take a more negative one?
    Never happens
*/

/*
Ideas:

Naive:
    Sort satisfaction in non-decreasing
    If max is not positive, return 0
    Expand window from 1 to n dishes, from back to front
        Storing new max if found
    Time complexity:
        Sort: nlogn
        Sum of n ... 1 -> O(n^2)
*/

/*
Completion time (minutes): 10
How did it go? Well
Describe:
    Problem was notionally Hard difficulty
    But it honestly seemed like an Easy, not even a medium
    Naive worked
    Feel like they miscalibrated 'n' magnitude or something
*/