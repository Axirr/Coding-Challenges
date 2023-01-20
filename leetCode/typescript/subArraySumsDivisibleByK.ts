function subarraysDivByK(nums: number[], k: number): number {
    if (nums.length === 1) {
        return nums[0] % k === 0 ? 1 : 0
    }
    var divisibleSums:number = 0
    var modCounts: { [key: string]: number} = {}
    // var tempWorkingCounts: { [key: string]: number} = {}
    var currentOffset:number = 0
    var currentMod:number = 0

    for (var i=nums.length - 1; i >= 0; i--) {
        currentMod = nums[i] % k
        if (currentMod < 0)  { currentMod += k}
        // currentMod = (currentMod + currentOffset) % k
        // tempWorkingCounts = {}

        // Shift over
        // for (const key in modCounts) {
        //     var newKey:string = ((Number(key) + currentMod) % k).toString()
        //     tempWorkingCounts[newKey] = modCounts[key]
        // }
        // modCounts = tempWorkingCounts

        // var myKey = (currentMod + currentOffset) % k
        // var myKey = (currentMod + currentOffset) % k
        var myKey = (2 * currentMod) % k
        // var myKey = currentMod
        if (myKey.toString() in modCounts) {
            modCounts[myKey] += 1
        } else {
            modCounts[myKey] = 1
        }
        process.stdout.write('modCounts ')
        console.log(modCounts)
        if (currentMod in modCounts) {
            divisibleSums += modCounts[currentMod]
        }
        // if ('0' in modCounts) {
        //     divisibleSums += modCounts['0']
        // }
        // currentOffset = currentMod
        console.log(divisibleSums)

        
        // currentOffset = (currentOffset + currentMod) % k
        // if (i !== 0) {
        //     currentOffset = (currentOffset + currentMod) % k
        // }
        // if (i === 0) {
        //     console.log('i = 0')
        //     process.stdout.write('modCounts ')
        //     console.log(modCounts)
        //     console.log(`currentMod ${currentMod}`)
        //     console.log(`currentMod + currentOffset ${(currentMod + currentOffset) % k}`)
        //     console.log(`currentOffset ${currentOffset}`)
        //     if (currentMod in modCounts) {
        //         // divisibleSums = modCounts[(currentMod)]
        //         divisibleSums = modCounts[currentOffset]
        //     }
        //     console.log(divisibleSums)
        // }
    }
    console.log()

    // process.stdout.write('modCounts ')
    // console.log(modCounts)

    // if ('0' in modCounts) {
    //     divisibleSums = modCounts['0']
    // }
    // const mySum = nums.reduce((partialSum, a) => partialSum + a, 0);
    // if (mySum % k === 0)  { divisibleSums += 1}
    return divisibleSums
};

function naiveSubArraysDivByK(nums: number[], k: number): number {
    var divisibleSums:number = 0
    for (var i = 0; i < nums.length; i++) {
        var currentSum = nums[i]
        if (currentSum % k === 0)  {divisibleSums += 1}
        for (var j = i + 1; j < nums.length; j++) {
            currentSum += nums[j]
            if (currentSum % k === 0) {  divisibleSums += 1}
        }
    }
    return divisibleSums
}

function makeTestData(n:number) : void {
    // let minNum:number = -(10**4)
    // let maxNum:number = 10**4
    let minNum:number = -20
    let maxNum:number = 20

    // let minK:number = 2
    // let maxK:number = 10**5

    let minK:number = 2
    let maxK:number = 10

    // let minLen:number = 1
    // // let maxLen:number = 3 * 10**4
    // let maxLen:number = 10

    // let currentLen:number = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen
    // console.log(currentLen)

    var testData:number[] = []
    for (var i = 0; i < n; i++) {
        testData.push(Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum)
    }
    process.stdout.write("nums = ")
    console.log(testData)

    const currentK = Math.floor(Math.random() * (maxK - minK + 1)) + minK
    process.stdout.write("k = ")
    console.log(currentK)
}

