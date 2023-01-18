function maxSubArray(nums: number[]): number {
    var maxSum:number = nums[0]
    var partialRunningSum:number = nums[0]

    for (var i = 1; i < nums.length; i++) {
        partialRunningSum = partialRunningSum + nums[i]
        if (nums[i] > partialRunningSum) {
            // Starting subArray and partialRunningSum from this index
            // since it is better than whole current subArray
            partialRunningSum = nums[i]
        }
        maxSum = Math.max(maxSum, partialRunningSum)
    }

    return maxSum
};

// Example where maxSum and partialRunningSum will be tracking arrays with different start points at i = 2
var nums:number[] = [10,-100,9,2]
var maxSum:number = maxSubArray(nums)
console.log(maxSum)
console.assert(maxSum === 11)

/*
How does this algorithm ensure optimality?
    Last value is a running sum
    Only pick a new starting point for the subArray if that number is greater than running sum from last starting point
    We update last value even if it isn't a new max

So we're keeping track of two things:
    currentMax for the ith index
    sum array if we took everything from our last optimal starting point
    currentMax is greedy, but 

Note: partialRunningSum and maxSum don't necessarily have the same starting index for their subarray
    E.g. [10, -100, 9, 2]
        At i = 2, partialRunningSum will reset to 9
        But maxSum will still be at 10
        At i = 3, partialRunningSum of 11 will become newMax
*/