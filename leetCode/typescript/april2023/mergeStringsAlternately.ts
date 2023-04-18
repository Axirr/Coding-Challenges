import myAssert from "../march2023/Trie";

function mergeAlternately(word1: string, word2: string): string {
    let merged:string[] = [];
    let word1index:number = 0;
    let word2index:number = 0;

    while (word1index < word1.length && word2index < word2.length) {
        if (word1index <= word2index) {
            merged.push(word1[word1index]);
            word1index++;
        } else {
            merged.push(word2[word2index]);
            word2index++;
        }
    }

    while (word1index < word1.length) {
        merged.push(word1[word1index]);
        word1index++;
    }

    while (word2index < word2.length) {
        merged.push(word2[word2index]);
        word2index++;
    }

    return merged.join("");
};

function mainMergeAlternately():void {
    let word1:string;
    let word2:string;
    let merged:string;
    let doQuitIfAssertFails:boolean = true;

    word1 = "abc";
    word2 = "pqr";
    merged = mergeAlternately(word1, word2);
    console.log(`Final result ${merged}`);
    myAssert(merged === "apbqcr", doQuitIfAssertFails);

    word1 = "ab";
    word2 = "pqrs";
    merged = mergeAlternately(word1, word2);
    console.log(`Final result ${merged}`);
    myAssert(merged === "apbqrs", doQuitIfAssertFails);

    word1 = "abcd";
    word2 = "pq";
    merged = mergeAlternately(word1, word2);
    console.log(`Final result ${merged}`);
    myAssert(merged === "apbqcd", doQuitIfAssertFails);
}

mainMergeAlternately();

/*
Data range/assumptions:
n: [1, 100]
lowercase English
*/

/*
Tests:
n = 1
n = 100
same length
different length
*/

/*
Ideas:

Naive:
*/

/*
Completion time (minutes): 6
Question difficulty: Easy
How did it go (0 - 6): 6
    Simple solution
    No bugs
*/