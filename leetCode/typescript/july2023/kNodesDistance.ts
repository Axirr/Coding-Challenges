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

class TwoWayNode {
    val: number
    left: TwoWayNode | null
    right: TwoWayNode | null
    parent: TwoWayNode | null
    constructor(val?: number, left?: TwoWayNode | null, right?: TwoWayNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
        this.parent = null;
    }
}


function distanceK(root: TreeNode | null, target: TreeNode | null, k: number): number[] {
    if (root === null || target === null)  return [];
    let parentRoot:TwoWayNode = new TwoWayNode(root.val)
    recursiveTwoWayNodeCreation(parentRoot, root.left, root.right);
    let targetValue:number = target.val;
    // recursivePrint(parentRoot);
    let frontier:TwoWayNode[] = [parentRoot];
    let newFrontier:TwoWayNode[] = [];
    let startingNode:TwoWayNode | null = null;
    let doBreak:boolean = false;
    if (parentRoot.val === targetValue) {
        startingNode = parentRoot;
        doBreak = true;
    }
    while (frontier.length > 0) {
        while (frontier.length > 0) {
            let currentNode:TwoWayNode = frontier.pop()!;
            let potentialNodes:Array<TwoWayNode> = [];
            if (currentNode.left !== null)  potentialNodes.push(currentNode.left);
            if (currentNode.right !== null)  potentialNodes.push(currentNode.right);
            for (const node of potentialNodes) {
                if (node.val === targetValue)  {
                    startingNode = node;
                    doBreak = true;
                    break;
                }
                newFrontier.push(node);
                newFrontier.push(node);
            }
        }

        if (doBreak)  break;

        frontier = newFrontier;
        newFrontier = [];
    }

    if (startingNode === null)  return [];
    if (k === 0)  return [startingNode.val];
    frontier = [startingNode];
    newFrontier = [];
    let distance:number = 0;
    let visited:Set<number> = new Set();
    visited.add(startingNode.val);
    while (frontier.length > 0) {
        while (frontier.length > 0) {
            let currentNode:TwoWayNode = frontier.pop()!;
            let potentialNodes:Array<TwoWayNode | null> = [];
            potentialNodes.push(currentNode.parent);
            potentialNodes.push(currentNode.left);
            potentialNodes.push(currentNode.right);
            
            for (const node of potentialNodes) {
                if (node !== null && !visited.has(node.val)) {
                    newFrontier.push(node);
                    visited.add(node.val);
                }
            }
        }

        if (distance === k - 1)  {
            break;
        }

        frontier = newFrontier;
        newFrontier = [];
        distance += 1;
    }

    let result:number[] = [];
    for (const node of newFrontier) {
        result.push(node.val);
    }

    return result;
};

function recursiveTwoWayNodeCreation(parent:TwoWayNode, oldLeftChild:TreeNode | null, oldRightChild:TreeNode | null): void {
    let newLeft:TwoWayNode | null = oldLeftChild === null ? null : new TwoWayNode(oldLeftChild.val);
    if (newLeft !== null)  {
        parent.left = newLeft;
        newLeft.parent = parent;
        recursiveTwoWayNodeCreation(newLeft, oldLeftChild!.left, oldLeftChild!.right);
    }
    let newRight:TwoWayNode | null = oldRightChild === null ? null : new TwoWayNode(oldRightChild.val);
    if (newRight !== null)  {
        parent.right = newRight;
        newRight.parent = parent;
        recursiveTwoWayNodeCreation(newRight, oldRightChild!.left, oldRightChild!.right);
    }
}

function recursivePrint(node:TwoWayNode):void {
    if (node.left !== null)  recursivePrint(node.left);
    console.log(node.val);
    if (node.right !== null)  recursivePrint(node.right);
}

function mainDistanceK():void {
    let root:TreeNode | null;
    let target:TreeNode | null;
    let k:number;
    let result:number[];
    let doQuitIfAssertFails:boolean = true;

    root = new TreeNode(5, new TreeNode(2, new TreeNode(1), new TreeNode(3)), new TreeNode(7, new TreeNode(6), new TreeNode(8)));
    target = new TreeNode(1);
    k = 2;
    result = distanceK(root, target, k);
    console.log(`final result ${result}`);
    myAssert(result.length === 2, doQuitIfAssertFails);
}

mainDistanceK();

/*
Data range/assumptions:
all node values unique
n number of nodes [1, 500]
target is in tree
k: [0, 1000]
distance can go up and down the tree
*/

/*
Tests:
n = 1, target = root
upward traversal necessary
non unidirectional traversal necessary (e.g. up and then down)
*/

/*
Ideas:

Naive:
    Convert into an undirected graph
    Find target using BFS or DFS
    BFS from target until height equalled
    Return length of frontier at that height
*/

/*
Completion time (minutes):
Question difficulty:
How did it go (1 - 6):
*/