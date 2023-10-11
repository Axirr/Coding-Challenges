import myAssert from "../march2023/Trie";

class GraphNode {
    neighbours:Set<GraphNode>;
    val:number[];

    constructor(val:number[]) {
        this.val = val;
        this.neighbours = new Set();
    }

    addNeighbour(newNeighbour:GraphNode):void {
        this.neighbours.add(newNeighbour);
    }

    removeNeighbour(neigh:GraphNode):void {
        this.neighbours.delete(neigh);
    }
}

function eraseOverlapIntervals(intervals: number[][]): number {
    let stringSet:Set<string> = new Set();
    let i = intervals.length - 1;
    let removalCount:number = 0;
    while (i >= 0) {
        let interval:number[] = intervals[i];
        let stringRepr:string = interval.toString();
        if (!stringSet.has(stringRepr)) {
            stringSet.add(stringRepr);
        } else {
            intervals[i] = intervals[intervals.length  - 1];
            intervals.pop();
            removalCount += 1;
            i -= 1
        }
        i -= 1;
    }
    let allNodesSet:Set<GraphNode> = makeGraph(intervals);

    while (allNodesSet.size > 0) {
        let maxNeighbours:number = 0;
        let maxNode:GraphNode | null = null;
        for (const node of allNodesSet) {
            if (node.neighbours.size === 0)  allNodesSet.delete(node);
            else if (node.neighbours.size > maxNeighbours) {
                maxNeighbours = node.neighbours.size;
                maxNode = node;
            } 
        }
        if (maxNode === null)  break;
        removalCount += 1;
        allNodesSet.delete(maxNode);
        for (const neigh of maxNode.neighbours) {
            neigh.removeNeighbour(maxNode);
        }
    }

    return removalCount;
};

function isNeighbour(currentNode:GraphNode, otherNode:GraphNode):boolean {
    let isNeigh:boolean = false;
    let maxX:number = Math.max(otherNode.val[1], currentNode.val[1])
    let minX:number = Math.min(otherNode.val[0], currentNode.val[0]);
    if ((currentNode.val[1] === maxX && currentNode.val[1] === minX) || (otherNode.val[1] === maxX && otherNode.val[0] === minX))  isNeigh = true;
    else {
        let maxLength:number = maxX - minX;
        if (maxLength - (currentNode.val[1] - currentNode.val[0]) - (otherNode.val[1] - otherNode.val[0]) < 0)  isNeigh = true;
    }

    return isNeigh;
}

function makeGraph(intervals:number[][]):Set<GraphNode> {
    let result:GraphNode[] = [];
    let allNodesSet:Set<GraphNode> = new Set();

    for (const interval of intervals) {
        let newNode:GraphNode = new GraphNode(interval);
        allNodesSet.add(newNode);
    }

    for (const currentNode of allNodesSet) {
        for (const neigh of allNodesSet) {
            if (neigh === currentNode)  continue
            if (!isNeighbour(currentNode, neigh))  continue
            currentNode.addNeighbour(neigh);
            neigh.addNeighbour(currentNode);
        }
        result.push(currentNode);
    }

    return allNodesSet;
}

function printGraph(root:GraphNode) {
    let visited:Set<GraphNode> = new Set();
    let frontier:GraphNode[] = [root];
    visited.add(root);
    while (frontier.length > 0) {
        let currentNode:GraphNode = frontier.pop()!;
        console.log(currentNode.val);
        for (const neigh of currentNode.neighbours) {
            if (!visited.has(neigh)) {
                visited.add(neigh);
                frontier.push(neigh);
            }
        }
    }
}

function mainEraseOverlapIntervals():void {
    let intervals:number[][];
    let result:number;
    let correctResult:number;
    let doQuitIfAssertFails:boolean = true;

    intervals = [[-25322,-4602],[-35630,-28832],[-33802,29009],[13393,24550],[-10655,16361],[-2835,10053],[-2290,17156],[1236,14847],[-45022,-1296],[-34574,-1993],[-14129,15626],[3010,14502],[42403,45946],[-22117,13380],[7337,33635],[-38153,27794],[47640,49108],[40578,46264],[-38497,-13790],[-7530,4977],[-29009,43543],[-49069,32526],[21409,43622],[-28569,16493],[-28301,34058]];
    result = eraseOverlapIntervals(intervals);
    correctResult = 19;
    console.log(`final result ${result} should be ${correctResult}`);
    return;

    intervals = [[0,2],[1,3],[1,3],[2,4],[3,5],[3,5],[4,6]];
    result = eraseOverlapIntervals(intervals);
    correctResult = 4;
    console.log(`final result ${result} should be ${correctResult}`);
    myAssert(result === correctResult, doQuitIfAssertFails);

    intervals = [[1,2],[2,3],[3,4],[1,3]];
    result = eraseOverlapIntervals(intervals);
    correctResult = 1;
    console.log(`final result ${result} should be ${correctResult}`);
    myAssert(result === correctResult, doQuitIfAssertFails);

    intervals = [[1,2],[2,3]];
    result = eraseOverlapIntervals(intervals);
    correctResult = 0;
    console.log(`final result ${result} should be ${correctResult}`);
    myAssert(result === correctResult, doQuitIfAssertFails);
}

mainEraseOverlapIntervals();

/*
Data range/assumptions:
n intervals: [1, 10^5]
interval values: [-5 * 10^4, 5 * 10^4]
*/

/*
Tests:
n = 1
n = max
many overlaps
interval with most overlaps is not the one to remove
    E.g. overlaps 7, all others overlap 6 but cause more problems?
interval that is the excusive connection of two families not optimal to remove
    Maybe the one right after it is
*/

/*
Ideas:

Naive:
    Calculate overlap families
    Ignore non-overlapping intervals
    Try removing a random interval
    Repeat recursively until no overlap
    Repeat for each random interval until find minimum
        Prune any that require more removals than current minimum
    Time complexity: super slow

Construct graph of connections between intervals
Ignore graphs with n = 1
In graphs n > 2, find interval with most neighbours and remove?
    A good heuristic but likely non-optimal
    Could use to speed up brute force with pruning
    How could it be non-optimal though?
        E.g. [0,5]  [1, 6] [2, 8] [7, 9]
        [2,8] overlaps everything so the alternatives are either only [2,8] or something else
            Worse case, something else is also n = 1, so same number of removals
            But there is potential upside

Splitting classes into smaller groups would be good for efficiency
    But probably not optimal

Constructing graph is non-trivialcurrentNode
Can't just do pairwise connections
    Need to explore outward in class to fully explore
Can't just iterate in order
Have a visited set
And a next array
Whenever find neighbour not in visited, add to next array
Empty next array before continuing in order iteration

Problem: what if there is a tie for max neighbours
*/

/*
Completion time (minutes):
Question difficulty:
How did it go (1 - 6):
*/