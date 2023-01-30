/**
 * @param {number} n
 * @return {number}
 */

var tribonacci = function(n) {
    var stack = [String(n)]
    var memo = {}
    memo['0'] = 0
    memo['1'] = 1
    memo['2'] = 1
    while (stack.length > 0) {
        var stringLastItem = stack[stack.length - 1]
        var intLastItem = Number(stringLastItem)

        if (stringLastItem in memo) {
            stack.pop()
            continue
        }

        var total = 0
        var stackLength = stack.length
        for (var i = 1; i < 4; i++) {
            var newItemString = String(intLastItem - i)
            if (!(newItemString in memo)) { stack.push(newItemString) }
            else { total += memo[newItemString] }
        }

        if (stackLength == stack.length) {
            memo[stringLastItem] = total
        }
    }
    return memo[String(n)]
};

function main() {
    var n
    var nthTerm
    n = 25
    nthTerm = tribonacci(n)
    console.log(nthTerm)
    console.assert(nthTerm == 1389537)
    n = 4
    nthTerm = tribonacci(n)
    console.log(nthTerm)
    console.assert(nthTerm == 4)
    n = 2
    nthTerm = tribonacci(n)
    console.log(nthTerm)
    console.assert(nthTerm == 1)
}

main()

/*
Data range/assumptions:
n: [0, 37]
*/

/*
Tests:
n = 0, 1, 2
n = 37
*/

/*
Ideas:

Dynamic programming tabulation
    But it doesn't use all numbers

Iterative Fibonacci with memoization
Object with some results in it
if object doesn't have it, add to stack with sub terms
*/