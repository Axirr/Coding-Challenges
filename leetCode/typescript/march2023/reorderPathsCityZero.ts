import myAssert from "./Trie";

function minReorder(n: number, connections: number[][]): number {
    let neighboursList:Map<number, number[]> = new Map();

    for (let i=0; i < n; i++) {
        neighboursList.set(i, []);
    }

    for (let i = 0; i < connections.length; i++) {
        const currConnect = connections[i];
        neighboursList.get(currConnect[0])!.push(currConnect[1])
        neighboursList.get(currConnect[1])!.push(-currConnect[0])
    }

    let frontier:number[] = [0];
    let previousParent:number[] = [0];
    let reverseCount:number = 0;

    while (frontier.length > 0) {
        let currentCity:number = frontier.pop()!;
        let previousCity:number = previousParent.pop()!;
        let currentNeighbours:number[] = neighboursList.get(currentCity)!;

        for (let i=0; i < currentNeighbours.length; i++) {
            let signedCity:number = currentNeighbours[i];
            let unsignedCity:number = Math.abs(signedCity);
            if (unsignedCity !== previousCity) {
                if (signedCity > 0)  reverseCount++;
                frontier.push(unsignedCity);
                previousParent.push(currentCity);
            }
        }
    }

    return reverseCount;
};

function mainMinReorder():void {
    let n:number;
    let connections:number[][];
    let result:number;
    let doQuit:boolean = true;

    n = 6;
    connections = [[0,1],[1,3],[2,3],[4,0],[4,5]];
    result = minReorder(n, connections);
    console.log(result)
    myAssert(result === 3, doQuit);

    n = 5;
    connections = [[1,0],[1,2],[3,2],[3,4]];
    result = minReorder(n, connections);
    console.log(result)
    myAssert(result === 2, doQuit);

    n = 3;
    connections = [[1,0],[2,0]];
    result = minReorder(n, connections);
    console.log(result)
    myAssert(result === 0, doQuit);
}

mainMinReorder();

/*
Data range/assumptions:
cities n: [2, 10^5]
connections: n - 1
    Not bidirectional so ordering matters
*/

/*
Tests;
n = 1
n = max
???
*/

/*
Ideas:

Naive:
    Frontier = [0]
    For node in frontier:
    From frontier node, pop any real and theoretical connections
        Real: road runs from i to 0
            E.g. [2, 0]
        Theoretical: road may currently be pointed in the wrong direction
            E.g. [0, 2]
    ReorderNum += theoreticalCount
    and then make those the new "frontier"

Speeding up the lookup:
    Neighbour list
        Negative value indicates theoretical?

Solution time complexity:
    Construct neighbours list: O(n)

*/

/*
Completion time (minutes): 32
How did it go: well
Describe:
    Idea worked
    Minor debugging
*/