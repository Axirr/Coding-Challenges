function findKthPositive(arr: number[], k: number): number {
    let testValue:number = 1;
    let i:number = 0;
    let missingCount = 0;

    while (i < arr.length) {
        while (arr[i] !== testValue) {
            missingCount++;
            if (missingCount >= k)  return testValue;
            testValue++;
        }

        i++;
        testValue++;
    }

    return testValue + (k - missingCount) - 1;
};

function mainFindKthPositive(): void {
    let arr:number[];
    let k:number;
    let result:number;

    arr = [2,3,4,7,11];
    k = 5;
    result = findKthPositive(arr, k);
    console.log(result);
    console.assert(result === 9);

    arr = [1,2,3,4];
    k = 2;
    result = findKthPositive(arr, k);
    console.log(result);
    console.assert(result === 6);

    arr = [2];
    k = 1;
    result = findKthPositive(arr, k);
    console.log(result);
    console.assert(result === 1);
}

mainFindKthPositive();

/*
Data range/assumptions:
arr length n: [1,1000]
k value: [1, 1000]
Arr is sorted in strictly increasing order
*/

/*
Tests:
n = 1
n = 1000
k = 1
k = 1000
Missing at start, middle, end
*/

/*
Ideas:

Naive:
    Start testValue at arr[0]
    Traverse from i = 1 on, testing against testValue (increment each time)
        If, not the same, increment countMissing and test value
        Compare to k, return if equal k
*/

/*
Did it go well? sort of
If not, why?
    Fast, but a little slow for an easy
    Problem was I didn't fully understand/read the question
        Thought start of numbers was arr[0], not always 1
*/