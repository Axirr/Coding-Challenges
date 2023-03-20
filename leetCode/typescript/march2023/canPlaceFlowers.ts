import myAssert from "./Trie";

function canPlaceFlowers(flowerbed: number[], n: number): boolean {
    if (n > Math.ceil(flowerbed.length / 2))  return false;

    let plantedCount:number = 0;
    for (let i = 0; i < flowerbed.length; i++) {
        if (flowerbed[i] === 1)  continue;

        let beforeIndex:number = i - 1;
        let afterIndex:number = i + 1;
        if (beforeIndex >= 0 && flowerbed[beforeIndex] === 1)  continue;
        if (afterIndex < flowerbed.length && flowerbed[afterIndex] === 1)  continue;

        flowerbed[i] = 1;
        plantedCount += 1;
    }

    return plantedCount >= n;
};

function mainCanPlace():void {
    let flowerbed:number[];
    let n:number;
    let plantIsPossible:boolean;

    flowerbed = [1,0,0,0,1]
    n = 1
    plantIsPossible = canPlaceFlowers(flowerbed, n)
    myAssert(plantIsPossible);

    flowerbed = [1,0,0,0,1]
    n = 2
    plantIsPossible = canPlaceFlowers(flowerbed, n)
    myAssert(!plantIsPossible);

    flowerbed = [1,0,0,0,0,1];
    n = 2
    plantIsPossible = canPlaceFlowers(flowerbed, n)
    myAssert(!plantIsPossible);
}

mainCanPlace();

/*
Data Range/Assumptions:
Flower bed length n: [1, 2 * 10^4]
*/

/*
Tests:
n = 1
n = 10^4
greedy doesn't work?
*/

/*
Ideas:

Naive:
    Traverse and use first available

Are there situations where greedy doesn't work?
E.g. 100001
    Two different valid arrangements, but each only uses n = 1
E.g. 1000001
*/

/*
Completion time (minutes): 12
How did it go? well
Describe
    Naive worked
    Manually ran examples to ensure greedy worked
    Small bug, easily fixed (< 0 needed to be <= 0)
*/