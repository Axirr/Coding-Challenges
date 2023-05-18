import myAssert from '../march2023/Trie';
import funcs from './swapEverySecondNode';

function findSmallestSetOfVertices(n: number, edges: number[][]): number[] {
    let parentlessSet:Set<number> = new Set()
    for (const currEdge of edges) {
        parentlessSet.add(currEdge[0]);
    }

    for (const currEdge of edges) {
        parentlessSet.delete(currEdge[1]);
    }

    return Array.from(parentlessSet);
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

Better solution than removing from result list?
    Doing most neighbours first might help but unlikely a guarantee
Double adjacency list, with backwards nodes as negative
    Because are connected to those nodes by a single indirection
        If more than one, can't use this?
    But what about a simple linear structure
        E.g. 1 -> 2 -> 3
        Broken by that rule
    For negatives, get their full non-negative neighbours
        If this covers non-negative neighbours of parent, don't add that old parent
    Seems ugly

Nodes without parents must be included?
    I.e. if no incoming edges
    Do all those first?
    Will fully cover I think
*/

/*
Completion time (minutes): 31
Question difficulty: Medium
How did it go (1 - 6): 3
    Took me a fair amount of time
    Initial strategy flawed
    Some bugs
*/