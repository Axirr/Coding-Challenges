import myAssert from '../march2023/Trie';

function numSimilarGroups(strs: string[]): number {
    if (strs.length === 1)  return 1;

    let groupCount:number = 0;
    let currentStrings:string[] = strs;

    while (currentStrings.length >= 1) {
        let matchCount = 1;
        let groupDefinerWord:string = currentStrings.pop()!;
        let newStrings:string[] = [];
        let groupStrings:string[] = [groupDefinerWord];

        while (currentStrings.length > 0) {
            let comparisonWord:string = currentStrings.pop()!;
            let similarFound:boolean = false;
            for (const word of groupStrings) {
                console.log(`comparing to ${word}`)
                if (isSimilar(word, comparisonWord)) {
                    similarFound = true;
                    break;
                }
            }
            console.log()

            if (similarFound) {
                matchCount++;
                groupStrings.push(comparisonWord);
            } else {
                newStrings.push(comparisonWord);
            }
        }
        console.log(`group ${groupStrings}`);
        currentStrings = newStrings;

        groupCount++;
    }

    return groupCount;
};

function isSimilar(str1: string, str2:string):boolean {
    let differenceCount:number = 0;
    for (let i = 0; i < str1.length; i++) {
        if (str1[i] !== str2[i]) {
            differenceCount++;
            if (differenceCount >= 3)  return false;
        }
    }

    return true;
}

function mainNumSimilarGroups():void {
    let strs:string[];
    let result:number;
    let doQuitIfAssertFails:boolean = true;

    strs = ["blw","bwl","wlb"];
    result = numSimilarGroups(strs);
    console.log(`Final result ${result}`);
    myAssert(result === 1, doQuitIfAssertFails);
    return

    strs = ["tars","rats","arts","star"];
    result = numSimilarGroups(strs);
    console.log(`Final result ${result}`);
    myAssert(result === 2, doQuitIfAssertFails);

    // strs = ["tars","rats","arts","star", "tsar", "tasr", "rtas"];
    // result = numSimilarGroups(strs);
    // console.log(`Final result ${result}`);
    // myAssert(result === 2, doQuitIfAssertFails);

    strs = ["omv","ovm"];
    result = numSimilarGroups(strs);
    console.log(`Final result ${result}`);
    myAssert(result === 1, doQuitIfAssertFails);

    strs = ["koqnn","knnqo","noqnk","nqkon"];
    result = numSimilarGroups(strs);
    console.log(`Final result ${result}`);
    myAssert(result === 3, doQuitIfAssertFails);

}

mainNumSimilarGroups();

/*
Data range/assumptions:
length strings n: [1, 300]
str[i] length k: [1, 300]
lowercase letters only
all words same length and anagrams
*/

/*
Tests:
n = 1
n = 300
str[i] length = 1
maxLength
non-similar
many non-similar some similar
two different groups of similar
    Word group for first one isn't the max group
*/

/*
Ideas:

Naive:
    For each word, compare similar for all others
    If not similar, start group for it and run check on any other not similar ones
    Time complexity (worst case):
        Worst case: no matches, n = k = 300
        n * k + n - 1 * k
        k * summation(n:1)
        k * n^2
        n^3

Naive check similar:
    Traverse, counting differences
    If more than 1, return false
    return true
    Time complexity: 0(n)

Naive match across groups:
    Check against each string in current group

Problem: ordering matters
    E.g. A -> B, B -> C, but ordering is [A, C, B]
        Actually, my evaluation is backwards but the point still stands
        C evaluated before B
            Found not matching
    Solution:
        Bad: restart every time we find a match
        Better: when match found, calculate the matches for that group 
            And combine
            Will it cycle?
        Simpler: run matches for each word and then merge sets?
            How would merge work?
                For each group, if share word, merge
            Could reset there?
                When find match, start again from the beginning?
*/

/*
Completion time (minutes):
Question difficulty:
How did it go (0 - 6):
*/