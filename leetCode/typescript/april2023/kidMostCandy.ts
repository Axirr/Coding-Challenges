import myAssert from "../march2023/Trie";

function kidsWithCandies(candies: number[], extraCandies: number): boolean[] {
    let unmodifiedMax:number = candies[0];
    for (let i = 1; i < candies.length; i++) {
        unmodifiedMax = Math.max(unmodifiedMax, candies[i]);
    }

    let hasMost:boolean[] = []
    for (let i = 0; i < candies.length; i++) {
        const newCandies:number = candies[i] + extraCandies;
        if (newCandies >= unmodifiedMax)  hasMost.push(true);
        else  hasMost.push(false);
    }

    return hasMost;
};

function mainKidsWithCandies():void {
    let candies:number[];
    let extraCandies:number;
    let result:boolean[];
    let doQuitIfAssertFails:boolean = true;
    let correctResult:boolean[];

    candies = [2,3,5,1,3];
    extraCandies = 3;
    result = kidsWithCandies(candies, extraCandies);
    console.log(`Final result ${result}`);
    correctResult = [true, true, true, false, true];
    myAssert(result.toString() === correctResult.toString(), doQuitIfAssertFails);


    candies = [4,2,1,1,2];
    extraCandies = 1;
    result = kidsWithCandies(candies, extraCandies);
    console.log(`Final result ${result}`);
    correctResult = [true, false, false, false, false];
    myAssert(result.toString() === correctResult.toString(), doQuitIfAssertFails);
};

mainKidsWithCandies();

/*
Data range/assumptions:
n: [2, 100]
candies: [1, 100]
extras: [1, 50]
*/

/*
Tests:
n = 1
tie for greatest
*/

/*
Ideas:

Naive:
    Traverse and determine unmodified greatest
    Retraverse and add extras to ith, determining if >= unmodified greatest -> true else false
*/

/*
Completion time (minutes): 6
Question difficulty: Easy
How did it go (0 - 6): 6
    Simple problem
    No bugs
*/