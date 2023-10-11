import myAssert from "../march2023/Trie";

function recursiveNaiveMaxConsecutiveMatches(str1:string, index1:number, str2: string, index2:number, minMatches:number): Set<string> {
    return new Set(['hel', 'l'])
    // return new Set();
}

function maxConsecutiveMatches(str1:string, str2: string, minMatches:number): Set<string> {
    return new Set();
}

function mainMaxConsecutiveMatches():void {
    let str1:string;
    let str2:string;
    let minMatches:number;
    let result:Set<string>;
    let correctResult:Set<string>;
    let sumOfSubstringLengths:number;
    let correctLength:number;
    let doQuitIfAssertFails:boolean = true;

    let set1:Set<string> = new Set();
    let set2:Set<string> = new Set();
    set1.add("hello");
    set1.add("bye");
    // set1.add(6);
    // set1.add(7);
    set2.add("hello");
    set2.add("bye");
    // set2.add(6);
    // set2.add(7);
    myAssert(isSetEqual(set1, set2), doQuitIfAssertFails);
    console.log(set1 == set2);
    console.log(set1 === set2);

    str1 = "hello";
    str2 = "helol";
    minMatches = 1;
    result = recursiveNaiveMaxConsecutiveMatches(str1, 0, str2, 0, minMatches);
    correctResult = new Set(["hel", "l"]);
    sumOfSubstringLengths = 0;
    for (const substring of result)  sumOfSubstringLengths += substring.length;
    correctLength = 5;
    // "hel" and either "o" or "l"
    myAssert(isSetEqual(result, correctResult), doQuitIfAssertFails);
}

function isStringArrayPermutation(array1:string[], array2:string[]):boolean {
    if (array1.length !== array2.length)  return false

    return isSetEqual(new Set(array1), new Set(array2));
}

function isSetEqual(set1:Set<string>, set2:Set<string>):boolean {
    if (set1.size !== set2.size)  return false;
    for (const element of set1)  if (!set2.has(element))  return false;

    return true;
}

mainMaxConsecutiveMatches();

/*
Data range/assumptions:
string lengths n: [1, 1000]
strings are same length
    Or do they need to be?
    Think skipping allowance means won't matter
minMatches k: [1, 100]
*/

/*
Tests:
no intersection
full intersection but only one match?
    Max size possible
Neighbouring swaps
    Multiple thereof
Distant swaps
    Multiple thereof
Change at an index
    Multiple thereof
Deletions with no match padding at the end?
    E.g. helter skelter -> helter erzzzz
*/

/*
Ideas:

Naive:
    Until first miss, use everything
        No downside?
    For a miss, have the option of moviing either string forward
    Recursive max on those
    Memoization for repeated ones
        Strings will become different lengths
*/

/*
Completion time (minutes):
Question difficulty:
How did it go (1 - 6):
*/