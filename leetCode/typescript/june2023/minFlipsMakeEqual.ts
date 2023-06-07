import myAssert from "../march2023/Trie";

function minFlips(a:number, b:number, c:number):number {
    let orAB:number = a | b;
    let andAB:number = a & b;
    let xorAB = orAB ^ c;
    let xorCount:number = 0;
    while (xorAB > 0) {
        let cBit:number = c % 2;
        let orBit:number = xorAB % 2;
        let andBit:number = andAB % 2;

        if (cBit === 0) {
            if (andBit === 1)  xorCount += 2;
            else if (orBit === 1) xorCount += 1;
        } else {
            xorCount += xorAB % 2;
        }

        xorAB = xorAB >> 1;
        c = c >> 1;
        andAB = andAB >> 1;
    }

    return xorCount;
}

function mainMinFlipsMakeEqaul():void {
    let a:number;
    let b:number;
    let c:number;
    let result:number;
    let doQuitIfAssertFails:boolean = false;

    a = 2;
    b = 6;
    c = 5;
    result = minFlips(a, b, c);
    console.log(`final result ${result}`);
    myAssert(result === 3, doQuitIfAssertFails);

    a = 4, b = 2, c = 7;
    result = minFlips(a, b, c);
    console.log(`final result ${result}`);
    myAssert(result === 1, doQuitIfAssertFails);

    a = 1, b = 2, c = 3;
    result = minFlips(a, b, c);
    console.log(`final result ${result}`);
    myAssert(result === 0, doQuitIfAssertFails);
    return

    a = 3;
    b = 0;
    c = 1;
    result = minFlips(a, b, c);
    console.log(`final result ${result}`);
    myAssert(result === 1, doQuitIfAssertFails);

    a = 1024;
    b = 5;
    c = 5;
    result = minFlips(a, b, c);
    console.log(`final result ${result}`);
    myAssert(result === 0, doQuitIfAssertFails);

    a = 9;
    b = 9;
    c = 333;
    result = minFlips(a, b, c);
    console.log(`final result ${result}`);
    myAssert(result === 0, doQuitIfAssertFails);

    a = -5;
    b = 9;
    c = -5;
    result = minFlips(a, b, c);
    console.log(`final result ${result}`);
    myAssert(result === 0, doQuitIfAssertFails);

    a = 7;
    b = 0;
    c = 13456789;
    result = minFlips(a, b, c);
    console.log(`final result ${result}`);
    myAssert(result === 3, doQuitIfAssertFails);
    
    a = 15;
    b = 16;
    c = 3;
    result = minFlips(a, b, c);
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