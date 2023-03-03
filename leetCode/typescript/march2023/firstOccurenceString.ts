function strStr(haystack: string, needle: string): number {
    let nextStart:number = 0;
    let i:number = 0;
    let needleFirst:string = needle[0];

    while (i < haystack.length) {
        nextStart = i + 1;
        if (needleFirst === haystack[i]) {
            let hayIndex:number = i + 1;
            let needleIndex:number = 1;
            while (hayIndex < haystack.length && needleIndex < needle.length) {
                if (haystack[hayIndex] !== needle[needleIndex])  break;
                if (haystack[hayIndex] === needleFirst) { 
                    nextStart = hayIndex; 
                    needleIndex++;
                    hayIndex++;
                    break;
                }

                needleIndex++;
                hayIndex++;
            }

            // Loop unrolling might be too fancy/overcomplicating
            // but it potentially removes two if checks
            while (hayIndex < haystack.length && needleIndex < needle.length) {
                if (haystack[hayIndex] !== needle[needleIndex])  break;

                needleIndex++;
                hayIndex++;
            }

            if (needleIndex === needle.length)  return i;
        }

        i = nextStart;
    }

    return -1;
}

function simpleStrStr(haystack: string, needle: string): number {
    for (let i:number = 0; i < haystack.length; i++) {
        const currentLetter = haystack[i];
        if (needle[0] === currentLetter) {
            if (searchStringFromIndex(haystack, needle, i))  return i;
        }
    }
    return -1;
};

function searchStringFromIndex(haystack:string, needle:string, startIndex:number): boolean {
    let hayIndex:number = startIndex;
    let needleIndex:number = 0;
    while (hayIndex < haystack.length && needleIndex < needle.length) {
        if (haystack[hayIndex] !== needle[needleIndex])  return false;

        needleIndex++;
        hayIndex++;
    }

    if (needleIndex === needle.length)  return true;
    return false;
}

function mainStrStr(): void {
    let haystack:string;
    let needle:string;
    let indexLocation:number;

    haystack = "sadbutsad";
    needle = "sad";
    indexLocation = strStr(haystack, needle);
    console.log(indexLocation);
    console.assert(indexLocation === 0);

    haystack = "leetcode";
    needle = "leeto";
    indexLocation = strStr(haystack, needle);
    console.log(indexLocation);
    console.assert(indexLocation === -1);

    haystack = "aabaaabaaac";
    needle = "aabaaac";
    indexLocation = strStr(haystack, needle);
    console.log(indexLocation);
    console.assert(indexLocation === 4);

    haystack = "abbabaaaabbbaabaabaabbbaaabaaaaaabbbabbaabbabaabbabaaaaababbabbaaaaabbbbaaabbaaabbbbabbbbaaabbaaaaababbaababbabaaabaabbbbbbbaabaabaabbbbababbbababbaaababbbabaabbaaabbbba";
    // let i = 118;
    // while (i < 126)  {
    //     console.log(haystack[i]);
    //     i++;
    // }
    // return;
    needle = "bbbbbbaa";
    indexLocation = strStr(haystack, needle);
    console.log(indexLocation);
    console.assert(indexLocation === 118);
}

mainStrStr();

/*
Data range/assumptions:
length haystack n, length needle k: [1, 10^4]
lowercase English letters
*/

/*
Tests:
n = 1
n = 10^4
k = 1
k = 10^4
not present
near start, middle, end
needle has many duplicates
*/

/*
Ideas:

Naive:
    Traverse to find first letter
    Separately look for needle from that index on
        I.e. to maintain current position
    Continue traversal if not found

    Time complexity worst case: haystack is xxxxxxxl and needle is same but one x longer
        So for each index we'd have to do an almost full search before determinging failure
        n * k

Better:
    Match a longer string before searching?
        At scale, a few extra letters won't help
    Progressively increase size of string search?
        Search for 3 characters, storing locations that match
        Then the next 3, etc.
        Does that even help though?
            Searches for low matches already terminate quickly
    Look for letters at start, middle, and end
        Just changing the cases that algorithm is good or bad at
        Shouldn't change efficiency absent knowledge about input distributions

Looked up a better one: sliding window
    Speedup: record next instance of needle start while during substring search
    So we can at least skip some traversals in the haystack
    Ultimately though, the speedup will be O(n), so is it that great?
*/

/*
Did it go well? yes
If not, why?
    Went with the naive solution, even though it seemed slow, but it worked
*/