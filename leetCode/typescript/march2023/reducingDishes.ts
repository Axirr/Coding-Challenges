import myAssert from "./Trie";

function maxSatisfaction(satisfaction: number[]): number {
    satisfaction.sort((a, b) => a - b);
    if (satisfaction[satisfaction.length - 1] <= 0)  return 0;

    let n:number = satisfaction.length;
    let index = n - 1;
    let compoundingSum:number = 0;
    let normalSum:number = 0;

    while (index >= 1) {
        if (satisfaction[index - 1] >= 0)  {
            normalSum += satisfaction[index];
            compoundingSum += normalSum;
            index--;
        } else  break
    }

    let normalSumForNegative:number = 0;
    while (index >= 0) {
        normalSumForNegative += satisfaction[index];
        if (normalSumForNegative + normalSum < 0)  break;

        compoundingSum += normalSumForNegative + normalSum;
        index--;
    }

    return compoundingSum;
}

function naiveMaxSatisfaction(satisfaction: number[]): number {
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

    // satisfaction = [-2,5,-1,0,3,-3];
    satisfaction = [-3, -2, -1, 0, 3, 5];
    result = maxSatisfaction(satisfaction);
    console.log(`Final result ${result}`);
    myAssert(result === 35, doQuit);
    /*
    all normal sums:
        5
        8
        8
        7
        5
        2
    all full sums:
        5
        13
        21
        28
        33
        35
    positive sums:
        5
        13
        21
    normal sum for positives:
        5
        8
        8
    negative running sums:
        -1
        -4
        -10
    normal sum for negatives:
        -1
        -3
        -6
    8 * 2 + 21 - 4 = 33
    If I don't include 0: 8 * 3 + 13 - 4 = 33
    */

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

Trying for better solution despite naive working:
Dynamic programming
Two options:
    Skip dish
        D[i] = D[i-1]
    Include dish
        D[i] = newDish + modify D[i-1]
    Doesn't really work

Would we want to start from the good end or bad end?

Use an increasing number of dishes
    But would

What about binary search for answer?
    Changing dishes used doesn't have a consistent effect though

Running sum, plus a time value?
    Can reach back

Do we need to go all the way to the end values?
    Potentially, e.g. if max value is huge and negative values are small negatives
        Any additional instance of max value worth it

Split range into positive numbers, negative numbers
Increasing time helps positive numbers, hurts negative numbers
Optimal solution would always include at least all the positive numbers
    Can the positive numbers be turned into a closed from calculation for time t
    E.g. 2, 3, 4
        2 * 1 + 3 * 2 + ... + 4 * t
        Doesn't each increase add the same amount though
        E.g. t = 1;     2 + 6 + 8 = 16
        E.g. t = 2;     4 + 9 + 12 = 25
        E.g. t = 3;     6 + 12 + 16 = 36
        Plus 9 each time
            I.e. just the sum of the numbers
        Different before all positives are included, but that doesn't matter
    And closed form would be the same for the negative numbers
        E.g. -10, -5, -2
            Running sum: -2, -7, -17
        This one we have to deal with uneven increments though
        Previous sum + new value
    So once this value exceeeds the constant gains for the positives, optimal reached

Time complexity of better solution:
    Sort: n log n
    Traversal: n
*/

/*
Completion time (minutes): 10
How did it go? Well
Describe:
    Problem was notionally Hard difficulty
    But it honestly seemed like an Easy, not even a medium
    Naive worked
    Feel like they miscalibrated 'n' magnitude or something
    Tried to do a more complicated version
        Got there, but it was slow
        And my debugging was bad
*/