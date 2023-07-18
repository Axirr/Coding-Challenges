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

function distanceK(root: TreeNode | null, target: TreeNode | null, k: number): number[] {
    if (root === null || target === null)  return [];
    if (k === 0)  return [target.val];

    let parentNodes:Map<number, TreeNode> = new Map();
    let targetValue:number = target.val;
    let frontier:TreeNode[] = [root];
    let newFrontier:TreeNode[] = [];
    let startingNode:TreeNode | null = null;
    if (root.val === targetValue) {
        startingNode = root;
    }

    while (frontier.length > 0) {
        while (frontier.length > 0) {
            let currentNode:TreeNode = frontier.pop()!;
            let potentialNodes:Array<TreeNode> = [];
            if (currentNode.left !== null)  potentialNodes.push(currentNode.left);
            if (currentNode.right !== null)  potentialNodes.push(currentNode.right);
            for (const node of potentialNodes) {
                parentNodes.set(node.val, currentNode);
                if (node.val === targetValue)  startingNode = node;
                newFrontier.push(node);
                newFrontier.push(node);
            }
        }

        frontier = newFrontier;
        newFrontier = [];
    }

    if (startingNode === null)  return [];

    frontier = [startingNode];
    newFrontier = [];
    let distance:number = 0;
    let visited:Set<number> = new Set();
    visited.add(startingNode.val);
    while (frontier.length > 0) {
        while (frontier.length > 0) {
            let currentNode:TreeNode = frontier.pop()!;
            let potentialNodes:Array<TreeNode | null> = [];
            let parent:TreeNode | undefined = parentNodes.get(currentNode.val);
            if (parent !== undefined)  potentialNodes.push(parent);
            if (currentNode.left !== null)  potentialNodes.push(currentNode.left);
            if (currentNode.right !== null)  potentialNodes.push(currentNode.right);
            
            for (const node of potentialNodes) {
                if (!visited.has(node!.val)) {
                    newFrontier.push(node!);
                    visited.add(node!.val);
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