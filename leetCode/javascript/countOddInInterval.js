/**
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var countOdds = function(low, high) {
    if (low === high)  { return low % 2; }

    let oddCount = Math.floor((high - low) / 2) + high % 2 + low % 2;
    if (low % 2 === 1 && high % 2 === 1)  { oddCount -= 1; }

    return oddCount;
};