import myAssert from "../march2023/Trie";

function isBipartite(graph: number[][]): boolean {
    let n:number = graph.length;
    
    let visitedSet:Set<number> = new Set();
    for (let firstNode = 0; firstNode < n; firstNode++) {
        if (graph[firstNode].length === 0) continue;

        // Initialize two partitions and put starting node in one of them
        let set1:Set<number> = new Set();
        let set2:Set<number> = new Set();
        set1.add(firstNode);
        let frontier:number[] = [firstNode];

        while (frontier.length > 0) {
            let currentNode:number = frontier.pop()!;
            visitedSet.add(currentNode);
            for (let i = 0; i < graph[currentNode].length; i++) {
                const neigh = graph[currentNode][i];

                // Add any unvisited neighbours to the search frontier
                if (!visitedSet.has(neigh))  {
                    visitedSet.add(neigh);
                    frontier.push(neigh);
                }
            }

            // Determine which set the currentNode is in
            let selfSet:Set<number> = set1;
            let setForNeighs:Set<number> = set2;
            if (!set1.has(currentNode))  {
                selfSet = set2;
                setForNeighs = set1;
            }

            for (const neigh of graph[currentNode]) {
                if (selfSet.has(neigh))  return false;
                setForNeighs.add(neigh);
                if (!visitedSet.has(neigh))  frontier.push(neigh)
            }
        }
    }
    return true;
};

function setsForStartingNode(firstNode:number, graph:number[][]):[Set<number>, Set<number>] | null {
    let set1:Set<number> = new Set();
    let set2:Set<number> = new Set();
    let frontier:number[] = [firstNode];
    let visitedSet:Set<number> = new Set();
    visitedSet = new Set();
    set1.add(firstNode);
    while (frontier.length > 0) {
        let currentNode:number = frontier.pop()!;
        visitedSet.add(currentNode);
        let selfSet:Set<number> = set1;
        let setForNeighs:Set<number> = set2;

        if (!set1.has(currentNode))  {
            selfSet = set2;
            setForNeighs = set1;
        }

        let neigh:number;
        for (neigh of graph[currentNode]) {
            if (selfSet.has(neigh))  return null;
            setForNeighs.add(neigh);
            if (!visitedSet.has(neigh))  frontier.push(neigh)
        }
    }

    return [set1, set2]
}

function combineSet(set1:[Set<number>, Set<number>], set2:[Set<number>, Set<number>]):[Set<number>, Set<number>][] {
    let result:[Set<number>, Set<number>][] = [];
    let firstSet = set1[0];
    let secondSet = set1[1];

    let indices:number[][] = [[0,1], [1, 0]];
    for (const currIndices of indices) {
        let currFirstSet = set2[currIndices[0]];
        let currSecondSet = set2[currIndices[1]];

        for (const element of currFirstSet)  if (firstSet.has(element)) continue

        for (const element of currSecondSet)  if (secondSet.has(element)) continue

        let resultFirst = new Set([...firstSet, ...currFirstSet]);
        let resultSecond = new Set([...secondSet, ...currSecondSet]);
        result.push([resultFirst, resultSecond])
    }

    return result;
}

function mainIsBipartite():void {
    let graph:number[][];
    let result:boolean;
    let doQuitIfAssertFails:boolean = true;

    graph = [[1,2],[0],[0],[4],[3],[],[8],[],[6],[10,11],[9],[9],[14],[],[12],[16,17],[15],[15],[19,20],[18],[18],[22,23],[21],[21],[26],[],[24],[28,29],[27],[27]];
    result = isBipartite(graph);
    console.log(`Final result ${result}`);
    myAssert(result, doQuitIfAssertFails);

    graph = [[],[3],[],[1],[]];
    result = isBipartite(graph);
    console.log(`Final result ${result}`);
    myAssert(result, doQuitIfAssertFails);

    graph = [[1],[0],[4],[4],[2,3]];
    result = isBipartite(graph);
    console.log(`Final result ${result}`);
    myAssert(result, doQuitIfAssertFails);

    graph = [[1], [0], [3], [2]]
    // valid bipartition: {0, 3} {1, 2}
    result = isBipartite(graph);
    console.log(`Final result ${result}`);
    myAssert(result, doQuitIfAssertFails);

    graph = [[1,2,3],[0,2],[0,1,3],[0,2]];
    result = isBipartite(graph);
    console.log(`Final result ${result}`);
    myAssert(!result, doQuitIfAssertFails);

    graph = [[1,3],[0,2],[1,3],[0,2]];
    result = isBipartite(graph);
    console.log(`Final result ${result}`);
    myAssert(result, doQuitIfAssertFails);
}

