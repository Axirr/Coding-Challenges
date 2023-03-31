import myAssert from "./Trie";

function isScramble(s1: string, s2: string): boolean {
    // Dyanmic programming D[length][start1][start2]
    let length:number = 1;
    let n:number = s1.length;
    let resultsTable:boolean[][][] = [];
    for (let i = 0; i < n; i++) resultsTable.push([]);

    while (length <= n) {
        let anyTrue:boolean = false;
        for (let i = 0; i < n - length; i++) {
            for (let j = 0; j < n - length; i++) {
                if (length === 1) resultsTable[length][i][j] = s1[i] === s2[j]
            }
        }
        // Arrays for each

        // Sort arrays, and check equality

        /*
        Only try for indices that can work?
            I.e. have a length - 1 problem that works
        Non-working indices can become working no?
            Still need to include a working sub-problem?
        Try expanding in either direction?
        */
       length++;
    }
    console.log(resultsTable);

    return resultsTable[n][0][0];
}

function notWorkingIsScramble(s1: string, s2: string): boolean {
    if (s1.length === 1 && s2.length === 1)  return s1 === s2;

    let n:number = s1.length;
    let s1letterCount:Map<string, number> = new Map();
    let s2letterCount:Map<string, number> = new Map();

    for (let i = 0; i < n; i++) {
        let currentLetter:string = s1[i];
        let currentMap:Map<string, number> = s1letterCount;
        if (!currentMap.has(currentLetter))  currentMap.set(currentLetter, 1);
        else currentMap.set(currentLetter, currentMap.get(currentLetter)! + 1);

        currentLetter = s2[i];
        currentMap = s2letterCount;
        if (!currentMap.has(currentLetter))  currentMap.set(currentLetter, 1);
        else currentMap.set(currentLetter, currentMap.get(currentLetter)! + 1);
    }

    if (s1letterCount.size !== s2letterCount.size)  return false;
    for (const pair of s1letterCount) {
        if (s1letterCount.get(pair[0]) !== s2letterCount.get(pair[0]))  return false;
    }

    return recursiveIsScramble(s1, s2, 0, n - 1);
};

function recursiveIsScramble(s1: string, s2: string, startIndex:number, endIndex:number):boolean {
    let s1orderPairs:Map<string, Set<string>> = new Map();
    let s2orderPairs:Map<string, Set<string>> = new Map();
    let n = s1.length;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            let currentString:string = s1;
            let currentMap:Map<string, Set<string>> = s1orderPairs;

            if (!currentMap.has(currentString[i]))  currentMap.set(currentString[i], new Set(currentString[j]))
            else currentMap.get(currentString[i])!.add(currentString[j])

            currentString = s2;
            currentMap = s2orderPairs;

            if (!currentMap.has(currentString[i]))  currentMap.set(currentString[i], new Set(currentString[j]))
            else currentMap.get(currentString[i])!.add(currentString[j])
        }
    }

    for (const currentLetter of s1orderPairs.keys()) {
        let s1Infront:Set<string> = s1orderPairs.get(currentLetter)!
        let s2Infront:Set<string> = s2orderPairs.get(currentLetter) === undefined ? new Set() : s2orderPairs.get(currentLetter)!;
        let xor:Set<string> = new Set();
        let temp:string[] = [...s1Infront].filter((x) => !s2Infront.has(x));
        for (const element of temp) xor.add(element);
        temp = [...s2Infront].filter((x) => !s1Infront.has(x));
        for (const element of temp) xor.add(element);
        console.log(xor)

        if (xor.size > 0) {
            xor.add(currentLetter);
            let frontXor:Set<string> = new Set([...xor]);
            let backXor:Set<string> = new Set([...xor]);
            let currentIndex:number = 0;
            while (currentIndex < n) {
                let frontLetter:string = s2[currentIndex];
                let backLetter:string = s2[n - 1 - currentIndex];
                frontXor.delete(frontLetter);
                backXor.delete(backLetter);
                
                if (frontXor.size === 0) {
                    let subResult:boolean = recursiveIsScramble(s1, s2, 0, currentIndex)
                    if (subResult)  return true;
                }

                if (backXor.size === 0) {
                    let subResult:boolean = recursiveIsScramble(s1, s2, currentIndex + 1, n - 1)
                    if (subResult)  return true;
                }

                console.log("May want to try longer strings");
                if (frontXor.size === 0 && backXor.size === 0) break;

                currentIndex++;
            }
        }
    }

    return false;
}

