import myAssert from "../march2023/Trie";

function minFlips(a:number, b:number, c:number):number {
    let orAB:number = a | b;
    let andAB:number = a & b;

    let count:number = 0;
    while (orAB > 0 || c > 0) {
        let cBit:number = c % 2;
        count += cBit ^ (orAB % 2);
        count += ~cBit & (andAB % 2);

        orAB = orAB >> 1;
        c = c >> 1;
        andAB = andAB >> 1;
    }

    return count;
}

function mainMinFlipsMakeEqaul():void {
    let a:number;
    let b:number;
    let c:number;
    let result:number;
    let doQuitIfAssertFails:boolean = true;

    a = 8;
    b = 3;
    c = 5;
    //      1000
    //      0011
    // OR   1011
    //      0101
    result = minFlips(a, b, c);
    console.log(`final result ${result}`);
    myAssert(result === 3, doQuitIfAssertFails);

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

}

mainMinFlipsMakeEqaul();

/*
Data range/assumptions:
*/

/*
Tests:
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