/**
 * @param {number[]} num
 * @param {number} k
 * @return {number[]}
 */
var addToArrayForm = function(num, k) {
    let divisor = 1
    let carry = 0
    let i = 0;

    let tempNum = num
    tempNum.reverse()

    while (i < tempNum.length || k / divisor >= 1) {
        let addResult = Math.floor(k / divisor) % 10 + carry
        if (i < tempNum.length)  {
            addResult += num[i]
            tempNum[i] = addResult % 10;
        } else  tempNum.push(addResult % 10)

        carry = Math.floor(addResult / 10) % 10
        i += 1;
        divisor *= 10;
    }

    if (carry !== 0)  tempNum.push(carry)

    tempNum.reverse()
    return tempNum
};

function addToArrayMain() {
    let numArray;
    let k;
    let addedArray;

    numArray = [1, 2, 0, 0];
    k = 34
    addedArray = addToArrayForm(numArray, k);
    console.log(addedArray)
    // console.assert(addedArray === [1, 2, 3, 4])

    numArray = [2, 1, 5]
    k = 806
    addedArray = addToArrayForm(numArray, k);
    console.log(addedArray)
    // console.assert(addedArray === [1,0,2,1])

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

Better:
    Reverse num
    Dereverse num

Time complexity of simpler solution:
    Reverse = n
    Loop = n + max(log10(k) - n, 0)
        Slower than unrolled loops because conditionals included
    Reverse = n
    ~O(3n) or O(log10k)
*/