import myAssert from "../march2023/Trie";

function longestPalindromeSubseq(s: string): number {
    return naiveRecursive(s);
}

function naiveRecursive(s:string):number {
    let n:number = s.length;
            
    let memo:Map<string, number> = new Map();

    return lps(0, n - 1, memo, s);
}

function lps(l:number, r:number, memo:Map<string, number>, s:string):number {

    if (memo.has([l, r].toString())) {
        return memo.get([l,r].toString())!;
    }

    if (l > r) {
        return 0
    }

    if (l == r) {
        return 1
    }

    if (s[l] === s[r]) {
        memo.set([l,r].toString(), lps(l + 1, r - 1, memo, s) + 2);
    } else {
        memo.set([l,r].toString(), Math.max(lps(l, r - 1, memo, s), lps(l + 1, r, memo, s)));
    }

    let returnValue:number = memo.get([l, r].toString())!;
    return returnValue;
}

function wrongLongestPalindromeSubseq(s: string): number {
    let validPalindromes:number[][] = [];
    let maxLength:number = 1;
    let maxIndex:number = s.length - 1;


    // Some way to construct this so I only add validly expandable ones
    for (let i = 0; i < s.length; i++)  validPalindromes.push([i, i])
    for (let i = 0; i < s.length - 1; i++)  {
        if (s[i] === s[i+1]) {
            validPalindromes.push([i, i + 1])
        }
    }

    if (validPalindromes.length > s.length)  maxLength = 2;

    let currentPalindrome:number[] = validPalindromes.pop()!
    while (validPalindromes.length > 0) {
        currentPalindrome = validPalindromes.pop()!;
        let startIndex:number = currentPalindrome[0];
        let endIndex:number = currentPalindrome[1];

        if (startIndex === 0 || endIndex === maxIndex)  continue;

        let newStart:number = startIndex - 1;
        let newEnd:number = endIndex - 1;
        if (s[newStart] === s[newEnd]) {
            maxLength = Math.max(maxLength, newEnd - newStart + 1);
            validPalindromes.push([newStart, newEnd]);
        }
    }

    return maxLength;
};

function mainLongestPalindrome():void {
    let s:string;
    let result:number;
    let doQuitIfAssertFails:boolean = false;

    s = "bbbab";
    result = longestPalindromeSubseq(s);
    console.log(`Final result ${result}`);
    myAssert(result === 4, doQuitIfAssertFails);

    s = "cbbd";
    result = longestPalindromeSubseq(s);
    console.log(`Final result ${result}`);
    myAssert(result === 2, doQuitIfAssertFails);
}

mainLongestPalindrome();

/*
Data range/assumptions:
length string n: [1, 1000]
lowercase English letters
*/

/*
Tests:
n = 1
n = 1000
full string
single character
double letters
*/

/*
Ideas:

Naive:
    Construct all substrings
    And check

Better:
    Dynamic programming
    Each plaindrome starts from a one-length or two length valid palindrome
    D[i:j] = if i === j and D[i+1:j-1] is a palindrome
    Only lengthen for valid palindrome
    Plaindrome format:
        Start:end
    
    Time complexity:
        n + n - 1 + ... + 1
        n^2
        Works for 1000

Misunderstood problem
It's all subsequences with deletions

Recursive for any valid palindrome
Can still use start:end format, but just store length manually
Expand by trying to find some pair of matches

Options:
    If match, take both, length increases by 2
    If not:
        Take one, if match can be found
        Skip left
        Skip right
        Skip both

Seems like too many options
And searching for a match seems inefficient
*/

/*
Completion time (minutes): 100
Question difficulty: medium
How did it go (0 - 6): 1
    Had to look up the solution
*/