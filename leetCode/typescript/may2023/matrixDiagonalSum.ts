import myAssert from "../march2023/Trie";

function diagonalSum(mat: number[][]): number {
    let totalSum:number = 0;
    let currentX:number = 0;
    let currentY:number = 0;
    let dim:number = mat.length;
    let halfIndex:number = Math.floor(dim / 2);

    while (currentX < dim && currentY < dim) {
        totalSum += mat[currentX][currentY];
        totalSum += mat[currentX][dim - 1 - currentY];

        currentX++;
        currentY++;
    }

    if (dim % 2 !== 0)  totalSum -= mat[halfIndex][halfIndex];

    return totalSum;
};

function mainMatrixDiagonalSum():void {
    let mat:number[][];
    let result:number;
    let doQuitIfAssertFails:boolean = true;

    mat = [[7,3,1,9],[3,4,6,9],[6,9,6,6],[9,5,8,5]];
    result = diagonalSum(mat);
    console.log(`Final result ${result}`);
    myAssert(result === 55, doQuitIfAssertFails);


    mat = [[1,2,3],[4,5,6],[7,8,9]];
    result = diagonalSum(mat);
    console.log(`Final result ${result}`);
    myAssert(result === 25, doQuitIfAssertFails);

    mat = [[1,1,1,1],
              [1,1,1,1],
              [1,1,1,1],
              [1,1,1,1]]
    result = diagonalSum(mat);
    console.log(`Final result ${result}`);
    myAssert(result === 8, doQuitIfAssertFails);

    mat = [[5]]
    result = diagonalSum(mat);
    console.log(`Final result ${result}`);
    myAssert(result === 5, doQuitIfAssertFails);
}

mainMatrixDiagonalSum();

/*
Data range/assumptions:
*/

/*
Tests:
*/

/*
Ideas:

Naive:

Intersection of diagonals coordinates
    Square matrices, so will happen for odd but not for even
        E.g. [1,2]
             [3, 4]
            Shares nothing
    At the half way point for odds
    Odd, 
*/

/*
Completion time (minutes): 26
Question difficulty: Easy
How did it go (0 - 6): 2
    Question seemed hard
    Bug that took me a while to find that was pretty simple
*/