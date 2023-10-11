import myAssert from "../march2023/Trie";

function search(nums: number[], target: number): boolean {
    let pivot:number = findPivot(nums);
    console.log(`pivot ${pivot}`)
    let didFind:boolean = binarySearch(nums, target, 0, pivot - 1);
    if (didFind)  return true;
    return binarySearch(nums, target, pivot, nums.length - 1);
}

function binarySearch(nums:number[], target:number, low:number, high:number):boolean {
    while (high >= low) {
        let middle:number = Math.floor((high + low) / 2);
        let middleElement:number = nums[middle];
        if (middleElement === target)  return true;
        else if (middleElement > target)  high = middle - 1
        else  low = middle + 1;
    }
    return false;
}

function linearSearch(nums: number[], target: number): boolean {
    for (const element of nums)  if (element === target)  return true;

    return false;
};

function generateRandomPivotArray(length:number, minNum:number = 0, maxNum:number = 100):number[] {
    let resultArray:number[] = [];
    for (let i = 0; i < length; i++) {
        resultArray.push(Math.ceil(Math.random() * maxNum) - minNum);
    }
    resultArray.sort((a, b) => {
        if (a > b)  return 1;
        if (a < b)  return -1;
        return 0;
    })

    let pivot:number = Math.floor(Math.random() * length);
    console.log(`generated pivot ${pivot}`);
    let pivotArray:number[] = [];
    for (let i = pivot; i < resultArray.length; i++)  pivotArray.push(resultArray[i]);
    for (let i = 0; i < pivot; i++)  pivotArray.push(resultArray[i]);

    return pivotArray;
}

function findPivot(nums:number[]):number {
    let result:number = 0;
    let currentRange:number[] = [0, nums.length - 1];
    while (true) {
        console.log(`current range ${currentRange}`)
        let start:number = currentRange[0];
        let end:number = currentRange[1];
        let totalLength:number = end - start;
        let thirdLength:number = Math.floor(totalLength / 3);
        let firstThirdIndex:number = start + thirdLength;
        let secondThirdIndex:number = start + 2 * thirdLength;
        if (nums[firstThirdIndex] > nums[secondThirdIndex])  {
            if (secondThirdIndex - firstThirdIndex === 1)
                result = secondThirdIndex;
                break;
            }
            currentRange = [firstThirdIndex, secondThirdIndex];
            continue;
        } else if () {
            let newEnd:number = firstThirdIndex - 1;
            if (newEnd > start)  frontier.push([start, newEnd]);
            let newStart:number = secondThirdIndex + 1;
            if (newStart < end)  frontier.push([newStart, end]);
        }
    }

    return nums.length - result - 1;
}

function mainSearchRotated():void {
    let nums:number[];
    let target:number;
    let correctResult:boolean;
    let result:boolean;
    let doQuitIfAssertFails:boolean = true;

    // nums = [ 4,6,7,7,8,2,3];
    // target = 2;
    // correctResult = true;
    // result = search(nums, target);
    // myAssert(result === correctResult, doQuitIfAssertFails);
    // return;

    nums = [8,0,3,4,6,7,8];
    target = 0;
    correctResult = true;
    result = search(nums, target);
    myAssert(result === correctResult, doQuitIfAssertFails);

    nums = [2,5,6,0,0,1,2]
    target = 0;
    correctResult = true;
    result = search(nums, target);
    myAssert(result === correctResult, doQuitIfAssertFails);

    nums = [2,5,6,0,0,1,2];
    target = 3;
    correctResult = false;
    result = search(nums, target);
    myAssert(result === correctResult, doQuitIfAssertFails);
    return;

    let randomArray:number[];
    let randomMin:number = 1;
    let randomMax:number = 9;
    let length:number = 7;
    let randomTarget:number;
    let runCount:number = 20;
    let total:number = 0;
    nums = [2,5,6,0,0,1,2];
    // console.log(`${nums}`)
    for (let i = 0; i < runCount; i++) {
        randomArray = generateRandomPivotArray(length, randomMin, randomMax);
        randomTarget = Math.floor(Math.random() * randomMax) - randomMin;
        let result1:boolean = linearSearch(randomArray, randomTarget);
        let result2:boolean = search(randomArray, randomTarget);
        if (result1)  total += 1;
        if (result1 !== result2) {
            console.log(`Test failed`)
            console.log(`Array ${randomArray}`);
            console.log(`Target ${randomTarget}`);
            return;
        }
    }
    console.log(`true count percentage is ${total/runCount}`);

    // randomArray = generateRandomPivotArray(length, randomMin, randomMax);
    // randomTarget = Math.floor(Math.random() * randomMax) - randomMin;
    // console.log(`random array ${randomArray}`);
    // console.log(`random target ${randomTarget}`);

    // console.log(linearSearch(randomArray, randomTarget));

}

mainSearchRotated();

/*
Data range/assumptions:
nums length n: [1, 5000]
values: [-10^4, 10^4]
    target elemnt of values
nums guaranteed rotated at some pivot
duplicates allowed
strict time limit
*/

/*
Tests:
n = 1
n = 5000
value
    start, early, late, end
duplicates of target
pivot
    start, early, late, end
pivot over values at third boundaries
*/

/*
Ideas:

Naive:
    Linear traversal
    Time complexity: O(n)

Better:
    Binary search for pivot

Linear sampling looking for discontinuity
    Split into thirds by taking two samples
    If samples consistent (i.e. first >= last), pivot not in middle third
        Else, pivot is in middle third
    Run recursively on remaining thirds
    Keep a frontier of "need to search" windows
    But discard whenever find pivot must be in middle window
    When high - low = 2, pivot is at high?
    Pivot at 0?
    Pivot at n?

Slowing down and thinking about things:
    Base case:
        end - start === 1 and nums[start] > nums[end]
        Or a minimum length?
            Length <= 3
    Otherwise:
        If middle, frontier = [[firstThird, secondThird]]
        Else append other thirds
    What about case end = start
        Normal start > end check won't work
        Should these ever happen?

    What about getting rid of frontier and just doing sequentially
        Since one of them must work
            Except for case where pivot = 0 and didn't do anything
        Or case where pivot is across a third bounary
    E.g. [7, 1, 2]
    Middle third doesn't exist
    So just check 7 vs 1 and 1 vs 2
    n = 3, check two outer pairs
    n = 2, check against each other
    n = 1, cannot have pivot
*/

/*
Completion time (minutes):
Question difficulty:
How did it go (1 - 6):
*/