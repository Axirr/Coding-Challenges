/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number[]}
 */
var shuffle = function(nums, n) {
    let resultList = [];
    let i;
    for (i=0; i < n; i++) {
        resultList.push(nums[i]);
        resultList.push(nums[i + n]);
    }
    return resultList;
};

function arrayEquality(array1, array2) {
    if (array1.length != array2.length)  { return false; }
    for (let i=0; i < array1.length; i++) {
        if (array1[i] != array2[i]) {
            return false;
        }
    }
    return true;
}

function main() {
    let nums;
    let n;
    let resultList = [];
    let correctList = [];

    nums = [2,5,1,3,4,7]
    n = 3
    resultList = shuffle(nums, n);
    console.log(resultList)
    correctList = [2,3,5,4,1,7];
    console.assert(arrayEquality(resultList, correctList));
}

main()

/*
Data range/assumptions:
2n: [2, 1000]
nums: [1, 10^3]
*/

/*
Tests:
n = 2
n = 1000
*/

/*
Ideas:

Naive:
    Calc midpoint index
    Build array doing i, then i + midpoint
    Time: O(n)
*/