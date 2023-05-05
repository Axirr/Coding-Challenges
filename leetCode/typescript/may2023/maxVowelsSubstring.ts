import myAssert from "../march2023/Trie";

function maxVowels(s: string, k: number): number {
    let vowelArray:string[] = ['a','e','i','o','u'];
    let vowelRunningSum:number[] = [0];

    for (let i=0; i < s.length; i++) {
        let didFind:boolean = false;
        for (const char of vowelArray)  {
            if (char === s[i]) {
                didFind = true;
                break;
            }
        }

        if (didFind) {
            vowelRunningSum.push(vowelRunningSum[vowelRunningSum.length - 1] + 1);
        } else {
            vowelRunningSum.push(vowelRunningSum[vowelRunningSum.length - 1]);
        }
    }

    let maxVowels:number = 0;
    for (let i=k; i < s.length + 1; i++) {
        maxVowels = Math.max(maxVowels, vowelRunningSum[i] - vowelRunningSum[i - k]);
    }

    return maxVowels;
};

function mainMaxVowels():void {
    let s:string;
    let k:number;
    let result:number;
    let doQuitIfAssertFails:boolean = true;

    s = "weallloveyou";
    k = 7;
    result = maxVowels(s, k);
    console.log(`Final result ${result}`);
    myAssert(result === 4, doQuitIfAssertFails);

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

Solution weirdly slow relative to averages
Causes:
    Regular expressions overkill for this?
    Search each letter twice, possibly avoidable
Better:
    Running vowel sum and then just traverse again subtracting s[i - k] from s[i]
*/

/*
Completion time (minutes): 16
Question difficulty: Medium
    Really seemed more like an Easy
How did it go (0 - 6): 5
    Quick, only a few bugs
*/