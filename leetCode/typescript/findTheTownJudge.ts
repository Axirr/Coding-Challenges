function findJudge(n: number, trust: number[][]): number {
    if (n === 1)  { return 1; }

    var resultNum:number = -1;
    var adjacencyList:number[][] = [[]];
    var currentTrust:number[] = [0, 0];
    var trustsSomeone:Set<number> = new Set<number>();

    for (var i=0; i < n; i++) {
        adjacencyList.push([])
        trustsSomeone.add(i+1)
    }
    for (var i=0; i < trust.length; i ++) {
        currentTrust = trust[i]
        adjacencyList[currentTrust[1]].push(currentTrust[0])
        trustsSomeone.delete(currentTrust[0])
    }

    if (trustsSomeone.size === 0)  {return -1}

    for (let element of trustsSomeone) {
        if (adjacencyList[element].length === n - 1)  {return element}
    }

    return resultNum
};

function findJudgeMain():void {
    var n:number;
    var trust:number[][];
    var resultJudge:number;
    n = 2
    trust = [[1,2]]
    resultJudge = findJudge(n, trust)
    console.log(resultJudge)
    console.assert(resultJudge === 2)
    n = 3
    trust = [[1,3],[2,3]]
    resultJudge = findJudge(n, trust)
    console.log(resultJudge)
    console.assert(resultJudge === 3)
    n = 3, trust = [[1,3],[2,3],[3,1]]
    resultJudge = findJudge(n, trust)
    console.log(resultJudge)
    console.assert(resultJudge === -1)
}

findJudgeMain()

/*
Data range/assumptions:
number: [1, 1000]
trust length n: [1, 10^4]
trust values: [1, n]
*/

/*
Tests:
n = 1
n = 10^4
large number
*/

/*
Ideas:

Seems like a graph
Create adjaceny list for everyone, see if it contains everyone but judge
*/