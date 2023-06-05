import myAssert from "../march2023/Trie";

function maximumDetonation(bombs: number[][]): number {
    let n:number = bombs.length;
    let memo:Map<number, Set<number>> = new Map();
    let FLOAT_EPSILON:number = -0.0000000001;

    let maxDetonations:number = 1;
    for (let i = 0; i < n; i++) {
        let stack:number[] = [i];
        let detonated:Set<number> = new Set([i]);
        while (stack.length > 0) {
            let currentIndex:number = stack.pop()!
            let currentBomb:number[] = bombs[currentIndex];
            let currentRadius:number = currentBomb[2];
            for (let j = 0; j < n; j++) {
                if (currentIndex === j)  continue
                if (detonated.has(j))  continue

                let potentialNeighbourBomb:number[] = bombs[j];
                let myDistance:number = distance([potentialNeighbourBomb[0], potentialNeighbourBomb[1]], [currentBomb[0], currentBomb[1]]) 
                let temp = currentRadius - myDistance;
                if (temp >= FLOAT_EPSILON) {
                    if (memo.has(j))  {
                        let jBombs:Set<number> = memo.get(j)!;
                        for (const indirectBombIndex of jBombs) {
                            detonated.add(indirectBombIndex);
                        }
                    } else {
                        detonated.add(j);
                        stack.push(j);
                    }
                }
            }
        }
        memo.set(i, detonated)
        maxDetonations = Math.max(maxDetonations, detonated.size);
    }

    return maxDetonations;
};

function distance(point1:[number, number], point2:[number, number]) {
    return Math.sqrt((point2[0] - point1[0])**2 + (point2[1] - point1[1])**2);
}

function mainMaxDetonation():void {
    let bombs:number[][];
    let result:number;
    let doQuitIfAssertFails:boolean = true;

    bombs = [[855,82,158],[17,719,430],[90,756,164],[376,17,340],[691,636,152],[565,776,5],[464,154,271],[53,361,162],[278,609,82],[202,927,219],[542,865,377],[330,402,270],[720,199,10],[986,697,443],[471,296,69],[393,81,404],[127,405,177]];
    console.log(bombs.length)
    result = maximumDetonation(bombs);
    console.log(`Final result ${result}`);
    myAssert(result === 9, doQuitIfAssertFails);

    bombs = [[1,2,3],[2,3,1],[3,4,2],[4,5,3],[5,6,4]];
    result = maximumDetonation(bombs);
    console.log(`Final result ${result}`);
    myAssert(result === 5, doQuitIfAssertFails);

    bombs = [[2,1,3],[6,1,4]];
    result = maximumDetonation(bombs);
    console.log(`Final result ${result}`);
    myAssert(result === 2, doQuitIfAssertFails);

    bombs = [[1,1,5],[10,10,5]];
    result = maximumDetonation(bombs);
    console.log(`Final result ${result}`);
    myAssert(result === 1, doQuitIfAssertFails);
}

mainMaxDetonation();

/*
Data range/assumptions:
bombs length n: [1, 100]
bombs format: [x, y, radius]
x, y, radius: [1, 10^5]
*/

/*
Tests:
n = 1
n = 100
lots of chains
no chains
similar size
varied size
*/

/*
Ideas:

Naive:
    For each starting bomb
        Search all non-detonated bomb points to see if they fall within the radius
            See if distance to currentBomb < radius of currentBomb
        Add to a frontier
        Repeat until frontier empty

Better: cache results
    For each bomb, calculate/cache direct detonations
    Then full detonations is union of direct and all direct of next
    After calculate indirect for a bomb, keep separate cache for that
        And include all bombs covered so that don't have to use the direct ones

More formally:
    for currentBomb in bombs:
        detonated = Set([currentBomb])
        stack = []
        for point in bombPoints:
            if point in detonated:  continue
            if distance(point, currentBombPoint) < currentBombRadius:
                pass

Better: dynamic programming window
    while windowSize < n:
        windowSize++;

Determining point in circle quickly:
    Distance < radius
*/

/*
Completion time (minutes): 118
Question difficulty: Medium
How did it go (1 - 6): 2
    Got stuck on a very tricky bug for a long time
    Think my memoization was assuming commutative when it isn't 
*/