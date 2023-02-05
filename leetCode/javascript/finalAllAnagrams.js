/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
let findAnagrams = function(s, p) {
    if (p.length > s.length)  { return []; }

    // Get count for each letter in p
    let pLetterCount = {}
    for (let i=0; i < p.length; i++) {
        let currentLetter = p[i];
        if (currentLetter in pLetterCount) {
            pLetterCount[currentLetter] = pLetterCount[currentLetter] - 1;
        } else { pLetterCount[currentLetter] = -1;}
    }
    let uniqueLetters = Object.keys(pLetterCount);
    let countUniqueLetters = uniqueLetters.length;

    // Initialize negative counts for all potential letters in s
    let sLetterCount = {...pLetterCount};
    let alpha = "abcdefghijklmnopqrstuvwxyz";
    for (let i=0; i < alpha.length; i++) {
        let letter = alpha[i];
        if (!(letter in sLetterCount)) {
            sLetterCount[letter] = 0;
        }
    }

    // Initialize count for anagram starting at 0
    for (let i=0; i < p.length; i++) {
        let currentLetter = s[i];
        if (currentLetter in pLetterCount) {
            sLetterCount[currentLetter] += 1;
        } else { sLetterCount[currentLetter] += 1;}
    }

    let sZeroCount = 0;
    let badNonZeroCount = 0;
    for (let letter in sLetterCount) {
        if (letter in pLetterCount) {
            if (sLetterCount[letter] === 0)  { sZeroCount += 1; }
        } else {
            if (sLetterCount[letter] !== 0)  { badNonZeroCount += 1;}
        }
    }

    let resultList = [];
    if (sZeroCount === countUniqueLetters && badNonZeroCount === 0)  { resultList.push(0); }

    for (let i=1; i < (s.length - (p.length - 1)); i++) {
        let removeLetter = s[i - 1];
        let addLetter = s[i + (p.length -1)];
        sLetterCount[addLetter] += 1;
        if (addLetter in pLetterCount) {
            if (sLetterCount[addLetter] === 1)  { sZeroCount -= 1; }
            else if (sLetterCount[addLetter] === 0)  { sZeroCount += 1; }
        } else {
            if (sLetterCount[addLetter] === 0)  { badNonZeroCount -= 1; }
            else if (sLetterCount[addLetter] === 1)  { badNonZeroCount += 1; }
        }

        sLetterCount[removeLetter] -= 1;
        if (removeLetter in pLetterCount) {
            if (sLetterCount[removeLetter] === -1)  { sZeroCount -= 1; }
            else if (sLetterCount[removeLetter] === 0)  { sZeroCount += 1; }
        } else {
            if (sLetterCount[removeLetter] === 0)  { badNonZeroCount -= 1; }
            else if (sLetterCount[removeLetter] === -1)  { badNonZeroCount += 1; }
        }

        if (sZeroCount === countUniqueLetters && badNonZeroCount === 0)  { resultList.push(i); }
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

let s;
let p;
let anagramsList = []
let correctList = []

s= "eklpyqrbgjdwtcaxzsnifvhmouekl"
p = "yqrbgjdwtcaxzsnifvhmou"
anagramsList = findAnagrams(s, p);
console.log(anagramsList)
correctList = [4];
console.assert(arrayEquality(anagramsList, correctList))

s = "cbaebabacd";
p = "abc";
anagramsList = findAnagrams(s, p);
correctList = [0,6]
console.log(anagramsList)
console.assert(arrayEquality(anagramsList, correctList))

s = "abab";
p = "ab";
anagramsList = findAnagrams(s, p);
correctList = [0, 1, 2];
console.log(anagramsList)
console.assert(arrayEquality(anagramsList, correctList))

s = "baa"
p = "aa"
anagramsList = findAnagrams(s, p);
correctList = [1];
console.log(anagramsList)
console.assert(arrayEquality(anagramsList, correctList))


/*
Data range/assumptions:
string lengths: [1, 3 * 10^4]
all lowercase
*/

/*
Tests:
n = 1
n = 3 * 10^4
p.length > s.length
overlapping
p has double letters?
s has double letters
    E.g. aabc
*/

/*
Ideas:

Naive:
    For each letter in s
        Traverse until have found all letters in found too many
            Use set of letter counts?
    summation [n, 1] -> n^2

Better:
    Simultaneous search
    Letter counts
        Running count of letters n
            Resetting whenever get to too many?
                Seems incomplete

Better solution: keep a rolling set of the counts of the current substring
    Then substract count of furthest and add count of the next
    O(n)

What to do about letters only in s not p?
    Initialize sLetterCount to include all letters
    Keep separate count of badZeroes
        Match if badNonZeroes = 0 and goodZeroes = uniqueLetters

How to handle zero count increment
    For add, we care about going -1, 0 or 0 -> 1
        Result only, we care about 0 and 1
    For minus, we care about going 1 -> 0 or 0 -> -1
*/