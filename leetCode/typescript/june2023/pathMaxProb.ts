import myAssert from "../march2023/Trie";

function maxProbability(n: number, edges: number[][], succProb: number[], start: number, end: number): number {
    let result:number = 0;
    let neighbourList:Map<number, Set<number>> =  new Map();
    for (let i = 0; i < n; i++) {
        neighbourList.set(i, new Set())
    }
    for (const edge of edges) {
        let firstEdge:number = edge[0];
        let secondEdge:number = edge[1];
        neighbourList.get(firstEdge)!.add(secondEdge);
        neighbourList.get(secondEdge)!.add(firstEdge);
    }

    let visitedMaxProb:Map<number, number> = new Map();
    function recursiveTraversalWithRunningProbability(currentNode:number, currentProb:number):number | null {
        let maxProb:number | null = null;
        // let frontier:number[] = [start];

        // while (frontier.length > 0) {
        if (visitedMaxProb.has(currentNode) && visitedMaxProb.get(currentNode)! > currentProb)  return maxProb;
        visitedMaxProb.set(currentNode, currentProb);
        console.log(`visited node ${currentNode}`)
        let neighbours:Set<number> = neighbourList.get(currentNode)!;
        for (const neigh of neighbours) {
            let childProb:number | null = recursiveTraversalWithRunningProbability(neigh, currentProb);
        }
        // }
        return maxProb;
    }

    let maxProb:number | null = recursiveTraversalWithRunningProbability(start, 1.0);
    if (maxProb !== null)  result = maxProb;

    return result;
};


function mainMaxProb():void {
    let n:number;
    let edges:number[][];
    let succProb:number[];
    let start:number;
    let end:number;
    let result:number;
    let doQuitIfAssertFails:boolean = true;

    n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2;
    result = maxProbability(n, edges, succProb, start, end);
    console.log(`result ${result}`);
    myAssert(result === 0.25000, doQuitIfAssertFails);
}

mainMaxProb();

/*
Data range/assumptions:
n: [2, 10^4]
start, end: [0, n]
probabilities: [0, 1]
*/

/*
Tests:
*/

/*
Ideas:

Naive:
    Recursive BFS, keep running probability value
    Return max probability

How to deal with visited?
    Keep track of visited and maxProb
    If currentProb <= maxProb, don't explore
        Not an optimal route to this node

How to turn edges into a directed graph?
    Adjacency list for each node
    Plus visited to stop loops

Better:
    Max heap priority queue of [currentProb, node]
*/

/*
Completion time (minutes):
Question difficulty:
How did it go (1 - 6):
*/