import myAssert from '../march2023/Trie';
import funcs from './swapEverySecondNode';

class DoublyLinkedList {
    value:String | number;
    parents:DoublyLinkedList[];
    children:DoublyLinkedList[];

    constructor(value:String | number) {
        this.value = value;
        this.parents = [];
        this.children = [];
    }

    addParent(node:DoublyLinkedList, isFirst = true) {
        this.parents.push(node);
        if (isFirst)  node.addChild(this, false);
    }

    addChild(node:DoublyLinkedList, isFirst = true) {
        this.children.push(node);
        if (isFirst) node.addParent(this, false);
    }

    childrenPrettyPrint() {
        console.log(this.value);
        for (const child of this.children) {
            console.log(`child ${child.value}`);
        }
        for (const child of this.children) {
            child.childrenPrettyPrint();
        }
    }

    parentPrettyPrint() {
        console.log(this.value);
        for (const parent of this.parents) {
            console.log(`parent ${parent.value}`);
        }
        for (const parent of this.parents) {
            parent.parentPrettyPrint();
        }
    }
}

function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {
    // Make a graph connection numerator to answer and answer to denominator
    let nodeMap:Map<string, DoublyLinkedList> = new Map();

    for (let i = 0; i < equations.length; i++) {
        const currEquation = equations[i];
        const currValue = values[i];
        let firstVar:string = currEquation[0];
        let secondVar:string = currEquation[1];

        if (!nodeMap.has(firstVar))  nodeMap.set(firstVar, new DoublyLinkedList(firstVar));
        if (!nodeMap.has(secondVar))  nodeMap.set(secondVar, new DoublyLinkedList(secondVar));

        let valueNode:DoublyLinkedList = new DoublyLinkedList(currValue);
        valueNode.addParent(nodeMap.get(firstVar)!);
        valueNode.addChild(nodeMap.get(secondVar)!);
    }

    let result:number[] = []
    for (let i = 0; i < queries.length; i++) {
        const currQuery = queries[i];
        if (!nodeMap.has(currQuery[0]) || !nodeMap.has(currQuery[1]))  {
            result.push(-1.0);  
            continue;
        }

        let root:DoublyLinkedList = nodeMap.get(currQuery[0])!;
        let storedValues:number | null = null;
        let toChildren:boolean = true;
        while (true) {
            let visitedNodes:Set<DoublyLinkedList> = new Set();
            storedValues = depthFirstSearch(root, currQuery[1], toChildren, visitedNodes);

            if (storedValues !== null)  break

            if (toChildren)  toChildren = false;
            else break;
        }

        if (storedValues === null) {
            result.push(-1.0);
            continue;
        }
        result.push(storedValues);
    }

    return result;
}

function depthFirstSearch(root:DoublyLinkedList, targetVariable:string, toChildren:boolean, visitedNodes:Set<DoublyLinkedList>):number | null {
    visitedNodes.add(root);
    if (root.value === targetVariable)  {
        if (typeof root.value === "string")  return 1
        else root.value;
    }

    let children:DoublyLinkedList[] = toChildren ? root.children : root.parents;
    let count = 0;
    while (true) {
        for (let i = 0; i < children.length; i++) {
            let currChild:DoublyLinkedList = children[i];
            if (visitedNodes.has(currChild))  continue;
            visitedNodes.add(currChild);
            let tempNodes:number | null = depthFirstSearch(currChild, targetVariable, toChildren, visitedNodes);
            if (tempNodes !== null)  {
                let pushValue:number = 1;
                if (typeof root.value === "number") {
                    pushValue = root.value;
                    if (children !== root.children)  pushValue = 1 / pushValue;
                }
                return tempNodes * pushValue;
            }
        }

        count++;
        if (count > 1)  break
        children = toChildren ? root.parents : root.children;
    }

    return null
}

function mainCalcEquation():void {
    let equations:string[][];
    let values:number[];
    let queries:string[][];
    let result:number[];
    let correctResult:number[];
    let doQuitIfAssertFail:boolean = true;

    equations = [["a","e"],["b","e"]];
    values = [4.0,3.0];
    queries = [["a","b"],["e","e"],["x","x"]];
    result = calcEquation(equations, values, queries);
    console.log(`final result ${result}`);
    correctResult = [4 / 3,1.00000,-1.00000];
    myAssert(funcs.listEquality(result, correctResult), doQuitIfAssertFail);

    equations = [["a","b"], ["b", "c"]]
    values = [2.0, 1 / 2];
    queries = [["b","a"]];
    result = calcEquation(equations, values, queries);
    console.log(`final result ${result}`);
    correctResult = [ 1 / 2];
    myAssert(funcs.listEquality(result, correctResult), doQuitIfAssertFail);

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

Depth first search, while storing path and depth:
    Return depth
        -1 if target not found
    Push all nodes to a stack
    If depth > -1, can get values from the stack
*/

/*
Completion time (minutes):
Question difficulty:
How did it go (1 - 6):
*/