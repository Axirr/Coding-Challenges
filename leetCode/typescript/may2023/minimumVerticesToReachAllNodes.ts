import myAssert from '../march2023/Trie';
import funcs from './swapEverySecondNode';

function findSmallestSetOfVertices(n: number, edges: number[][]): number[] {
    let resultVertices:Set<number> = new Set();
    let notVisited:Set<number> = new Set();
    for (let i = 0; i < n; i++)  notVisited.add(i);
    let adjacencyList:Map<number,number[]> = new Map();
    for (const vertNum of notVisited) {
        adjacencyList.set(vertNum, []);
    }
    for (const currEdge of edges) {
        adjacencyList.get(currEdge[0])!.push(currEdge[1])
    }

    let setIterator:IterableIterator<number> = notVisited[Symbol.iterator]();
    while (notVisited.size > 0) {
        let currentVert:number = setIterator.next().value;
        notVisited.delete(currentVert);
        resultVertices.add(currentVert);

        let frontier:number[] = [currentVert];
        while (frontier.length > 0) {
            let traverseVert:number = frontier.pop()!;
            // console.log(`Traverse vert ${traverseVert}`)
            let neighbours:number[] = adjacencyList.get(traverseVert)!;
            for (const neigh of neighbours)  {
                // console.log(`neigh ${neigh}`)
                if (resultVertices.has(neigh))  resultVertices.delete(neigh)
                if (notVisited.has(neigh)) {
                    frontier.push(neigh);
                }
                notVisited.delete(neigh);
            }
        }
    }

    return Array.from(resultVertices);
};

function mainFindSmallestSetOfVertices():void {
    let n:number;
    let edges:number[][];
    let result:number[];

    let correctResult:number[];
    let doQuitIfAssertFails:boolean = true;

    n = 3;
    edges = [[1,2],[1,0],[0,2]];
    correctResult = [1];
    result = findSmallestSetOfVertices(n, edges);
    console.log(`Final result ${result}`);
    myAssert(funcs.listEquality(result, correctResult), doQuitIfAssertFails)

    n = 6;
    edges = [[0,1],[0,2],[2,5],[3,4],[4,2]];
    correctResult = [0,3];
    result = findSmallestSetOfVertices(n, edges);
    console.log(`Final result ${result}`);
    myAssert(funcs.listEquality(result, correctResult), doQuitIfAssertFails)

    n = 5;
    edges = [[0,1],[2,1],[3,1],[1,4],[2,4]];
    correctResult = [0,2,3];
    result = findSmallestSetOfVertices(n, edges);
    console.log(`Final result ${result}`);
    myAssert(funcs.listEquality(result, correctResult), doQuitIfAssertFails)
}

mainFindSmallestSetOfVertices();

/*
Data range/assumptions:
n: [2, 10^5]
edges: [1, n]
all pairs distinct
*/

/*
Tests:
n = 1
n = max
fully connected
fully disconnected
*/

/*
Ideas:

Naive:
    Set of not visited numbers
    resultNodes = []
    for node from notVisited:
        resultNodes.append(node)
        while node:
            set.delete(node)
            if node[1] in notVisted:
                node = node[1]
            else node = null

Problem: order of choice of traversal vertices
    E.g. imagine a fully connected graph with a node that is not the sender on any edge
        If that is chosen first, it won't connect to the backwards ones
    Treating as an undirected list would solve this problem
    Maybe create more
*/

/*
Completion time (minutes):
Question difficulty:
How did it go (1 - 6):
*/