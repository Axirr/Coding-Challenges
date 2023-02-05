/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    if (x >= -9 && x <= 9)  { return x; }

    var isNegative = false;
    if (x < 0) {
        x = -x;
        isNegative = true;
    }
    var numDigits;

    numDigits = Math.ceil(Math.log10(x))
    if (10 ** numDigits === x)  { numDigits += 1; }
    var divisor = 1;

    var resultList = []
    while (numDigits > 0) {
        var newDigit = Math.floor((x / divisor)) % 10;
        resultList.push(newDigit);
        divisor *= 10;
        numDigits -= 1;
    }

    for (var i=0; i < resultList.length; i++) {
        if (resultList[i] !== 0)  { break; }
    }

    if (i !== 0) {
        resultList = resultList.slice(i);
    }

    var resultInt = parseInt(resultList.join(''));
    if (isNegative)  { resultInt *= -1; }
    if (resultInt > (2 ** 31) - 1 || resultInt < -1 * (2 ** 31))  { return 0; }
    return resultInt
};

var x = 123;
var revX = 123;

x = 123;
revX = reverse(x);
console.log(revX)
console.assert(revX === 321)

x = -123
revX = reverse(x);
console.log(revX)
console.assert(revX === -321)

x = 120;
revX = reverse(x);
console.log(revX)
console.assert(revX === 21)

x = 0;
revX = reverse(x);
console.log(revX)
console.assert(revX === 0)

x = 10;
revX = reverse(x);
console.log(revX)
console.assert(revX === 1)

x = 1534236469;
revX = reverse(x);
console.log(revX)
console.assert(revX === 0)

x = 1563847412
revX = reverse(x);
console.log(revX)
console.assert(revX === 0)


/*
Data range/assumptions:
x: [-2^31, 2^31 - 1]
*/

/*
Tests:
negative num
positive num
big num
0
*/

/*
Ideas:

log 10 lets you know how many digits

Naive:
    ceil x log 10
        Problem: exactly equal
    append to 
*/