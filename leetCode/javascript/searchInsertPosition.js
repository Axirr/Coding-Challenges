/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    let low = 0
    let high = nums.length - 1;
    let middle = Math.floor((low + high) / 2);
    while (low <= high) {
        middle = Math.floor((low + high) / 2);
        let currentValue = nums[middle]
        if (currentValue === target) { return middle; }
        else if (currentValue > target) { high = middle - 1; }
        else if (currentValue < target) { low = middle + 1; }
    }
    return low;
};

function myMain() {
    let nums = [1,3,5,6]
    let target = 5
    let resultInt;
    resultInt = searchInsert(nums, target)
    console.log(resultInt)
    console.assert(resultInt == 2)

    nums = [1,3,5,6]
    target = 2
    resultInt = searchInsert(nums, target)
    console.log(resultInt)
    console.assert(resultInt == 1)

    nums = [3,5,6]
    target = 2
    resultInt = searchInsert(nums, target)
    console.log(resultInt)
    console.assert(resultInt == 0)

    nums = [3,5,6]
    target = 7
    resultInt = searchInsert(nums, target)
    console.log(resultInt)
    console.assert(resultInt == 3)
}

myMain()

/*
Binary search

What to do about non-exact matches
*/