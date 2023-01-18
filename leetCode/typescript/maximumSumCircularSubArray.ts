function maxSubarraySumCircular(nums: number[]): number {
    var lastIndex:number = nums.length - 1
    var backRunningSum:number = nums[lastIndex]
    var frontRunningSum:number = nums[0]
    var bestFromFrontToIndex:number[] = []
    bestFromFrontToIndex.push(nums[0])
    var bestFromBackToIndex:number[] = []
    bestFromBackToIndex.push(nums[lastIndex])
    var backSolutions:number[] = []
    backSolutions.push(nums[lastIndex])
    var partialBackRunningSum:number = 0
    var maxSum:number = nums[lastIndex]


    // Construct backwards stuff (runningSum, bestFromBack, backSolutions)
    for (var i = lastIndex - 1; i >= 0; i--) {
        var lastValue = backSolutions[backSolutions.length - 1]
        var takeValueAndPast = lastValue + nums[i] + partialBackRunningSum
        var takeValueAndPast = lastValue + nums[i]
        if (nums[i] > takeValueAndPast) {
            backSolutions.push(nums[i])
        } else {
            backSolutions.push(takeValueAndPast)
        }
        maxSum = Math.max(maxSum, backSolutions[backSolutions.length - 1])

        backRunningSum += nums[i]
        bestFromBackToIndex.push(Math.max(bestFromBackToIndex[bestFromBackToIndex.length - 1], backRunningSum))
        maxSum = Math.max(maxSum, bestFromBackToIndex[bestFromBackToIndex.length - 1])

    }

    // Construct forward stuff (runningSum, bestFromFront)
    for (var i = 1; i <= lastIndex; i++) {

        frontRunningSum += nums[i]
        bestFromFrontToIndex.push(Math.max(bestFromFrontToIndex[bestFromFrontToIndex.length - 1], frontRunningSum))
        maxSum = Math.max(maxSum, bestFromFrontToIndex[bestFromFrontToIndex.length - 1])
    }

    bestFromBackToIndex.reverse()
    // console.log(backSolutions)
    // console.log(bestFromFrontToIndex)
    // console.log(bestFromBackToIndex)

    for (var i = 0; i < nums.length - 2; i++) {
        var potentialMax:number = bestFromFrontToIndex[i] + bestFromBackToIndex[i+1]
        maxSum = Math.max(maxSum, potentialMax)
    }

    return maxSum
};


function myMain() {
    var nums:number[] = [1,-2,3,-2]
    var maxSum:number = maxSubarraySumCircular(nums)
    console.log(maxSum)
    console.assert(maxSum === 3)
    nums = [5,-3,5]
    maxSum = maxSubarraySumCircular(nums)
    console.log(maxSum)
    console.assert(maxSum === 10)
    nums = [-3,-2,-3]
    maxSum = maxSubarraySumCircular(nums)
    console.log(maxSum)
    console.assert(maxSum === -2)
    nums = [-2,2,-2,9]
    maxSum = maxSubarraySumCircular(nums)
    console.log(maxSum)
    console.assert(maxSum === 9)
    nums = [-2,-3,-1]
    maxSum = maxSubarraySumCircular(nums)
    console.log(maxSum)
    console.assert(maxSum === -1)
    nums = [9,8,4,-7]
    maxSum = maxSubarraySumCircular(nums)
    console.log(maxSum)
    console.assert(maxSum === 21)
    nums = [-2,-6,1,3,-2,9,5,7,6,8]
    maxSum = maxSubarraySumCircular(nums)
    console.log(maxSum)
    console.assert(maxSum === 37)
    nums = [1,-14,21,-8,14,-21,1,-8,-13,21,18,-3,28,20,-20,-18,-22,1,-19,14,-19,-19,3,23,-26,-10,-18,15,-27,26]
    maxSum = maxSubarraySumCircular(nums)
    console.log(maxSum)
    console.assert(maxSum === 84)
}

myMain()

/*
Data range/assumptions:
array length n: [1, 3 * 10^4]
values: [-3 * 10*4, 3 * 10^4]
*/

/*
Tests:
n = 1
n = 10^4
Negative sum
Max subarray needs to use circular property (e.g. [1, -10000, 1, 1])
Max subarrya does not need circular property
*/

/*
Ideas:

Naive for simpler problem: max subarray no circular
    For each starting position, traverse list
        Keep a max and a running sum
            Max only updated if new window is bigger
            Running sum always updated
    
    Time complexity: n^2

Dynamic programming:
    D[i] = max(D[i-1], D[i-1] + nums[i])
    Not sure that works

Expanding window
    Iterate through window sizes

Build from back of nums:
    Only take next letter if the sum you get from it is worth it (i.e. positive)
    D[-1] = nums[-1]
    D[-2] = max(D[-1] + nums[-2], nums[-2])
Problem: that's greedy and it doesn't always work
    E.g. [-1, 10000, -1, 10000]

For circular, could record start and finish of optimal for that location

Or just do the reverse, build from front to back
And then do traversal to maximize the sume of the two


Circular subarray equivalent to using two subarrays, as long as one is [0:i]


Solution is close, but I'm floundering
Need to slow down and think about it

Backsolutions: optimal from index forward
    Reverse it temporarily to make thinking easier

Problem running into on both:
    When using both, can't use optimal
    Have to use going forward
        Since for back, you need to get to the end to be able to use the front
Solved for front by using a frontRunningMax
Solved for back by using a backToTheEnd


Slowing down, thinking about this
Back solutions works for non-circular optimal
    But they can't be used for circular optimal

Circular optimal needs two data structures:
    frontRunningMax
        This one can actually try to maximize rather than taking additional characters mandatorily
    backRunningMax
        This one can also try to maximize by not taking bad numbers
            But, if take a number it has to take all numbers behind it

Back running max case:
    D[i] = Math.max(D[i-1], runningSumToBack + D[i])
        I.e. either don't take the number and use the last one
            Or take the number, but then have to take all the way to the back

Front running max is the same, just uses a frontward summation

Partial running sum fix backSolutions greediness?
    Problem: greedy on next value + optimal value is wrong because it skips
        If we want to take next value, we need to take all values in between
    Unlike bestFromBack, we don't have to go all the way to the back though
        Just to where our optimal starts from
    Solution: whenever we take current value alone (i.e. restart the subarray at that point) we need to start a running sum
*/