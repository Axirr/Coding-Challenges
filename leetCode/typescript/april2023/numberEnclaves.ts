import myAssert from "../march2023/Trie";

function numEnclaves(grid: number[][]): number {
    // Adapted from my 'Number of Closed Islands' solution
    let visited:Set<number> = new Set();
    let frontier:number[] = [];
    let seaTileValue:number = 0;
    let landTileValue:number = 1;

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

            if (grid[tupCurrentCell[0]][tupCurrentCell[1]] === seaTileValue) {
                visited.add(outerLoopCellNumber);
                outerLoopCellNumber++;
                continue;
            }

            let foundEdge:boolean = false;
            frontier = [outerLoopCellNumber];
            let islandSize:number = 0;
            while (frontier.length > 0) {
                let currentCellNumber:number = frontier.pop()!;
                if (visited.has(currentCellNumber))  continue;
                visited.add(currentCellNumber);

                let currentFrontierCell:[number, number] = [Math.floor(currentCellNumber / width), currentCellNumber % width];
                let groundType:number = grid[currentFrontierCell[0]][currentFrontierCell[1]];
                if (groundType === landTileValue) {
                    let neighbours:number[] = [];
                    islandSize++;

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
                islandCount += islandSize;
            }
        }

        outerLoopCellNumber++;
    }

    return islandCount;
};

function mainNumEnclaves():void {
    let grid:number[][];
    let result:number;
    let doQuitIfAssertFails:boolean = true;

    grid = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]];
    result = numEnclaves(grid);
    console.log(`Final result ${result}`);
    myAssert(result === 3, doQuitIfAssertFails);

    grid = [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]];
    result = numEnclaves(grid);
    console.log(`Final result ${result}`);
    myAssert(result === 0, doQuitIfAssertFails);
}

mainNumEnclaves();

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
Completion time (minutes): 8
Question difficulty: medium
How did it go (0 - 6): 6
    Used solution from yesterday, with very minor modifications
*/