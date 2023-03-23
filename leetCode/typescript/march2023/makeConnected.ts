import myAssert from "./Trie";

function makeConnected(n: number, connections: number[][]): number {
    let fullNeighbourList:Map<number, number[]> = new Map<number, number[]>();

    for (let i = 0; i < connections.length; i++) {
        const computerTriplet:number[] = connections[i];
        const computer1:number = computerTriplet[0];
        const computer2:number = computerTriplet[1];

        if (fullNeighbourList.get(computer1) === undefined)  fullNeighbourList.set(computer1, [])
        if (fullNeighbourList.get(computer2) === undefined)  fullNeighbourList.set(computer2, [])

        fullNeighbourList.get(computer1)!.push(computer2);
        fullNeighbourList.get(computer2)!.push(computer1);
    }
    
    let numConnectedComputers:number = fullNeighbourList.size;

    let visited:Set<number> = new Set<number>();
    let frontier:number[] = [];
    // let groupCount:number = n - numConnectedComputers;
    let groupCount:number = 0;
    // console.log(`numConnectedComputers ${numConnectedComputers}`)
    // let groupCount:number = 0;
    let startComputerForEachGroup:number[] = [];
    let extraConnections:number = 0;
    let currentGroupCounnections:number = 0;

    while (visited.size < n) {
        // console.log(`visited.size ${visited.size}`)
        groupCount++;

        for (let i = 0; i < n; i++) {
            if (!visited.has(i)) {
                frontier.push(i);
                break;
            }
        }

        startComputerForEachGroup.push(frontier[0]);
        currentGroupCounnections = 0;
        let groupSize:number = 1;

        while (frontier.length > 0) {
            let currentComputer:number = frontier.pop()!;
            let neighboursList:number[] = fullNeighbourList.get(currentComputer)!
            if (neighboursList === undefined) {
                visited.add(currentComputer);
                continue;
            }
            currentGroupCounnections += neighboursList.length;
            for (const computer of neighboursList) {
                if (!visited.has(computer)) {
                    groupSize++;
                    visited.add(computer);
                    frontier.push(computer);
                }
            }
        }

        let connectionsFormula:number = (Math.floor(currentGroupCounnections / 2) - groupSize + 1);
        if (connectionsFormula > 0)  extraConnections +=  connectionsFormula;
    }

    // console.log(`groupCount ${groupCount}`)
    // console.log(`extraConnections ${extraConnections}`)
    if (extraConnections < (groupCount - 1))  return -1;
    return groupCount - 1;
};

function mainMakeConnected():void {
    let n:number;
    let connections:number[][];
    let result:number;
    let doQuit:boolean = true;

    n = 100;
    connections = [[17,51],[33,83],[53,62],[25,34],[35,90],[29,41],[14,53],[40,84],[41,64],[13,68],[44,85],[57,58],[50,74],[20,69],[15,62],[25,88],[4,56],[37,39],[30,62],[69,79],[33,85],[24,83],[35,77],[2,73],[6,28],[46,98],[11,82],[29,72],[67,71],[12,49],[42,56],[56,65],[40,70],[24,64],[29,51],[20,27],[45,88],[58,92],[60,99],[33,46],[19,69],[33,89],[54,82],[16,50],[35,73],[19,45],[19,72],[1,79],[27,80],[22,41],[52,61],[50,85],[27,45],[4,84],[11,96],[0,99],[29,94],[9,19],[66,99],[20,39],[16,85],[12,27],[16,67],[61,80],[67,83],[16,17],[24,27],[16,25],[41,79],[51,95],[46,47],[27,51],[31,44],[0,69],[61,63],[33,95],[17,88],[70,87],[40,42],[21,42],[67,77],[33,65],[3,25],[39,83],[34,40],[15,79],[30,90],[58,95],[45,56],[37,48],[24,91],[31,93],[83,90],[17,86],[61,65],[15,48],[34,56],[12,26],[39,98],[1,48],[21,76],[72,96],[30,69],[46,80],[6,29],[29,81],[22,77],[85,90],[79,83],[6,26],[33,57],[3,65],[63,84],[77,94],[26,90],[64,77],[0,3],[27,97],[66,89],[18,77],[27,43]]
    result = makeConnected(n, connections);
    console.log(result);
    myAssert(result === 13, doQuit);

    n = 8;
    connections = [[0,2],[2,7],[5,7],[2,6],[1,3],[4,6],[1,2]];
    result = makeConnected(n, connections);
    console.log(result);
    myAssert(result === 0, doQuit);

    n = 4;
    connections = [[0,1],[0,2],[1,2]];
    result = makeConnected(n, connections);
    console.log(result);
    myAssert(result === 1, doQuit);

    n = 6;
    connections = [[0,1],[0,2],[0,3],[1,2],[1,3]];
    result = makeConnected(n, connections);
    console.log(result);
    myAssert(result === 2, doQuit);

    n = 6;
    connections = [[0,1],[0,2],[0,3],[1,2]];
    result = makeConnected(n, connections);
    console.log(result);
    myAssert(result === -1, doQuit);

}

mainMakeConnected();

/*
Data range/assumptions:
computers n: [1, 10^5]
connections k: [?, ~n^2 || 10^5]
connections not between same computer
*/

/*
Tests:
n = 1
n = 10^5
many connections
sparse connections
no connections?
many discrete groups
sparely connected group where you can't remove any wires without breaking it
    So it's impossible
connection that could be purged is more than one connection long
*/

/*
Ideas:

Naive:
    Partition into groups
    Determine how many extra connections exist
        Extra = won't break group by being removed
    If extra >= # groups, possible
    # groups - 1 is result

Determine if groups remaining:
    Maintain visited check
    While not === length to n, traverse 0-n to find next not missing
*/

/*
Completion time (minutes): 48
How did it go? medium
Describe:
    Ideas was decent
    Some implementation hiccups
*/