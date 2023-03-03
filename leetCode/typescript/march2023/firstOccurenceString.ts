function strStr(haystack: string, needle: string): number {
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
*/

/*
Did it go well? yes
If not, why?
    Went with the naive solution, even though it seemed slow, but it worked
*/