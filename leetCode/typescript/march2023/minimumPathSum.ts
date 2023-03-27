import myAssert from "./Trie";

function minPathSum(grid: number[][]): number {
    let tabulation:number[][] = [];
    let maxMIndex = grid.length - 1;
    let maxNIndex = grid[0].length - 1;

    for (let i = 0; i <= maxMIndex; i++) {
        let myArray:number[] = [];
        for (let i = 0; i <= maxNIndex; i++) {
            myArray.push(999);
        }
        tabulation.push(myArray);
    }

    tabulation[maxMIndex][maxNIndex] = grid[maxMIndex][maxNIndex];
    for (let i=maxMIndex - 1; i >= 0; i--) {
        tabulation[i][maxNIndex] = tabulation[i + 1][maxNIndex] + grid[i][maxNIndex];
    }

    for (let i=maxNIndex - 1; i >= 0; i--) {
        tabulation[maxMIndex][i] = tabulation[maxMIndex][i + 1] + grid[maxMIndex][i];
    }

    let currentN:number = maxNIndex - 1;
    while (currentN >= 0) {
        for (let i=maxMIndex - 1; i >= 0; i--) {
            tabulation[i][currentN] = Math.min(tabulation[i + 1][currentN] ,tabulation[i][currentN + 1]) + grid[i][currentN];
        }
        currentN -= 1;
    }


    return tabulation[0][0];
}

function slowMinPathSum(grid: number[][]): number {
    let memo:Map<[number,number], number> = new Map();
    return recursiveHelper(grid, 0, 0, memo) + grid[0][0];
};

function recursiveHelper(grid: number[][], currentM:number, currentN: number, memo:Map<[number, number], number>): number {
    console.log(`currentM ${currentM} currentN ${currentN}`);
    let maxMIndex:number = grid.length - 1;
    let maxNIndex:number = grid[0].length - 1;
    // let cachedResult:number | undefined = memo.get([currentM, currentN]);
    // if (cachedResult !== undefined)  {
    //     console.log(`currentMin ${cachedResult}`);
    //     return cachedResult;
    // }

    if (currentM === maxMIndex && currentN === maxNIndex)  return 0;

    let currentMin:number = 20000;
    // let currentMin:number = Number.MAX_SAFE_INTEGER;
    let currentAttempt:number;
    if (currentM < maxMIndex) {
        // if (memo.has([currentM + 1, currentN]))  currentAttempt = memo.get([currentM + 1, currentN])!
        // else currentAttempt = recursiveHelper(grid, currentM + 1, currentN, memo)
        currentAttempt = recursiveHelper(grid, currentM + 1, currentN, memo)
        currentAttempt += grid[currentM + 1][currentN];
        if (currentAttempt < currentMin)  currentMin = currentAttempt;
    }

    if (currentN < maxNIndex) {
        // if (memo.has([currentM, currentN + 1]))  currentAttempt = memo.get([currentM, currentN + 1])!
        // else currentAttempt = recursiveHelper(grid, currentM, currentN + 1, memo)
        currentAttempt = recursiveHelper(grid, currentM, currentN + 1, memo)
        currentAttempt += grid[currentM][currentN + 1];
        if (currentAttempt < currentMin)  currentMin = currentAttempt;
    }

    // memo.set([currentM, currentN], currentMin);
    console.log(`currentMin ${currentMin}`)
    return currentMin;
}

function mainMinPathSum():void {
    let grid:number[][];
    let minSum:number;
    let doQuit:boolean = true;

    grid = [[7,1,3,5,8,9,9,2,1,9,0,8,3,1,6,6,9,5],[9,5,9,4,0,4,8,8,9,5,7,3,6,6,6,9,1,6],[8,2,9,1,3,1,9,7,2,5,3,1,2,4,8,2,8,8],[6,7,9,8,4,8,3,0,4,0,9,6,6,0,0,5,1,4],[7,1,3,1,8,8,3,1,2,1,5,0,2,1,9,1,1,4],[9,5,4,3,5,6,1,3,6,4,9,7,0,8,0,3,9,9],[1,4,2,5,8,7,7,0,0,7,1,2,1,2,7,7,7,4],[3,9,7,9,5,8,9,5,6,9,8,8,0,1,4,2,8,2],[1,5,2,2,2,5,6,3,9,3,1,7,9,6,8,6,8,3],[5,7,8,3,8,8,3,9,9,8,1,9,2,5,4,7,7,7],[2,3,2,4,8,5,1,7,2,9,5,2,4,2,9,2,8,7],[0,1,6,1,1,0,0,6,5,4,3,4,3,7,9,6,1,9]]
    minSum = minPathSum(grid);
    console.log(`minSum ${minSum}`);
    // myAssert(minSum === 85?, doQuit);

    grid = [[1,3,1],[1,5,1],[4,2,1]];
    minSum = minPathSum(grid);
    console.log(`minSum ${minSum}`);
    myAssert(minSum === 7, doQuit);

    grid = [[1,2,3],[4,5,6]]
    minSum = minPathSum(grid);
    console.log(`minSum ${minSum}`);
    myAssert(minSum === 12, doQuit);

}

mainMinPathSum();

/*
Data range/assumptions:
not always square
m major
m, n: [1, 100]
Values: [0, 100]
Can only move right and down
    No diagonals
Top left to bottom right
*/

/*
Tests:
m = 1
m = 100
n = 1
n = 100
greedy path wrong
Low/greedy last step neighbour that is wrong
*/

/*
Ideas:

Naive:
    Two choices at each step
    Recursive, return minimum of two choices from each step?
    O(m x n), which should be fine at this scale?
WRONG
    Complexity is much higher
    2^(m * n), like sub arrays?
    Maybe factorial?
    Anyways, naive doesn't work

Better:
    Minimum distance zero
    Minimum distance one
    Tabulate into a grid
    Then increase the backwards length by one 

How to calculate the i - 1 case indices?
    All combinations of splitting the current max path length between m and n?
    With the restriction that they can each only go up so high?
    Isn't that just reintroducing the complexity I'm getting rid of?
    Better: calculate each edge entirely first then can build using those?

As long as all cells below the current index level are calculated, then will just build itself
    By permutating indices
*/

/*
Completion time (minutes): 80
How did it go? poorly
Describe:
    First got the time complexity wrong, which had me wasting time on a poor solution
    Then really struggled to get the indices right for my dynamic programming method 
*/