mainIsBipartite();

/*
Data range/assumptions:
n: [1, 100]
adjacency list
undirected graph, so the list for a vertex will have corresponding entry in other list
*/

/*
Tests:
n = 1
n = 100
fully connected
fully disconnected
0th node unconnected
*/

/*
Ideas:

Explainting question:
    Want for each edge to connect to both sets
    Translating from adjacency list to [from, to] edges makes graphs easier for humans to read
    E.g. 0 - 1 - 2, and a bunch of isolates
        directed edges: [0,1], [1,2]
            first edges mandates {0} {1}
            second ege mandates {1} {2}
            So {0, 2} and {1} works
    If graph not fully conencted, impossible?
        No, because there's no edges there
            E.g. example above works with any number of fully unconnected vertices
    Each edge defines a bifurcation
    Bifurcation pairs that share a number define a union
        If that union edge exists, bifurcation impossible
    E.g. graph = [[1,2,3],[0,2],[0,1,3],[0,2]]
        edges: [0,1] [0,2] [0,3], [1, 2] [2, 3]
            Sets required for i of edges
            i = 0
                {0} {1}
            i = 1
                {0} {1, 2} implied by {0} {2} restriction
                If {1, 2} exists, impossible
                And it does, so it's impossible
            i = 2
    How to add restrictions?
        Both in sets:
        One in sets:
        None in sets:
            Defines new set
        If both in one set already, fail
        If both in different sets
    
    How to deal with third set
        E.g. edges: [0, 1] [2, 3] [5, 4]
            Traversal and check for non-isolated islands would deal with this one?
            So every edge except the first must connect to some set
    Rather than iterating over edges, using adjaceny lists of nodes in set guarantee connection to last vertex


Naive:
    Traverse, recording visited
        For unvisited, ensure no edges
            I.e. adjacencyList.length === 0
    Contruct list of connected nodes
    for node of connectedNodes
        for node of adjacencyList[node]:
            Construct edge where from < to
            if newEdge not in usedEges:
                usedEdges.add(edge)
                Check set membership
                    Both belong, no change
                    One belongs:
                        If other in other set, return false
                        Else add other to other set
                    NOT POSSIBLE: neither belongs
    return true

Assumption about isolated islands wasn't correct
    E.g. [0,1] [2,3] [3,4]
        Set {0, 2, 4} {1, 3} works
    However, can't we just run recursively on each non-isolate, unconnected graph
    Will return sets
    If those sets can be combined in some non-inconsistent way, will work

Permutating sets is a non-trivial problem though:
    Naive: create all permutations and check if they work
        Worst case: n / 2 sets, which is 100 here (i.e. a bunch of isolated pairs)
        Possibly 2^50 - 1
    Repeatedly combine using two groups
    Only using valid groups from the combos
    What about if done dynamically, with expanding window size
        E.g. try to combine into groups of two
        A
*/

/*
Completion time (minutes): 142
Question difficulty: Medium
How did it go (1 - 6): 1
    Took a super long time
    Initial attempt was based on a flawed assumption/understanding of question
        Thought that disjoint with edges meant impossible
        When really only needed each disjoint to be bipartite
    Solution is ugly
    Many bugs
    Combined old failed approach with new one which created a lot of extra work and then turned out to not be necessary
    Only plus is that I actually finished it without looking things up
*/