/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    if (x === 0)  return 0;

    let oldApprox = x;
    let approx = (oldApprox + x/oldApprox) / 2;
    let epsilon = 0.01;

    while (oldApprox - approx > epsilon) {
        oldApprox = approx;
        approx = (approx + x/approx) / 2;
    }

    return Math.floor(approx);
};

function mySqrtMain() {
    let num;
    let sqrtResult;

    num = 4;
    sqrtResult = mySqrt(num);
    console.log(sqrtResult);
    console.assert(sqrtResult === 2);

    num = 8;
    sqrtResult = mySqrt(num);
    console.log(sqrtResult);
    console.assert(sqrtResult === 2);
}

mySqrtMain()

/*
*/

/*
*/

/*
*/

/*
Did it go well?
If not, why?
*/