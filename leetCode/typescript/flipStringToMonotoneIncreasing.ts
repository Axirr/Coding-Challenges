function minFlipsMonoIncr(s: string): number {
    // D[i] = D[i - 1] if s[i - 1] === '1'
    // D[i] = min(d[i - 1] + 1, i - d[i - 1]) if s[i - 1] === '0'
    var lastResult:number = 0
    var runningOnes:number = 0
    for (var i:number = 0; i < s.length; i++) {
        if (s[i] !== '1') {
            lastResult = Math.min(lastResult + 1, runningOnes)
        } else {
            runningOnes += 1
        }
    }
    return lastResult
}

function firstMinFlipsMonoIncr(s: string): number {
    var minChanges:number = s.length
    var runningSumZeroes:number[] = []
    runningSumZeroes.push(s[0] === '0' ? 1 : 0)

    // Create running sum of 0's
    for (var i:number = 1; i < s.length; i++) {
        runningSumZeroes.push(runningSumZeroes[i-1] + (s[i] === '0' ? 1 : 0))
    }

    // Test how many changes at each point to split the string in two
    let lastIndex:number = s.length - 1
    for (var i:number = 0; i < s.length; i++) {
        var potNewMinChanges:number = (i + 1) - runningSumZeroes[i] + (runningSumZeroes[lastIndex] - runningSumZeroes[i])
        minChanges = Math.min(potNewMinChanges, minChanges)
    }

    // Check if changing to all 1's is the min
    minChanges = Math.min(minChanges, (runningSumZeroes[lastIndex]))

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

Dynamic programming way:
    s[i] === '1' is simple case
        Use last result
            Since last result is valid already and can always add a 1
    === '0'
        Two options
        Incrememnt flip by 1
            To convert it into a 1, and thus ensure it is valid
        Flip any ones in previous
*/