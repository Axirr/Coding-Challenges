/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
    let shortestString = a;
    let longestString = b;
    if (b.length < a.length) {
        shortestString = b;
        longestString = a;
    }

    shortestString = "0".repeat(longestString.length - shortestString.length) + shortestString;

    let resultArray = [];
    let carry = 0;
    for (let i=longestString.length - 1; i >= 0; i--) {
        let letter1 = longestString[i];
        let letter2 = shortestString[i];
        let addedLetter;
        if (carry === 0) {
            carry = 0;
            if (letter1 === letter2) {
                addedLetter = "0";
                if (letter1 === "1")  carry = 1;
            } else {
                addedLetter = "1";
            }
        } else {
            carry = 1;
            if (letter1 !== letter2) {
                addedLetter = "0"
            } else {
                addedLetter = "1"
                if (letter1 === "0") carry = 0;
            } 
        }
        resultArray.push(addedLetter)
    }

    if (carry === 1) resultArray.push("1")
    resultArray.reverse()

    return resultArray.join("")
};

function mainAddBinary() {
    let a;
    let b;
    let addedString;
    
    a = "100";
    b = "110010";
    addedString = addBinary(a, b);
    console.log(addedString);
    console.assert(addedString === "110110");

    a = "1010";
    b = "1011";
    addedString = addBinary(a, b);
    console.log(addedString);
    console.assert(addedString === "10101");

    a = "11";
    b = "1";
    addedString = addBinary(a, b);
    console.log(addedString);
    console.assert(addedString === "100");
}

mainAddBinary()

/*
Data range/assumptions:
a and b length n: [1, 10^4]
No leading zeroes
*/

/*
Tests:
n = 1
n = 10^4
different lengths
"0"
*/

/*
Ideas:

Naive:
    Prepend zeroes to shortest one
    Add letter by letter, from back to front, using a carry
    Need to reverse
    Start by addind the carry if not 1
    Append from back to front
    Turn into string
*/