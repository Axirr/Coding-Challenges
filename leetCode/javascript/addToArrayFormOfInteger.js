/**
 * @param {number[]} num
 * @param {number} k
 * @return {number[]}
 */
var addToArrayForm = function(num, k) {
    let divisor = 1
    let carry = 0
    let i;
    for (i=num.length - 1; i >= 0; i--) {
        let addResult = num[i] + Math.floor(k / divisor) % 10 + carry
        carry = Math.floor(addResult / 10) % 10
        num[i] = addResult % 10;
        divisor *= 10;
        // if (k / divisor < 1) { break; }
    }
    if (carry !== 0 && k / divisor < 1) {
        num.splice(0, 0, carry)
    }

    let prefixArray = []
    while (k / divisor >= 1) {
        let addResult = Math.floor(k / divisor) % 10 + carry
        carry = Math.floor(addResult / 10) % 10;
        addResult = addResult % 10
        prefixArray.push(addResult)
        divisor *= 10;
    }

    if (prefixArray.length > 0) {
        if (carry !== 0) { prefixArray.push(carry) }
        prefixArray.reverse()
        num.forEach(value => prefixArray.push(value))
        num = prefixArray
    }

    return num
};

function addToArrayMain() {
    let numArray;
    let k;
    let addedArray;

    numArray = [1, 2, 0, 0];
    k = 34
    addedArray = addToArrayForm(numArray, k);
    console.log(addedArray)
    console.assert(addedArray.reduce((partialSum, x) => partialSum += x, 0) === 10)

    numArray = [2, 1, 5]
    k = 806
    addedArray = addToArrayForm(numArray, k);
    console.log(addedArray)
    console.assert(addedArray.reduce((partialSum, x) => partialSum += x, 0) === 4)

    numArray = [0, 0, 0, 0]
    k = 999999
    addedArray = addToArrayForm(numArray, k);
    console.log(addedArray)
    console.assert(addedArray.reduce((partialSum, x) => partialSum += x, 0) === 9 * 6)
}

addToArrayMain()

/*
Data range/assumptions:
num length n: [1, 10^4]
num[i] values: [0, 9]
no leading zeroes
k: [1, 10^4]
*/

/*
Tests:
n = 1
n = 10^4
k = 1
k = 10^4
digit rollover
*/

/*
Ideas:

Naive:
    Get k digits
    floor(k/divisor) % 10 can get each digit
    Add until run out

What if k is longer:
    Create separate array, and then combine the two
        Rather than append at the front
*/