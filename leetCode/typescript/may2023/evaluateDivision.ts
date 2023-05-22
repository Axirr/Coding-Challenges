import myAssert from '../march2023/Trie';
import funcs from './swapEverySecondNode';

function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {
    // Convert equations to strings so they are set searchable/hashable?
    let allVariables:Set<string> = new Set();
    for (const eqn of equations) {
        allVariables.add(eqn[0]);
        allVariables.add(eqn[1]);
    }
    // for (const myVar of allVariables)  console.log(`var ${myVar}`)
    let pairRelationMap:Map<string, Set<string>> = new Map();
    for (const myVar of allVariables)  pairRelationMap.set(myVar, new Set());
    for (const myEqn of equations)  {
        pairRelationMap.get(myEqn[0])!.add(myEqn[1]);
        pairRelationMap.get(myEqn[1])!.add(myEqn[0]);
    }
    for (const pair of pairRelationMap)  console.log(`key ${pair[0]} valye ${pair[1]}`);

    let solvedVariables:Map<string, number> = new Map();
    // solvedVariables.set("a", 6)
    let index = 0;

    while (index < equations.length) {
        let currentEquation:string[] = equations[index];
        // Check if either variable is solved
        let firstVar:string = currentEquation[0];
        let secondVar:string = currentEquation[1];
        if (solvedVariables.has(firstVar) && solvedVariables.has(secondVar)) {
            index++;
            continue;
        }

        // If so, equation can be solved on its own
        if (solvedVariables.has(firstVar) || solvedVariables.has(secondVar)) {
            let currSolVar:string = solvedVariables.has(firstVar) ? firstVar : secondVar;
            let currUnsolved:string = solvedVariables.has(firstVar) ? secondVar : firstVar;
            let solvedVarResult:number = currSolVar === secondVar ? values[index] / solvedVariables.get(currSolVar)! : solvedVariables.get(currSolVar)! / values[index];
            solvedVariables.set(currUnsolved, solvedVarResult);

            equations.splice(index, 1);
            index = 0;
            continue;
        } 

        const stringConst:string = "not found"
        let solvableVar:string = stringConst;
        for (const myVar of pairRelationMap[firstVar]) {
            if (myVar === secondVar)  continue;
            if (pairRelationMap.get(firstVar)!.has(myVar) && pairRelationMap.get(secondVar)!.has(myVar))  {
                console.log(`${myVar} is solvable`)
                solvableVar = myVar;
                break;
            }
        }

        if (solvableVar === stringConst) {
            index++;
            continue;
        }

        // Create all equations as 2 char string
        //  20^2 worst case

        // Search equations for either orientation of first, solveable

        // Search equations for either orientation of second, solveable

        // Use one of four (2 with orientation?) different variables to solve for solvable

        // Set solvedVariable[solvable]

        // Remove equation

        // i = 0 and continue

        // // For every other equation with firstVar, check if equation exists with thirdVar and secondVar
        // let varArray:string[] = [firstVar, secondVar];
        // for (const currentVar of varArray) {
        //     for (let j = 0; j < equations.length; j++) {
        //         if (j === index)  continue
        //         let otherEqn:string[] = equations[j];
        //         if (otherEqn[0] === currentVar || otherEqn[1] === currentVar) {
        //             let thirdVar = otherEqn[0] === currentVar ? otherEqn[1] : otherEqn[0];
        //             for (let k = 0; k < equations.length; k++) {
        //                 if (k === j || k === index)  continue
        //                 let thirdEqn:string[] = equations[k];
        //                 if (thirdEqn[0] === thirdVar || thirdEqn[1] === thirdVar) {
        //                     let fourthVar:string = thirdEqn[0] === thirdVar ? thirdEqn[1] : thirdEqn[0];
        //                     if (fourthVar === currentVar)  {
        //                         console.log(`Variable ${currentVar} is solvable`);
        //                         return [1]
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }

        

        index++;
    }

    for (const pair of solvedVariables)  console.log(`key ${pair[0]} value ${pair[1]}`)

    let results:number[] = [];

    for (let i = 0; i < queries.length; i++) {
        let currentQuery:string[] = queries[i];
        let firstVar:string = currentQuery[0];
        let secondVar:string = currentQuery[1];
        let currentResult:number;
        if (solvedVariables.has(firstVar) && solvedVariables.has(secondVar)) {
            currentResult = solvedVariables.get(firstVar)! / solvedVariables.get(secondVar)!;
        // Any queries with query[0] === query[1]  solvable as 1
        } else if (firstVar === secondVar)  currentResult = 1.0; 
        else  currentResult = -1.0;
        results.push(currentResult);
    }


    return results;
};

function mainCalcEquation():void {
    let equations:string[][];
    let values:number[];
    let queries:string[][];
    let result:number[];
    let correctResult:number[];
    let doQuitIfAssertFail:boolean = true;

    equations = [["a","b"], ["b", "c"], ["a", "c"]]
    values = [2.0, 1 / 2, 8];
    queries = [["b","a"]];
    result = calcEquation(equations, values, queries);
    console.log(`final result ${result}`);
    correctResult = [ 1 / 2];
    myAssert(funcs.listEquality(result, correctResult), doQuitIfAssertFail);
    return;

    equations = [["a","b"],["b","c"]]
    values = [2.0,3.0];
    queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]];
    result = calcEquation(equations, values, queries);
    console.log(`final result ${result}`);
    correctResult = [6.00000,0.50000,-1.00000,1.00000,-1.00000];
    myAssert(funcs.listEquality(result, correctResult), doQuitIfAssertFail);
}

mainCalcEquation();

/*
Data range/assumptions:
*/

/*
Tests:
    Impossible to solve despite a,b b,c a,c because of orientaton (both top or bottom)
    Equations of from both [a,b] and [b,a] and only one works
*/

/*
Ideas:

Naive:

Can solve equation if only one variable is undefined
Use queries to equations to establish values we can solve
Try combining equations with others that have at least one of the variables
Make equationVariablesSet for each
    Combine, and if variables number is <= equations, mark all variables as solved
Each time we mark as solved, restart and see if others can be solved

Then evaluate queries
    If all variables solved, evaluate
    Else, -1

*/

/*
Completion time (minutes):
Question difficulty:
How did it go (1 - 6):
*/