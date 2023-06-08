import myAssert from "../march2023/Trie";

function countNegatives(grid: number[][]): number {
    let count:number = 0;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] < 0)  count++;
        }
    }

    return count;
};

function mainCountNegatives():void {
    let grid:number[][];
    let result:number;
    let doQuitIfAssertFails:boolean = true;

    grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]];
    result = countNegatives(grid);
    console.log(`final result ${result}`);
    myAssert(result === 8, doQuitIfAssertFails);
}

mainCountNegatives();

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
Completion time (minutes): 4
Question difficulty: Easy
How did it go (1 - 6): 6
    Very easy problem
    No bugs
*/