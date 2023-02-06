/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number[]}
 */
var NOTWORKINGshuffle = function(nums, n) {
    let i = 1;
    // let temp = nums[n+1];
    let destination;
    while (i < n) {
        let temp = nums[n+i]
        let firstDestination = 2 * i
        let temp2 = nums[firstDestination]
        nums[firstDestination] = temp
        let secondDestination = i * 2 + 1
        temp = nums[secondDestination]
        nums[secondDestination] = temp2
        let thirdDestination = i * 2 + 2


        i += 1
    }
    return nums;
}

var shuffle = function(nums, n) {
    let resultList = [];
    let i;
    for (i=0; i < n; i++) {
        resultList.push(nums[i]);
        resultList.push(nums[i + n]);
    }
    return resultList;
};

function arrayEquality(array1, array2) {
    if (array1.length != array2.length)  { return false; }
    for (let i=0; i < array1.length; i++) {
        if (array1[i] != array2[i]) {
            return false;
        }
    }
    return true;
}

function main() {
    let nums;
    let n;
    let resultList = [];
    let correctList = [];

    nums = [2,5,1,3,4,7]
    n = 3
    resultList = shuffle(nums, n);
    console.log(resultList)
    correctList = [2,3,5,4,1,7];
    console.assert(arrayEquality(resultList, correctList));
}

main()

/*
Data range/assumptions:
2n: [2, 1000]
nums: [1, 10^3]
*/

/*
Tests:
n = 2
n = 1000
*/

/*
Ideas:

Naive:
    Calc midpoint index
    Build array doing i, then i + midpoint
    Time: O(n)

In place (to see if I can):
    One temp variable won't do it
    Instead, have to follow the index order?
        E.g. 1 replaces x, then put x in y, then do y next, etc...
    But that will just be alternating, so single temp should work

Back half, subtract n to get place
Front half, add current 2 * (count - 1) to get place
    E.g. x3 has to moved forward by 2, because y1 and y2 newly in there
        x1 and x2 also moved, but they were already in there

That way seems awfully complicated

y -> x then x -> y
E.g. length 8
    4 is first of back
    4 -> 1
    1 -> 2 * 1 -> 2
    2 -> 4
        Already used 4, increment to 5?
    5 -> 2 * 1 + 1 -> 3
    3 -> 6
*/