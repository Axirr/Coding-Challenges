/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
    if (p.length > s.length)  { return []; }
    var letterCount = {}
    for (var i=0; i < p.length; i++) {
        var currentLetter = p[i];
        if (currentLetter in letterCount) {
            letterCount[currentLetter] = letterCount[currentLetter] + 1;
        } else { letterCount[currentLetter] = 1;}
    }

    var resultList = [];
    for (var i=0; i < s.length - (p.length - 1); i++) {
        currentIndex = i;
        currentLength = 0;
        letterSet = { ...letterCount };
        while (currentLength < p.length) {
            currentLetter = s[i + currentLength];
            if (!(currentLetter in letterSet))  { break; }
            if (letterSet[currentLetter] === 0) { break; }
            letterSet[currentLetter] -= 1;
            // if (s[i + currentLength] !== p[currentLength])  { break; }
            currentLength += 1;
        }
        if (currentLength === p.length)  { resultList.push(i); }
    }

    return resultList;
};

function arrayEquality(array1, array2) {
    if (array1.length != array2.length)  { return false; }
    for (var i=0; i < array1.length; i++) {
        if (array1[i] != array2[i]) {
            return false;
        }
    }
    return true;
}

var s = "cbaebabacd";
var p = "abc";
var anagramsList = []
var correctList = []
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
*/