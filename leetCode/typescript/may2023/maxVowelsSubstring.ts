import myAssert from "../march2023/Trie";

function maxVowels(s: string, k: number): number {
    let vowelCount:number = 0;

    let vowelRegExp:RegExp = new RegExp('[aeiou]');

    for (let i=0; i < k; i++) {
        if (s[i].match(vowelRegExp)) {
            vowelCount++;
        }
    }

    let maxVowels:number = vowelCount;

    for (let i=k; i < s.length; i++) {
        let lastLetter:string = s[i - k];
        let newLetter:string = s[i];

        if (lastLetter.match(vowelRegExp)) {
            vowelCount--;
        }
        if (newLetter.match(vowelRegExp)) {
            vowelCount++;
        }

        maxVowels = Math.max(maxVowels, vowelCount);
    }

    return maxVowels;
};

function mainMaxVowels():void {
    let s:string;
    let k:number;
    let result:number;
    let doQuitIfAssertFails:boolean = true;

    s = "abciiidef";
    k = 3;
    result = maxVowels(s, k);
    console.log(`Final result ${result}`);
    myAssert(result === 3, doQuitIfAssertFails);

    s = "aeiou";
    k = 2;
    result = maxVowels(s, k);
    console.log(`Final result ${result}`);
    myAssert(result === 2, doQuitIfAssertFails);

    s = "leetcode";
    k = 3;
    result = maxVowels(s, k);
    console.log(`Final result ${result}`);
    myAssert(result === 2, doQuitIfAssertFails);
}

mainMaxVowels();

/*
Data range/assumptions:
length s n: [1, 10^5]
k: [1, n]
lowercase letters
*/

/*
Tests:
n = 1
n = max
k = 1
k = max
all vowels
no vowels
lots of vowels but spread out
*/

/*
Ideas:

Naive:
    Winodw of size k
    Count vowels in initial
    Traverse
    For remove/added
        Substract or add to vowel count
    Subtracting removed
    Time complexity:
        O(n)
*/

/*
Completion time (minutes):
Question difficulty:
How did it go (0 - 6):
*/