function printError(calculated:number, correct:number, nums:number[], k:number) : void {
    console.log(`TEST ERROR for input ${nums}      k = ${k}`)
    console.log(`Calculated ${calculated}`)
    // correctDivCount = naiveSubArraysDivByK(nums, k)
    console.log(`Correct ${correct}`)
    // throw("")
}

function ma() {
    // makeTestData(7)
    var nums:number[];
    var k:number;
    var subArrayDivCount:number;
    var correctDivCount:number;
    nums = [5, 5, 5]
    k = 5
    subArrayDivCount = subarraysDivByK(nums, k)
    correctDivCount = naiveSubArraysDivByK(nums, k)
    if (subArrayDivCount !== correctDivCount)  { printError(subArrayDivCount, correctDivCount, nums, k)}
    nums = [4,1]
    k = 5
    subArrayDivCount = subarraysDivByK(nums, k)
    correctDivCount = naiveSubArraysDivByK(nums, k)
    if (subArrayDivCount !== correctDivCount)  { printError(subArrayDivCount, correctDivCount, nums, k)}
    // nums = [
    //     17, -5, 12, 15,
    //    -14,  5,  3
    //  ]
    // k = 10
    // subArrayDivCount = subarraysDivByK(nums, k)
    // correctDivCount = naiveSubArraysDivByK(nums, k)
    // if (subArrayDivCount !== correctDivCount)  { printError(subArrayDivCount, correctDivCount, nums, k)}
    nums = [5]
    k = 9
    subArrayDivCount = subarraysDivByK(nums, k)
    correctDivCount = naiveSubArraysDivByK(nums, k)
    if (subArrayDivCount !== correctDivCount)  { printError(subArrayDivCount, correctDivCount, nums, k)}
    nums = [
        19, 8, 15, -14,
        13, 3,  9
      ]
    k = 10
    subArrayDivCount = subarraysDivByK(nums, k)
    correctDivCount = naiveSubArraysDivByK(nums, k)
    if (subArrayDivCount !== correctDivCount)  { printError(subArrayDivCount, correctDivCount, nums, k)}
    nums = [4,5,0,-2,-3,1]
    k = 5
    subArrayDivCount = subarraysDivByK(nums, k)
    correctDivCount = naiveSubArraysDivByK(nums, k)
    if (subArrayDivCount !== correctDivCount)  { printError(subArrayDivCount, correctDivCount, nums, k)}
    nums = [-1,2,9]
    k = 2
    subArrayDivCount = subarraysDivByK(nums, k)
    correctDivCount = naiveSubArraysDivByK(nums, k)
    if (subArrayDivCount !== correctDivCount)  { printError(subArrayDivCount, correctDivCount, nums, k)}
    console.log("Tests completed.")
}

ma()

/*
Data range/assumptions:
nums length n: [1, 3 * 10^4]
nums: [-10^4, 10^4]
k: [2, 10^5]
*/

/*
Tests:
n = 1
n = largest
many negative nums
k small
k large
many nums divisible by k
*/

/*
Ideas:

Naive:
    For each n, construct sum of all subarrays iteratively
        n + n - 1 + ...
    O(n^2)

Better: dynamic programming, using pre calculated subarray divisibility
    For sum[i]
        nums[i] % k
        Then get count of complement of all subarrays smaller than that

Three issues:
    1) Answer off by 1 seemingly if whole array sum divisble by k
        Believe fixed by summing the whole thing
            Wasteful, but only O(n) so it's not bad in this problem
    2) How to update modCounts without those updates then being used to make new combinations
        Current bad solution: have a temporary array
            Have to create empty arrays of length k
        Better solutions:
            Record which ones are modified?
            Dictionary instead of an array
                Helps in average case
    3) Time complexity is now O(k * n)
        Not an improvement of worst case
        Or even the general case of k being decently large
            Helped by only keep subarray sums from one level before?
                If we are using a dictionary not an array
                Even then, last level has a good chunk of the subarrays

Instead of copying the array, can we just offset by the modulus of the current value?

Calculating offset:
    But for self, need to add in the right spot
        Not just currentMod, but uses currentOffset too

Incrementing pre-existing subarrays
    Can't just use increment them
    They will increment a (often) different key
        E.g. 1 + 3 increments 4
*/