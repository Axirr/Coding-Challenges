'use strict'
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
    if (nums.length < 4)  { return []; }

    nums.sort((a, b) => a - b);

    let i = 1;
    let filteredNums = [nums[0]]
    while (i < nums.length) {
        if (nums[i] !== filteredNums[filteredNums.length - 1]) { filteredNums.push(nums[i]); }
        i++;
    }
    let resultArray = recursiveHelper(filteredNums, target, 4, 0);

    return resultArray;
};

function recursiveHelper(nums, target, sizeOfArrayToGen, startIndex) {
    console.log(`Args sizeOfArrayToGen ${sizeOfArrayToGen} startIndex ${startIndex}`)
    let partialArrays = []
    let resultArray = [];
    if (sizeOfArrayToGen > 1) {
        partialArrays = recursiveHelper(nums, target, sizeOfArrayToGen - 1, startIndex + 1);
    } else {
        for (let i = startIndex; i < nums.length; i++) {
            partialArrays.push([nums[i]]);
        }
        console.log(partialArrays)
        return partialArrays;
    }

    for (let i = 0; i < nums.length - sizeOfArrayToGen; i++) {
        for (let j = 0; j < partialArrays.length; j++) {
            let subResult = [...partialArrays[j]]
            subResult.splice(0, 0, nums[i])
            // if (sumForArray(subResult) > target)  continue;
            resultArray.push(subResult);
        }
    }

    console.log(resultArray)
    return resultArray;
}

/**
 * 
 * @param {number[]} myArray 
 * @returns 
 */
function sumForArray(myArray) {
    let total = 0;
    myArray.forEach((element) => total += element);

    return total;
}

function mainFourSum() {
    let nums;
    let target;
    let sumsArray;

    nums = [1,0,-1,0,-2,2]
    target = 0
    sumsArray = fourSum(nums, target);
    // console.log(sumsArray);
}

mainFourSum();

/*
Data range/assumtptions:
length nums n: [1, 200]
nums[i] and target: [-10^9, 10^9]
*/

/*
Tests:
n = 1
n = 200
large nums
small nums
large target
small target
negative nums
*/

/*
Ideas:

Naive:
    Sort ascending and remove duplicates
        Possible remove all numbers greater than n?
    Recursive loop specifying how many we need
        4 at top level, then 3, 2, 1
    Time complexity:
        Worst case: every combination works
        Last level n
        Second last level n * n
        ...
        n^4
        Doesn't seem crazy at n = 200 scale?

Modified naive:
    Have to generate subArrays for each index
    Could store them to indicate the maximum index they work for
*/

/*
Did solve go well? no
If not, why?
    Tried to optimze by only generating the subarrays once
    But it's non-trivial to determine which of those arrays are valid to use as a base for a given number/index
        Only works simply for the first level
*/