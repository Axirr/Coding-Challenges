import myAssert from '../march2023/Trie';

function shortestPathBinaryMatrix(grid: number[][]): number {
    if (grid[0][0] === 1)  return -1;
    let destXindex:number = grid[0].length - 1;
    let destgridYindexConstant:number = grid.length - 1;
    if (destXindex === 0 && destgridYindexConstant === 0) return 1;

    let visitedGrid:number[][] = [];
    for (let i = 0; i <= destgridYindexConstant; i++) {
        let newArray:number[] = Array(destXindex + 1).fill(0);
        visitedGrid.push(newArray);
    }
    const gridXindexConstant:number = 0;
    const gridYindexConstant:number = 1;

    let nodeQueue:[number, number][] = [[0, 0]];
    let currentDistance:number = 2;
    let directions:[number, number][] = [
        [0,1],
        [0,-1],
        [1, 0],
        [-1, 0],
        [1, -1],
        [1, 1],
        [-1, 1],
        [-1, -1],
    ]

    while (nodeQueue.length > 0) {
        let newNodeQueue:[number, number][] = [];
        while (nodeQueue.length > 0) {
            let currentCoor:[number, number] = nodeQueue.pop()!;
            for (let i = 0; i < directions.length; i++) {
                let currDirection:[number, number] = directions[i];
                let newCoor:[number, number] = [currentCoor[0] + currDirection[0], currentCoor[1] + currDirection[1]];

                if (newCoor[gridXindexConstant] < 0 || newCoor[gridXindexConstant] > destXindex || newCoor[gridYindexConstant] < 0 || newCoor[gridYindexConstant] > destgridYindexConstant)  continue;
                if (grid[newCoor[gridXindexConstant]][newCoor[gridYindexConstant]] === 1) continue;

                if (newCoor[gridXindexConstant] === destXindex && newCoor[gridYindexConstant] === destgridYindexConstant)  return currentDistance;

                if (visitedGrid[newCoor[gridXindexConstant]][newCoor[gridYindexConstant]] !== 1) {
                    visitedGrid[newCoor[gridXindexConstant]][newCoor[gridYindexConstant]] = 1;
                    newNodeQueue.push(newCoor);
                }
            }
        }

        currentDistance++;
        nodeQueue = newNodeQueue;
    }

    return -1;
};

function mainShortestPathBinaryMatrix():void {
    let grid:number[][];
    let result:number;
    let doQuitIfAssertFails:boolean = true;

    grid = [[0,1],[1,0]];
    result = shortestPathBinaryMatrix(grid);
    console.log(`Final result ${result}`);
    myAssert(result === 2, doQuitIfAssertFails);

    grid = [[0,0,0],[1,1,0],[1,1,0]];
    result = shortestPathBinaryMatrix(grid);
    console.log(`Final result ${result}`);
    myAssert(result === 4, doQuitIfAssertFails);

    grid = [[1,0,0],[1,1,0],[1,1,0]];
    result = shortestPathBinaryMatrix(grid);
    console.log(`Final result ${result}`);
    myAssert(result === -1, doQuitIfAssertFails);

    grid = [[0,0,0],[1,1,0],[1,1,1]];
    result = shortestPathBinaryMatrix(grid);
    console.log(`Final result ${result}`);
    myAssert(result === -1, doQuitIfAssertFails);
}

mainShortestPathBinaryMatrix();

/*
Data range/assumptions:
n: [1, 100]
values: 0, 1
diagonal movement allowed
*/

/*
Tests:
n = 1
n = 100
all clear
none clear
no path
path exists
only path is long one
*/

/*
Ideas:

Naive: breadth first search
    Frontier = [start]
    Take one step from all points in frontier
    If destination !== 1 and destination not in visited
        Add to visited
        Add to nextFrontier
    froniter = nextFrontier

How to terminate?
    Visited will ensure frontier is exhausted at some point

Optimality Guaranteed?
    Yes, since every path of size n explored before n + 1

Recursive implementation:
    Include a global shortest path variable
    Once a path found, additional nodes eliminated if current length >= shortestPath
    Then execution order doesn't matter
        WRONG: shortest path optimality no longer guaranteed
    Might be slower, but maybe simpler to write
*/

/*
Completion time (minutes): 40
Question difficulty: Medium
How did it go (1 - 6): 4
    Solution worked
    But some bugs
*/