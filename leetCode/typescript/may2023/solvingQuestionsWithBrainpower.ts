import myAssert from "../march2023/Trie";

function mostPoints(questions: number[][]): number {
    let currentIndex:number = questions.length - 1;
    let memo:Map<number, number> = new Map();

    while (currentIndex >= 0) {
        let skipIndex:number = currentIndex + 1;
        let doNextIndex:number = currentIndex + questions[currentIndex][1] + 1;

        let skipPoints:number = 0;
        if (memo.has(skipIndex))  skipPoints = memo.get(skipIndex)!

        let doNextPoints:number = questions[currentIndex][0];
        if (memo.has(doNextIndex))  doNextPoints += memo.get(doNextIndex)!

        memo.set(currentIndex, Math.max(skipPoints, doNextPoints));

        currentIndex--;
    }

    return memo.get(0)!;
};

function naiveMostPoints(questions: number[][]): number {
    return helperRecursive(questions, 0);
};

function helperRecursive(questions:number[][], earliestPossible:number): number {
    if (earliestPossible >= questions.length)  return 0;
    
    let currentQuestion:number[] = questions[earliestPossible];
    let skipPoints:number = helperRecursive(questions, earliestPossible + 1);
    let answerPoints:number = currentQuestion[0] + helperRecursive(questions, earliestPossible + currentQuestion[1] + 1);

    return Math.max(skipPoints, answerPoints);
}

function mainMostPoints(): void {
    let questions:number[][];
    let result:number;
    let doQuitIfAssertFails:boolean = true;

    questions = [[3,2],[4,3],[4,4],[2,5]];
    result = mostPoints(questions);
    console.log(`Final result ${result}`);
    myAssert(result === 5, doQuitIfAssertFails);

    questions = [[1,1],[2,2],[3,3],[4,4],[5,5]];
    result = mostPoints(questions);
    console.log(`Final result ${result}`);
    myAssert(result === 7, doQuitIfAssertFails);
}

mainMostPoints();

/*
Data range/assumptions:
*/

/*
Tests:
*/

/*
Ideas:

Naive:
    Skip or try
    Recursive on the rest

Faster:
    Build from back to front
*/

/*
Completion time (minutes): 10
Question difficulty: Medium
How did it go (0 - 6): 4
    Pretty easy question
*/