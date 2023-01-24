// function insert(intervals: number[][], newInterval: number[]): number[][] {
function myInsert(intervals: number[][], newInterval: number[]): number[][] {
    let newIntMin:number = newInterval[0]
    let newIntMax:number = newInterval[1]
    var currentMin:number = newIntMin
    var currentMax:number = newIntMax
    var resultList:number[][] = []

    var i:number;
    for (i = 0; i < intervals.length; i++) {
        var currentIntervalMin:number = intervals[i][0]

        // Break if guaranteed that current and future intervals will not overlap
        // because start is already outside range
        if (currentIntervalMin > newIntMax) {
            break
        }

        var currentIntervalMax:number = intervals[i][1]

        // Calculating if two intevals overlap
        if (Math.min(currentIntervalMax, newIntMax) - Math.max(currentIntervalMin, newIntMin) >= 0) {
            currentMin = Math.min(currentMin, currentIntervalMin)
            currentMax = Math.max(currentMax, currentIntervalMax)
        } else {
            resultList.push(intervals[i])
        }
    }

    // Binary search for location to insert at
    var low:number = 0
    var high:number = resultList.length
    var middle:number = Math.floor((low + high) / 2)
    while (low < high) {
        middle = Math.floor((low + high) / 2)
        if (resultList[middle][0] >= currentMin) {
            high = middle - 1
        } else {
            low = middle + 1
        }
    }
    resultList.splice(low, 0, [currentMin, currentMax])

    // Appending remaining items using same i variable
    for (i; i < intervals.length; i++) {
        resultList.push(intervals[i])
    }

    return resultList
};

function myMain(): void {
    var intervals:number[][] = [[1,3],[6,9]]
    var newInterval:number[] = [2,5]
    var resultList:number[][] = myInsert(intervals, newInterval)
    console.log(resultList)
    console.assert(JSON.stringify(resultList) === JSON.stringify([[1,5], [6,9]]), "ERROR")
    intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]]
    newInterval = [4,8]
    resultList = myInsert(intervals, newInterval)
    console.log(resultList)
    console.assert(JSON.stringify(resultList) === JSON.stringify([[1,2],[3,10],[12,16]]), "ERROR")
}

myMain()