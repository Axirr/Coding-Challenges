function maxSubArray(nums: number[]): number {
    var lastIndex:number = nums.length - 1
    var maxSum:number = nums[lastIndex]
    var lastValue = nums[lastIndex]

    for (var i = lastIndex - 1; i >= 0; i--) {
        lastValue = lastValue + nums[i]
        if (nums[i] > lastValue) {
            lastValue = nums[i]
        }
        maxSum = Math.max(maxSum, lastValue)
    }

    return maxSum
};