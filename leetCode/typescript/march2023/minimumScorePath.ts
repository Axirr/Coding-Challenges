import myAssert from "./Trie";

function minScore(n: number, roads: number[][]): number {
    let borderCity:Map<number, number[][]> = new Map<number, number[][]>();
    for (let i = 0; i <= n; i++) {
        borderCity.set(i, []);
    }

    for (const road of roads) {
        borderCity.get(road[0])!.push([road[1], road[2]])
        borderCity.get(road[1])!.push([road[0], road[2]])
    }

    let frontier:number[] = [1];
    let visited:Set<number> = new Set<number>();
    let minimumPath:number = roads[0][2];

    while (frontier.length > 0) {
        let currentCity:number = frontier.pop()!;
        visited.add(currentCity);

        let neighbourCity:number[][] = borderCity.get(currentCity)!;
        for (let i = 0; i < neighbourCity.length; i++) {
            const currentCityPair = neighbourCity[i];
            const currentCity = currentCityPair[0];
            const currentDistance = currentCityPair[1];
            if (currentDistance < minimumPath)  minimumPath = currentDistance;

            if (!visited.has(currentCity)) frontier.push(currentCity)
        }
    }

    return minimumPath;
};

function mainMinScore():void {
    let n:number;
    let roads:number[][];
    let minDistance:number;
    let doQuit:boolean = true;

    n = 4;
    roads = [[1,2,9],[2,3,6],[2,4,5],[1,4,7]];
    minDistance = minScore(n, roads);
    console.log(`minDistance ${minDistance}`)
    myAssert(minDistance === 5, doQuit);

    n = 4
    roads = [[1,2,2],[1,3,4],[3,4,7]]
    minDistance = minScore(n, roads);
    console.log(`minDistance ${minDistance}`)
    myAssert(minDistance === 2, doQuit);
}

mainMinScore();

/*
Data range/assumptions:
cities n: [2, 20^5]
roads k: [1, 10^5]
road format: [a, b, distance]
distance values: [1, 10^4]
graph not necessarily connected
Assumption: there is a valid answer
*/

/*
Tests:
n = 2
n = max
k = 1
k = max
all roads same
lots of different roads
no cycles
cycles
min path needs many roads, where a direct/short path exists
min path must be unidirectional?
    I.e. can't be low -> high
*/

/*
Ideas:

WRONG (misunderstood problem)
Naive:
    Djikstra's doesn't work for graphs with negative cycles
    Djikstra's only optimal for end node, not for intermediate ones?
        Makes pruning hard
    Min cost for destination table
        Only add to frontier if current cost less than minimum cost
    Frontier of nodes with travelTime, min heap/priority queue
    What's the termination condition to ensure optimality?
        Is first path that arrives there optimal?
            I think not
            Need to exhaust what's currently in the frontier possibly?

Going badly
Seems weird
Trying to do with a map/dictionary
But ultimately, a better data structure is a graph
Either:
    Nodes
    Adjacency list
But isn't this an adjacency list already?
What about binary search on the sorted adjacency list?
    log(n) search instead of O(1) though


Actual definition is not edge sums, but minimum edge in path
If 1 is connected to n, then it's is really just the minimum edge connected to 1
    Since even if out of the way, can always go back

Naive:
    BFS, radiating outwards from city 1
    Any reason to revisit nodes
        That is, for finding minimum, not for getting a good min in the ultimate path
            Obviously that trivially needs revisits
        Seems like as long as we go one step out from each visited node, we should be good
Another way to think about it, we need to do 2 things:
    Visit every connected node once
    Update minimum for all edges from each visited node
*/

/*
Completion time (minutes): 60
How did it go? badly
Describe:
    Misunderstood problem not once but twice
    After I understood it, it wasn't too bad
*/