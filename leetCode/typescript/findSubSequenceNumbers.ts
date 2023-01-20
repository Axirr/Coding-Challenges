function findSubsequences(nums: number[]): number[][] {
    if (nums.length === 1) {
        return []
    }

    var resultSequences: { [key:string] : number[]} = {}
    var n:number = nums.length
    var workingSequences:number[][] = []
    var endpointsForSeq:number[] = []
    for (var i:number = 0; i < (n - 1); i++) {
        workingSequences.push([nums[i]])
        endpointsForSeq.push(i)
    }

    var undefinedCheckNumArr:number[] | undefined = workingSequences.pop()
    var undefinedCheckNum:number | undefined = endpointsForSeq.pop()
    var currentSeq:number[] = []; 
    var currentEnd:number = 0;
    if (undefinedCheckNumArr) {
        currentSeq = undefinedCheckNumArr
    }
    if (undefinedCheckNum) {
        currentEnd = undefinedCheckNum
    }

    var newSeq:number[] = []
    while (true) {
        while (currentEnd < n + 1) {
            if (nums[currentEnd + 1] >= currentSeq[currentSeq.length - 1]) {
                newSeq = [...currentSeq]
                newSeq.push(nums[currentEnd + 1])
                console.log(newSeq)
                workingSequences.push(newSeq)
                endpointsForSeq.push(currentEnd + 1)
                var stringName:string = JSON.stringify(newSeq)
                if (! (stringName in resultSequences)) {
                    resultSequences[stringName] = newSeq
                }
            }

            currentEnd += 1
        }
        

        if (workingSequences.length > 0) {
            undefinedCheckNumArr = workingSequences.pop()
            if (undefinedCheckNumArr !== undefined) {
                currentSeq = undefinedCheckNumArr
            }
            undefinedCheckNum = endpointsForSeq.pop()
            if (undefinedCheckNum !== undefined) {
                currentEnd = undefinedCheckNum
            }
        } else  { break }
    }

    var finalResult:number[][] = []
    for (const myKey of Object.keys(resultSequences)) {
        finalResult.push(resultSequences[myKey])
    }
    return finalResult
};

function numArrayEquality(first:number[][], second:number[][]) {
    if (first.length !== second.length) { return false}
    for (var i = 0; i < first.length; i++) {
        if (first[i] !== second[i])  {return false}
    }
    return true
}

function doubleArrayEquality(first:number[][], second:number[][]) {
    if (first.length !== second.length) { return false}
    for (var i=0; i < first.length; i++) {
        if (! numArrayEquality)  { return false}
    }
    return true
}

function ma() : void {
    var nums:number[];
    nums = [4,6,7,7]
    var outSeq:number[][];
    var correctSeq:number[][];
    outSeq = findSubsequences(nums)
    outSeq.sort((a,b) => b[0] - a[0])
    console.log(outSeq)
    correctSeq = [[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]
    correctSeq.sort((a,b) => b[0] - a[0])
    console.log(correctSeq)
    console.assert(doubleArrayEquality(outSeq, correctSeq))
}

ma()

/*
Data range/assumptions:
nums length n: [1, 15]
nums: [-100, 100]
*/

/*
Tests:
n = 1
n = 15
array not pre-sorted
*/

/*
Ideas:

Naive: generate all subsequences
    Test each one for non-decreasing

Better naive:
    Every non-descending subarray relies on a previous non-descending subarray
    Go through the list, making non-descending pair subarrays
        O(n)
    And keep their endpoints
    For each subarray that has not reached the end (i.e. endpoint != n - 1)
        Copy
        Add next character if it is >= last
        Add back to frontier if newEnd != n - 1

Problem: same starting point can create difference sequences
    E.g. 4, 6, 7 or 4, 7
*/