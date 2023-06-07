import myAssert from "../march2023/Trie";

function minimumFlipsMakeEqual(a:number, b:number, c:number):number {
    let tupArgs:[number, number][] = [[a,b],[b,c],[a,c]];

    let minFlips:number | null = null;
    for (const permutation of tupArgs) {
        let first:number = permutation[0];
        let second:number = permutation[1];
        let xorAB:number = first ^ second;
        let xorCount:number = 0;
        while (xorAB > 0) {
            xorCount += xorAB % 2;
            xorAB = xorAB >> 1;
        }

        if (minFlips === null)  minFlips = xorCount;
        else  minFlips = Math.min(minFlips, xorCount);
    }

    return minFlips!;
}

function mainMinFlipsMakeEqaul():void {
    let a:number;
    let b:number;
    let c:number;
    let result:number;
    let doQuitIfAssertFails:boolean = true;

    a = 3;
    b = 0;
    c = 1;
    result = minimumFlipsMakeEqual(a, b, c);
    console.log(`final result ${result}`);
    myAssert(result === 1, doQuitIfAssertFails);

    a = 1024;
    b = 5;
    c = 5;
    result = minimumFlipsMakeEqual(a, b, c);
    console.log(`final result ${result}`);
    myAssert(result === 0, doQuitIfAssertFails);

    a = 9;
    b = 9;
    c = 333;
    result = minimumFlipsMakeEqual(a, b, c);
    console.log(`final result ${result}`);
    myAssert(result === 0, doQuitIfAssertFails);

    a = -5;
    b = 9;
    c = -5;
    result = minimumFlipsMakeEqual(a, b, c);
    console.log(`final result ${result}`);
    myAssert(result === 0, doQuitIfAssertFails);

    a = 7;
    b = 0;
    c = 13456789;
    result = minimumFlipsMakeEqual(a, b, c);
    console.log(`final result ${result}`);
    myAssert(result === 3, doQuitIfAssertFails);
    
    a = 15;
    b = 16;
    c = 3;
    result = minimumFlipsMakeEqual(a, b, c);
    console.log(`final result ${result}`);
    myAssert(result === 2, doQuitIfAssertFails);
}

mainMinFlipsMakeEqaul();

/*
Data range/assumptions:
*/

/*
Tests:
0
Max value
Negative
No flips (i.e. two equal)
    Check for each pair
All digits need to be flipped
Large but few flips
*/

/*
Ideas:

Naive:
    Convert to binary
    XOR each with others
    Count 1's
    Take min
*/

/*
Completion time (minutes): 15
Question difficulty: Medium
How did it go (1 - 6): 4
    Pretty fast
    Site was down so question might be slightly different
*/