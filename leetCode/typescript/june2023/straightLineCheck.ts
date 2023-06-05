import myAssert from "../march2023/Trie";

function checkStraightLine(coordinates: number[][]): boolean {
    let firstPoint:number[] = coordinates[0];
    let secondPoint:number[] = coordinates[1];
    let isVertical:boolean = firstPoint[0] === secondPoint[0];
    if (isVertical) {
        for (const currentPoint of coordinates) {
            if (currentPoint[0] !== firstPoint[0])  return false;
        }
        return true;
    } 

    let slope:number = (firstPoint[1] - secondPoint[1]) / (firstPoint[0] - secondPoint[0]);
    let intercept:number = firstPoint[1] - slope * firstPoint[0]
    let FLOAT_EPSILON:number = 0.000000001

    for (const currentPoint of coordinates) {
        let calcY:number = slope * currentPoint[0] + intercept;
        let diff:number = Math.abs(calcY - currentPoint[1])
        if (diff > FLOAT_EPSILON)  return false;
    }

    return true;
};

function mainCheckStraightLine(): void {
    let coordinates:number[][];
    let result:boolean;
    let doQuitIfAssertFails:boolean = true;

    coordinates = [[-2,12],[2,-8],[6,-28],[-10,52],[-7,37],[4,-18],[7,-33],[1,-3],[-1,7],[8,-38]];
    result = checkStraightLine(coordinates);
    console.log(`final result ${result}`);
    myAssert(result, doQuitIfAssertFails);

    // Vertical line
    coordinates = [[0,0],[0,5],[5,5],[5,0]];
    result = checkStraightLine(coordinates);
    console.log(`final result ${result}`);
    myAssert(!result, doQuitIfAssertFails);

    coordinates = [[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]];
    result = checkStraightLine(coordinates);
    console.log(`final result ${result}`);
    myAssert(result, doQuitIfAssertFails);

    coordinates = [[1,1],[2,2],[3,4],[4,5],[5,6],[7,7]];
    result = checkStraightLine(coordinates);
    console.log(`final result ${result}`);
    myAssert(!result, doQuitIfAssertFails);
}

mainCheckStraightLine();

/*
Data range/assumptions:
*/

/*
Tests:
*/

/*
Ideas:

Naive:
    Calculate line from two points
        Slow = rise over run
        Intercept = 
        y = mx + b
        b = y / mx
    Check for other points
*/

/*
Completion time (minutes): 19
Question difficulty: Easy
How did it go (1 - 6): 3
    Some bugs, which isn't great for an easy question
*/