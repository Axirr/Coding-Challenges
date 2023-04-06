import myAssert from "../march2023/Trie";

function closedIsland(grid: number[][]): number {
    let visited:Set<number> = new Set();
    let frontier:number[] = [];

    let height:number = grid.length;
    let width:number = grid[0].length;
    let maxCell:number = (height * width) - 1; 
    let outerLoopCellNumber:number = 0;
    let islandCount:number = 0;
    let cellModifiers:number[] = [-width, width];
    let onesCellMofiiers:number[] = [-1, 1]

    while (outerLoopCellNumber <= maxCell) {
        if (!visited.has(outerLoopCellNumber)) {
            let tupCurrentCell:[number, number] = [Math.floor(outerLoopCellNumber / width), outerLoopCellNumber % width];

            if (grid[tupCurrentCell[0]][tupCurrentCell[1]] === 1) {
                visited.add(outerLoopCellNumber);
                outerLoopCellNumber++;
                continue;
            }

            let foundEdge:boolean = false;
            frontier = [outerLoopCellNumber];
            while (frontier.length > 0) {
                let currentCellNumber:number = frontier.pop()!;
                if (visited.has(currentCellNumber))  continue;
                visited.add(currentCellNumber);

                let currentFrontierCell:[number, number] = [Math.floor(currentCellNumber / width), currentCellNumber % width];
                let groundType:number = grid[currentFrontierCell[0]][currentFrontierCell[1]];
                if (groundType === 0) {
                    let neighbours:number[] = [];

                    for (const modifier of cellModifiers) {
                        let potentialNewCellNumber:number = currentCellNumber + modifier;
                        if (potentialNewCellNumber >= 0 && potentialNewCellNumber <= maxCell) neighbours.push(potentialNewCellNumber);
                    }
                    for (const modifier of onesCellMofiiers) {
                        let potentialNewCellNumber:number = currentCellNumber + modifier;
                        let newRow:number = Math.floor(potentialNewCellNumber / width);
                        if (newRow !== currentFrontierCell[0])  continue;
                        neighbours.push(potentialNewCellNumber);
                    }

                    if (neighbours.length < 4)  foundEdge = true;
                    for (const neigh of neighbours)  {
                        if (!visited.has(neigh))
                            frontier.push(neigh)
                        }
                    }
            }

            if (!foundEdge) {
                // console.log(`found island`)
                islandCount++;
            }
        }

        outerLoopCellNumber++;
    }

    return islandCount;
};

function getNeighbours(grid:number[][], coordTuple:[number, number], maxY:number, maxX:number):[number, number][] {
    let originalY:number = coordTuple[0];
    let originalX:number = coordTuple[1];

    let result:[number, number][] = [];
    let newY:number[] = []
    let potentialNewCoord:number = originalY - 1;
    if (potentialNewCoord >= 0 && potentialNewCoord <= maxY)  newY.push(potentialNewCoord);
    potentialNewCoord = originalY + 1;
    if (potentialNewCoord >= 0 && potentialNewCoord <= maxY)  newY.push(potentialNewCoord);
    let newX:number[] = []
    potentialNewCoord = originalX - 1;
    if (potentialNewCoord >= 0 && potentialNewCoord <= maxX)  newX.push(potentialNewCoord);
    potentialNewCoord = originalX + 1;
    if (potentialNewCoord >= 0 && potentialNewCoord <= maxX)  newX.push(potentialNewCoord);

    for (const xCoord of newX) {
        result.push([originalY, xCoord])
    }

    for (const yCoord of newY) {
        result.push([yCoord, originalX])
    }

    return result;
}

function mainClosedIsland():void {
    let grid:number[][];
    let result:number;
    let doQuitIfAssertFails:boolean = true;

    grid = [
        [0,0,1,0,1,0,0,0,1,1,0,0,0,1,1,0,1,1,0,1],
        [0,1,1,0,0,0,0,1,0,1,0,1,1,1,1,1,1,1,0,0],
        [1,1,0,0,0,0,0,0,1,0,1,0,0,1,0,0,0,1,1,0],
        [0,1,0,1,0,0,0,1,1,1,0,0,0,0,0,0,1,1,0,1],
        [1,1,1,0,0,0,1,1,0,0,1,0,1,1,1,0,0,1,0,0],
        [0,1,1,1,0,1,0,0,0,1,1,1,1,1,0,1,0,0,1,1],
        [1,0,0,0,1,1,1,1,0,1,1,0,1,0,0,0,1,0,0,0],
        [0,1,1,0,1,1,0,0,1,1,1,0,1,1,1,0,1,0,1,0],
        [0,0,1,1,0,1,0,0,0,0,0,0,1,0,1,1,0,0,1,1],
        [0,0,1,0,0,0,0,1,0,1,1,1,1,0,1,1,1,0,1,1],
        [0,0,0,1,0,1,0,0,0,1,1,0,0,0,0,0,1,1,1,1],
        [0,0,0,0,1,1,0,0,0,0,0,0,1,0,1,1,0,1,0,0],
        [1,0,0,0,0,0,1,1,1,0,0,1,0,0,0,1,0,0,1,1],
        [0,1,1,0,1,1,1,0,1,0,0,1,0,0,0,0,1,0,0,0]];
    result = closedIsland(grid);
    console.log(`Final result ${result}`);
    myAssert(result === 5, doQuitIfAssertFails);
    
    grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]
    result = closedIsland(grid);
    console.log(`Final result ${result}`);
    myAssert(result === 2, doQuitIfAssertFails);

    grid = [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]];
    result = closedIsland(grid);
    console.log(`Final result ${result}`);
    myAssert(result === 1, doQuitIfAssertFails);
}

mainClosedIsland();

/*
Data range/assumptions:
dimensions: [1, 100]
values: [0, 1]
*/

/*
Tests:
n = 1
n = 100
no islands
all one island
islands touching diagonally
*/

/*
Ideas:

Naive:
    Expand out each zero until hit wall or water
        Frontier becomes next land piece
        If frontier becomes empty before hitting wall, island
    Use a visited set to not look at them again
    Should expand out even if hit wall, to ensure all of current (non-surrounded island) is in visited
*/

/*
Completion time (minutes): 69
Question difficulty: medium
How did it go (0 - 6): 3
    Slow, but idea was decent
    Should be more comfortable with calculating [row][column] from cell number
*/