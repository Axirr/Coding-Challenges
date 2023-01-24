function snakesAndLadders(board: number[][]): number {
    var minSteps:number = board.length ** 2 - 1;
    // var frontier:number[][] = [0, board[n - 1][0]];
    minSteps = recursiveSnakesAndLadders(board, 0, false)
    return minSteps;
};

function recursiveSnakesAndLadders(board: number[][], start:number, didSpecialMove:boolean): number {
    var maxIndex:number = (board.length ** 2) - 1;
    var minSteps:number = maxIndex;
    for (var i=1; i < 7; i++) {
        var nextStep:number = start + i
        if (nextStep > maxIndex) { continue }
        if (nextStep === maxIndex) {
            console.log(`arrived from ${start}`)
            return 1
        } else {
            var newDidSpecialMove:boolean = false
            if (!didSpecialMove) {
                var rowIndex = board.length - Math.floor(nextStep / board.length) - 1
                var colIndex:number;
                console.log(rowIndex)
                if (rowIndex % 2 != 0) {
                    colIndex = nextStep % board.length
                } else {
                    colIndex = board.length - (nextStep % board.length) - 1
                }
                var destinationValue = board[rowIndex][colIndex]
                if (destinationValue !== -1 && !didSpecialMove) {
                    newDidSpecialMove = true
                    // Minus 1 to get index, not label
                    nextStep = destinationValue - 1
                }
            }
            var newMinSteps = recursiveSnakesAndLadders(board, nextStep, newDidSpecialMove) + 1
            minSteps = Math.min(minSteps, newMinSteps)
            if (start === 0)  {
                console.log(`nextStep ${nextStep}`)
                console.log(`minSteps ${minSteps}`)
            }
        }
    }
    return minSteps
}

function snakesAndLaddersMain(): void {
    var board:number[][];
    var resultNum:number;
    board = [[-1,-1],[-1,3]]
    resultNum = snakesAndLadders(board)
    console.log(resultNum)
    console.assert(resultNum === 1)
    return
    board = [[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1],[-1,35,-1,-1,13,-1],[-1,-1,-1,-1,-1,-1],[-1,15,-1,-1,-1,-1]]
    resultNum = snakesAndLadders(board)
    console.log(resultNum)
    console.assert(resultNum === 4)
}

snakesAndLaddersMain()

/*
Data range/assumptions:
n x n
n: [2, 20]
Boustrophedon style
grid values: [-1] U [1, n^2]
*/

/*
Tests:
n = 2
n = 20
double snake
double ladder
snake needed in optimal path
cycles if using dfs
*/

/*
Ideas:

Naive:
    Recursive, BFS/priority queue
    Choose all moves and take the minimum

    Worst case: no snakes or ladders?

Better: work back from end using a sort of adjacency list 
    Collect any tiles that lead to the current tile
    If none, use the last tile
    Repeat
    Is it reliably better?
        Still branches a lot
        Natural priority structure, since any square one away should be prioritized over 2 away, etc.

Prioritize ladders?

Index from space:

row = n - index // current - 1
column is different if row is even or odd
    even: index % current
    odd: n - index % current

n = 2
row: 0 -> 2 - 0 - 1 -> 1
col: 0 -> row is odd -> 0 % 2 -> 0

1
1 // 2 -> 2 - 0 - 1 -> 1
col: 1 -> 1 % 2 -> 1

2

3
*/