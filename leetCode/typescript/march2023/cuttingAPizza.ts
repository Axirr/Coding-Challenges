import myAssert from "./Trie";

function ways(pizza: string[], k: number): number {
    let columnLength:number = pizza.length;
    let rowLength:number = pizza[0].length;

    let rowRunningSum:number[][] = [];

    for (let i = 0; i < columnLength; i++)  rowRunningSum.push([]);

    // Rows
    for (let i = 0; i < columnLength; i++) {
        let currentRow:number[] = rowRunningSum[i];
        let currentString:string = pizza[i];
        for (let j = rowLength - 1; j >= 0; j--) {
            let currentLetter:string = currentString[j];
            if (j === rowLength - 1) {
                currentRow.push(currentLetter === 'A' ? 1 : 0)
            } else currentRow.push(currentRow[currentRow.length - 1] + (currentLetter === 'A' ? 1 : 0)) 
        }
        currentRow.reverse()
    }

    for (const row of rowRunningSum) console.log(row)

    let columnRunningSum:number[][] = [];

    for (let i = 0; i < columnLength; i++)  columnRunningSum.push([]);

    for (let i = columnLength - 1; i >= 0; i--) {
        let currentColumn:number[] = columnRunningSum[i]
        for (let j = rowLength - 1; j >= 0; j--) {
            let currentLetter:string = pizza[j][i];
            if (j === rowLength - 1) {
                currentColumn.push(currentLetter === 'A' ? 1 : 0)
            } else currentColumn.push(currentColumn[currentColumn.length - 1] + (currentLetter === 'A' ? 1 : 0))
        }
        currentColumn.reverse()
    }

    console.log('columns')
    for (const row of columnRunningSum) console.log(row)

    let dynamicTable:number[][] = [];
    let sampleRow:number[] = [];
    for (let i = 0; i < rowLength; i++)  sampleRow.push(0);
    for (let i = 0; i < columnLength; i++)  dynamicTable.push([...sampleRow]);


    // dynamicTable[rowLength - 1] = [...rowRunningSum[columnLength - 1]]
    // let tempArray:number[] = []
    // for (let i = 0; i < columnLength; i++) {
    //     dynamicTable[i][rowLength - 1] = rowRunningSum[i][rowLength - 1]
    // }
    // dynamicTable[columnLength - 1] = [...rowRunningSum[rowLength - 1]]

    console.log('dynamic table')
    for (const row of dynamicTable) console.log(row)

    for (i = )

    let result:number = 0;
    return result % 1000000007;
};

function mainWays():void {
    let pizza:string[];
    let k:number;
    let result:number;
    let doQuit:boolean = true;

    pizza = ["A..","AAA","..."];
    k = 3;
    result = ways(pizza, k);
    console.log(`Final result ${result}`);
    myAssert(result === 1, doQuit);
}

mainWays();

/*
Data range/assumptions:
pizza dimension n x m: [1, 50]
entries are 'A' or '.'
k = [1, 10]
return modulo 10^9 + 7
*/

/*
Tests:
n = 1
n = 50
many A's
minimum A's
*/

/*
Ideas:

Naive:
    Not even going to waste my time

Has to be dynamic programming:
D[i] = ? + D[i - 1]
Possibly more dimensions

Simpler cases: pizza is all apples, so every cut valid

Our case: some cuts will be invalid, and so we don't want to calculate further in a naive loop
Calculate 1 x 1, 2 x 2, etc and store results
D[i][j] = D[i+1][j] + D[i][j]
    Values may be 0

Options at each stage:
    If cut invalid, copy neighbour value
    If cut valid

Cut validity isn't simple though
Not just about next single apple in the row
Apples above or below in the column make valid too
Calculate running sum of apples, use the appropriate one for each row?
But also have to do that for the rows
I guess that's only 50 x 50 max

So for vertical cut, if running sum greater than 0 at row, valid cut
    Doubles the previous valid cuts?
For horizontal, if running sum above has apple

Actually, need both above and below to have apples?
    But below can include column apples too

Calculate [maxM][...] and [...][maxN]
Then increase m by one, and calculate rows from n - 1 to n
Return D[0][0]
*/

/*
Completion time: 53 minutes before give up
How did it go? bad
Describe:
    I'm bad with arrays in general and especially multi-dimensional arrays
    Blindly followed a solution that took a fair amount of time to implement without tracing
*/