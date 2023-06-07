import myAssert from "../march2023/Trie";

function canMakeArithmeticProgression(arr: number[]): boolean {
    arr = arr.sort((a,b) => {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    })

    let stepSize:number = arr[1] - arr[0];
    for (let i = 1; i < arr.length - 1; i++) {
        let diff:number = arr[i+1] - arr[i];
        if (diff !== stepSize) return false;
    }

    return true;
};

function mainCanMakeArithmetic():void {
    let arr:number[];
    let result:boolean;
    let doQuitIfAssertFails:boolean = true;

    arr = [3,5,1];
    result = canMakeArithmeticProgression(arr);
    console.log(`final result ${result}`);
    myAssert(result, doQuitIfAssertFails);

    arr = [1,2,4];
    result = canMakeArithmeticProgression(arr);
    console.log(`final result ${result}`);
    myAssert(!result, doQuitIfAssertFails);
}

mainCanMakeArithmetic();

/*
Data range/assumptions:
*/

/*
Tests:
*/

/*
Ideas:

Naive:
    Sort
    First step defines progression step
    Check
*/

/*
Completion time (minutes): 5
Question difficulty: Easy
How did it go (1 - 6): 6
    Easy
    No bugs
*/