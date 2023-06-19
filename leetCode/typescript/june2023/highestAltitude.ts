import myAssert from "../march2023/Trie";

function largestAltitude(gain: number[]): number {
    let currentAltitude:number = 0;
    let maxAltitude:number = 0;
    for (let i = 0; i < gain.length; i++) {
        const altChange = gain[i];
        currentAltitude += altChange;
        maxAltitude = Math.max(maxAltitude, currentAltitude);
    }

    return maxAltitude;
};

function mainLargestAltitude(): void {
    let gain:number[];
    let result:number;
    let doQuitIfAssertFails:boolean = true;
    
    gain = [-5,1,5,0,-7];
    result = largestAltitude(gain);
    console.log(`result ${result}`);
    myAssert(result === 1, doQuitIfAssertFails);

    gain = [-4,-3,-2,-1,4,3,2];
    result = largestAltitude(gain);
    console.log(`result ${result}`);
    myAssert(result === 0, doQuitIfAssertFails);
}

mainLargestAltitude();

/*
Data range/assumptions:
*/

/*
Tests:
*/

/*
Ideas:

Naive:
*/

/*
Completion time (minutes): 5
Question difficulty: Easy
How did it go (1 - 6): 6
    Easy question
    No bugs
*/