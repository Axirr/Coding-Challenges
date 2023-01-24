function maxSubarraySumCircular(nums: number[]): number {
    // Minimum subarray approach
    var maxSum:number = nums.reduce((partialSum, a) => partialSum += a, 0)
    var minSum = minSubArray(nums)
    return Math.max(maxSum + minSum, maxSum)
}

function minSubArray(nums: number[]): number {
    var minSum:number = -nums[0]
    var partialRunningSum:number = -nums[0]
    console.log(minSum)

    for (var i = 1; i < nums.length; i++) {
        var myNum:number = -nums[i]
        partialRunningSum = partialRunningSum + myNum
        if (myNum > partialRunningSum) {
            partialRunningSum = myNum
        }
        minSum = Math.max(minSum, partialRunningSum)
        console.log(minSum)
    }

    return minSum
};

function notWorkingMaxSubarraySumCircular(nums: number[]): number {
    var lastIndex:number = nums.length - 1

    if (lastIndex === 0) {
        return nums[0]
    }

    var backRunningSum:number = nums[lastIndex]
    var frontRunningSum:number = nums[0]
    var bestFromFrontToIndex:number = nums[0]
    var bestFromBackToIndex:number = nums[lastIndex]
    var partialBackRunningSum:number = nums[lastIndex]
    var maxSum:number = nums[lastIndex]

    var halfIndex:number = Math.floor(nums.length / 2)


    // Construct backwards stuff (runningSum, bestFromBack, backSolutions)
    for (var i = lastIndex - 1; i >= 0; i--) {
        partialBackRunningSum += nums[i]
        if (nums[i] > partialBackRunningSum) {
            partialBackRunningSum = nums[i]
        }
        maxSum = Math.max(maxSum, partialBackRunningSum)
    }

    var i:number = 1
    var frontLastUsed = 0
    var backLastUsed = lastIndex
    while (i <= lastIndex) {
        console.log(`i ${i}`)
        var backIndex = nums.length - 1 - i
        if (frontLastUsed >= backIndex && backLastUsed <= i)  { break }
        frontRunningSum += nums[i]
        backRunningSum += nums[backIndex]
        if (backIndex > frontLastUsed) {
            if (backRunningSum > bestFromBackToIndex) {
            console.log(`backIndex ${backIndex}`)
                backLastUsed = backIndex
                bestFromBackToIndex = backRunningSum
            }
        }
        if (i < backLastUsed) {
            if (frontRunningSum > bestFromFrontToIndex) {
            console.log(`frontIndex ${i}`)
                frontLastUsed = i
                bestFromFrontToIndex = frontRunningSum
            }
        }
        i++
    }

    maxSum = Math.max(maxSum, bestFromBackToIndex + bestFromFrontToIndex)

    return maxSum
};


function myMain() {
    var nums:number[]
    var maxSum:number
    // nums = [-92,78,-45,-63,1,34,81,50,14,91,
    //     -77,-54,13,-88,24,37,-12,59,-48,-62,
    //     57,-22,-8,85,48,71,12,1,-20,36,
    //     -32,-14,39,46,-41,75,13,-23,98,10,
    //     -88,64,50,37,-95,-32,46,-91,10,79,
    //     -11,43,-94,98,79,42,51,71,4,-30,2,74,4,10,61,98,57,98,46,43,-16,72,53,-69,54,-96,22,0,-7,92,-69,80,68,-73,-24,-92,-21,82,32,-1,-6,16,15,-29,70,-66,-85,80,50,-3]
    // maxSum = maxSubarraySumCircular(nums)
    // console.log(maxSum)
    // console.assert(maxSum === 1437)
    nums = [1,-2,3,-2]
    maxSum = maxSubarraySumCircular(nums)
    console.log(maxSum)
    console.assert(maxSum === 3)
    return
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
    nums = [2,-2,2,7,8,0]
    maxSum = maxSubarraySumCircular(nums)
    console.log(maxSum)
    console.assert(maxSum === 19)
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

Forward index to backward index formula:
    0 -> n - 1
    1 -> n - 2

Can I do this without having to store all the forward and backward sums?
    When they meet in the middle, no point in expanding into the other's territory?
        Counter example [1,10, -100,10]
            Best here would be 

Subarray can go as far as the other one isn't using

Not just about whether front or back get there first?
    Since one might be more optimal tham the other
    E.g. there's only negatives in the front, but there's a good number it gets to first to compensate it
        E.g. [1,-100,101, ..., 1]
            Where all num in ... > 0
            So we can take everything but the -100, but current method won't do this because front beats back

Solutions:
    When they meet, test subbing one number from one to the other?
        Don't always meet though
        Would have to go all the way to the end to figure it out
    Most solutions seem to need to store previous results/calculate all forward and back sums

Minimum subarray approach
    Reverse sign, and use Kadanes?
*/