function mainIsScramble():void {
    let s1:string;
    let s2:string;
    let result:boolean;
    let doQuit:boolean = true;

    s1 = "g";
    s2 = "r";
    result = isScramble(s1, s2);
    console.log(`Final result ${result}`);
    myAssert(!result, doQuit);

    s1 = "k";
    s2 = "k";
    result = isScramble(s1, s2);
    console.log(`Final result ${result}`);
    myAssert(result, doQuit);

    s1 = "great";
    s2 = "rgeat";
    result = isScramble(s1, s2);
    console.log(`Final result ${result}`);
    myAssert(result, doQuit);

    s1 = "hello"
    s2 = "eleoh"
    result = isScramble(s1, s2);
    console.log(`Final result ${result}`);
    myAssert(!result, doQuit);

    s1 = "abcde"
    s2 = "caebd"
    result = isScramble(s1, s2);
    console.log(`Final result ${result}`);
    myAssert(!result, doQuit);
    return;


    s1 = "abcdeabcdeabcdeabcdeabcde";
    s2 = "bcdaebcdaebcdaebcdaebcdae";
    result = isScramble(s1, s2);
    console.log(`Final result ${result}`);
    console.log('unsure what result should be')
    console.log()
    // myAssert(result, doQuit);

}

mainIsScramble();

/*
Data range/assumptions:
string length n: 30
Two strings are same length
lowercase English letters only
*/

/*
n = 1
n = 30
are scramble
aren't scrambled
really scambled
double letters
same letter reversed with multiple others
    E.g. great / reatg
*/

/*
Ideas:

Naive:
    Apply algorithm to original string and see if can get final string
    Time complexity: not sure, but terrible

Can't get any combination from this algorithm
Can only switch current two halves position, not any
    E.g. with string 'start' + 'current' + 'end', can never get c from current to front
        Assuming start and end are now fixed and current is what we're looking for

So to swap the relative positions of two letters, they must be in the same string at some point?
    E.g. abcde / caebd
        c is now before a
        e is now before b and d
        But to get a and c together, b must be in the a and c string
            Thus cannot be in bde one

Idea:
    Determine all letter pairs that have been relatively switched
    Create sets of letters for strings that could work
    Ensure sets are disjoint
        Or intersection is the same for all?
    Run recursively?

Does it work on the next level though?
    Doesn't top level mandate all reverses?
        Yes, but being in the same string is (I think) a necessary not sufficient condition
    On the next level in fact, they need to be in different strings
    And will have more reverses in one string than can be solved
    Each level tries to solve one, and then moves down to see if the others can be solved
    E.g. great / rgaet
        Sets:
            g / r
            a / e
            t
        Fully disjoint, so potentially valid
        With more than two sets, need to combine
            Permutate combinations?
What about letters that are reversed with more than one other letter
    E.g. great / reatg
    Pairs:
        g / r
        g / e
        g / a
        g / t
    Not disjoint, but definitely possible
Deal with letter that has the most reverses first or last?

How to make substring for next level for the "original" string
    Find letter position

What about double letters?
    Have to count the reverses
        If reverse pair already in set, keep going

Felt simple thinking about it but it's a bit ugly to implement
    Can we deal with the sets by a pivot point?
    Start with all in left set
    Move one forward in each set
    Move letter from left set to right set
    If they are not the same, then (at least) this string must be one half

Go back to the order pairs:
    For each letter, find the differences
        Construct a string using that
            Smaller always better, more flexibility for others?
            Run recursively

Need to think about double letters first:
    3 possibilities:
        Both in order:
            Nothing required
        One out of order:
            String to fix requires the out of order one, not the other
        Both out of order:
Need to use more than just letter as key
    letter, index:
        But index differs between the two
        Find all matching letters and see if either satisfies order requirement?
            Need to fully match each of them
                I.e. can't pick and choose
            Can simply permutate?
                Try intersection with both
                Prioritizing one with the fewest reorderings?

Finding string that has all letters efficiently:
    Either has to start at back or front
    Naive:
        Linear traverse and try both of them

Start and end index don't work:
    Only cover one string
    Focus on reverse pairs instead?
        I.e. create a global reverse pairs list
            Then remove the solved one and recursively do it with others
    WON"T WORK
        Solving requires remove part of the string that can't be used in the future

Maybe disjoint (or all share an intersection) is sufficient and doesn't require recursive?
    Don't actually make the strings, just say this string has at least "g, r"

What about the non-disjoint ones that still work
    E.g. great / reatg
    Handled by the combining?
    Combine any non-disjoint sets
    Then check that nothing appears in both sets
        E.g. g reat
What about double non-disjoint?
    E.g. great / eatgr
    g

Ugly, gave up

Solution is dynamic programming:
    D[length][start1][start2]
Trying to work out on my own:
    Likely calculate all length 1, then 2, etc.
*/

/*
Completion time (minutes): 65 before giving up
How did it go?
Describe:
*/