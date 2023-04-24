import myAssert from "../march2023/Trie"

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

function longestZigZag(root: TreeNode | null): number {
    if (root === null) return 0;

    let stack:TreeNode[] = [root];

    let memo:Map<string,number> = new Map();

    let resultMax:number = 0;
    while (stack.length > 0) {
        let currentNode:TreeNode = stack.pop()!;

        // Add children to stack as starting point
        if (currentNode.right !== null) stack.push(currentNode.right);
        if (currentNode.left !== null) stack.push(currentNode.left);

        resultMax = Math.max(recursiveZigZag(currentNode, true, memo))
        resultMax = Math.max(recursiveZigZag(currentNode, false, memo))
    }

    return resultMax;
};

function recursiveZigZag(currentNode: TreeNode, lastWasLeft:boolean, memo:Map<string,number>): number {
    let selfArgString:string = [currentNode, lastWasLeft].toString();
    if (memo.has(selfArgString))  return memo.get(selfArgString)!

    if (currentNode.right === null && currentNode.left === null)  return 0;

    let nodes:Array<TreeNode | null> = [currentNode.left, currentNode.right];
    let directions:boolean[] = [true, false];

    let maxCount:number = 0;

    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i] === null) continue;

        let interiorNode:TreeNode = nodes[i]!;
        let currentDirection:boolean = directions[i];

        let currentArgString:string = [interiorNode, currentDirection].toString();
        let childResult:number = 0;
        if (memo.has(currentArgString)) {
            childResult = memo.get(currentArgString)!;
        } else {
            childResult = recursiveZigZag(interiorNode, currentDirection, memo)
        }
        if (currentDirection !== lastWasLeft)  childResult++;

        maxCount = Math.max(maxCount, childResult);
    }

    memo.set(selfArgString, maxCount);
    return maxCount;
}

function mainLongestZigZag():void {
    let root:TreeNode | null;
    let result:number;
    let doQuitIfAssertFails:boolean = true;

    root = new TreeNode(1, new TreeNode(1, null, new TreeNode(1)));
    result = longestZigZag(root);
    console.log(`Final result is ${result}`);
    myAssert(result === 2, doQuitIfAssertFails);
}

mainLongestZigZag();

/*
Data range/assumptions:
nodes n: [1, 5 * 10^4]
Values: [1, 100]
*/

/*
Tests:
n = 1
n = max
large n but small zig zag
small n but large zig zag
zig zag until the last node breaks it
*/

/*
Ideas:

Naive:
    DFS, but with zig zag condition?
    Recursive, include current path length and last direction (left/right)

Spinning my wheels
For each node, calculate and store results for both lastWasLeft and !lastWasLeft
Then add one to the result that is the valid direction from current
And return max
But can we just propogate it up unconditonally like this?
No, we lose the restriction at each level because we take the max of both I think
E.g. max of 10 or 7
    10 better, but what if 7 was allowed to be added to current length >= 4, then it would be suboptimal
We can precalculate for [Node, direction]
But we still need the recursion to determine which of these results we can use

Maybe the issue was the intermingling of the recursion with the "start from each node"
    Keep that last part at the top level only
*/

/*
Completion time (minutes):
Question difficulty:
How did it go (0 - 6):
*/