var insert = function(intervals, newInterval) {
    let newIntMin = newInterval[0]
    let newIntMax = newInterval[1]
    var currentMin = newIntMin
    var currentMax = newIntMax
    var resultList = []
    for (var i = 0; i < intervals.length; i++) {
        currentInterval = intervals[i]
        // if (currentInterval[0] > newIntMax) {
        //     continue
        // }
        overlap = Math.min(currentInterval[1], newIntMax) - Math.max(currentInterval[0], newIntMin)
        if (Math.min(currentInterval[1], newIntMax) - Math.max(currentInterval[0], newIntMin) >= 0) {
            currentMin = Math.min(currentMin, currentInterval[0])
            currentMax = Math.max(currentMax, currentInterval[1])
        } else {
            resultList.push(currentInterval)
        }
    }
    var i = 0
    for (i = 0; i < resultList.length; i++) {
        if (resultList[i][0] > currentMin) {
            break
        }
    }

    resultList.splice(i, 0, [currentMin, currentMax])
    return resultList
};

var main = function() {
    intervals = [[1,3],[6,9]]
    newInterval = [2,5]
    resultList = insert(intervals, newInterval)
    console.log(resultList)
    console.assert(JSON.stringify(resultList) === JSON.stringify([[1,5], [6,9]]), "ERROR")
    intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]]
    newInterval = [4,8]
    resultList = insert(intervals, newInterval)
    console.log(resultList)
    console.assert(JSON.stringify(resultList) === JSON.stringify([[1,2],[3,10],[12,16]]), "ERROR")
}

main()

/**
 * Data range/assumptions:
 * number of intervals n: [0, 10^4]
 * interval values: [0, 10^5]
 * Intervals sorted in ascending order of start
 */

/**
 * Tests:
 * 0 internals
 * 1 interval
 * 10^4 intervals
 * New interval no overlap
 * New interval a lot of overlap
 */

/*
Ideas:
Naive:
    remove all intervals that overlap with new
    construct a new interval [min, max] of that set
    reinsert interval at previously saved index
Time complexity:
    Travers to find overlaps and min and max O(n)
    Construct new interval: O(n)
    Insert: O(n)

Is finding overlaps harder than  I think?
    Either boundary <= newMax and >= oldMax
    If currentEnd < newMin, can ignore
    If currentStart > newMax, can ignore
This isn't right:
    E.g. [0,10] overlaps with [5,6]
Overlap = min(maxes) - max(mins)
    If negative
        E.g. 6 - 5 = 1, overlap

Better: binary search to find the max index to consider based on start > newMax
    logn

Problem: overlapping are not necessarily contiguous:
    E.g. new [5,10]
        old [2,12], [3,9] [4, 12]
            First overlaps, second doesn't, third does
Solution: copy non-overlaps to newArray
 */