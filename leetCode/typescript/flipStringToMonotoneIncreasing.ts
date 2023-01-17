function minFlipsMonoIncr(s: string): number {
    var minChanges:number = s.length
    var runningSumZeroes:number[] = []
    if (s[0] === '0') {
        runningSumZeroes.push(1)
    } else {
        runningSumZeroes.push(0)
    }
    for (var i:number = 1; i < s.length; i++) {
        runningSumZeroes.push(runningSumZeroes[i-1] + (s[i] === '0' ? 1 : 0))
    }
    console.log(runningSumZeroes)
    for (var i:number = 0; i < s.length; i++) {
        var potNewMinChanges:number = (i + 1) - runningSumZeroes[i] + (runningSumZeroes[s.length - 1] - runningSumZeroes[i])
        minChanges = Math.min(potNewMinChanges, minChanges)
    }
    minChanges = Math.min(minChanges, (runningSumZeroes[s.length - 1]))
    return minChanges
};

var s:string = "00110"
var minFlips:number = minFlipsMonoIncr(s)
console.log(minFlips)
console.assert(minFlips === 1)
s = "010110"
var minFlips:number = minFlipsMonoIncr(s)
console.log(minFlips)
console.assert(minFlips === 2)
s = "00011000"
var minFlips:number = minFlipsMonoIncr(s)
console.log(minFlips)
console.assert(minFlips === 2)
s = "100000001010000"
var minFlips:number = minFlipsMonoIncr(s)
console.log(minFlips)
console.assert(minFlips === 3)
s = "11011"
var minFlips:number = minFlipsMonoIncr(s)
console.log(minFlips)
console.assert(minFlips === 1)

/*
Data ranges/assumptions:
string length n: [1, 10^5]
characters are either 0 or 1
*/

/*
Tests:
n = 1
n = 10^5
Lots of changes
Not a lot of changes
Flip last works
*/

/*
Ideas:

Naive:
    Recursive, flip or don't flip?
    Pick a point to define as the transition, and count the flips needed
        Running sum of 0's
        For any point, changes is running sum of beforeLength - runningSumZeroes[0:i] + (runningSUmZeroes[i:0])
    
    Time complexity:
        running sum traversal: n
        all points traversal: n
*/