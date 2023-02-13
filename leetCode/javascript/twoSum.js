var twoSum = function(nums, target) {
    let hashTable = new Map()
    for (let i=0; i < nums.length; i++) {
        hashTable.set(nums[i], i)
    }
    console.log(hashTable.get(4))
    for (let i=0; i < nums.length; i++) {
        if (nums[i] == target - nums[i]) continue;
        if (hashTable.has(target - nums[i])) {
            return [i, hashTable.get(target - nums[i])]
        }
    }
    // for (let i=0; i < nums.length; i++) {
    //     for (let j=i+1; j < nums.length; j++) {
    //         if (nums[i] + nums[j] === target)  return [i,j];
    //     }
    // }
};

function myMain() {
    let nums = [2,7,11,15]
    let target = 9
    let returnIndices;
    returnIndices = twoSum(nums, target)
    console.log(returnIndices)
    console.assert(returnIndices[0] == 0)
    console.assert(returnIndices[1] == 1)

    nums = [3,2,4]
    target = 6
    returnIndices = twoSum(nums, target)
    console.log(returnIndices)
}

myMain()
/*
Naive:
    Iterate through every pair
    n^2

Better: sort, then work from back?
    nlogn + n
*/