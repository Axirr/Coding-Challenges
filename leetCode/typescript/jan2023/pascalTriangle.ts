function generate(numRows: number): number[][] {
    let resultArray:number[][] = [[1]];
    if (numRows == 1) return resultArray;

    let currentNum:number = 1;
    let previousArray:number[] = resultArray[resultArray.length - 1];
    while (currentNum < numRows) {
        let tempArray:number[] = [1];
        for (let i =0; i < previousArray.length - 1; i++) {
            tempArray.push(previousArray[i] + previousArray[i+1]);
        }
        tempArray.push(1);
        resultArray.push(tempArray);

        currentNum += 1;
        previousArray = tempArray;
    }

    return resultArray;
};

function mainGenerate(): void {
    let numRows:number;
    let resultArray:number[][];

    numRows = 5;
    resultArray = generate(numRows);
    for (const myArray of resultArray) {
        for (const myNum of myArray) {
            console.log(myNum);
        }
        console.log()
    }
}

mainGenerate();

/*
Ideas:

Naive:
*/