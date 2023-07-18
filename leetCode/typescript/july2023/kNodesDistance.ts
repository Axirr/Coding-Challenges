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

    // Shortcut when target is guaranteed to be in the tree
    if (k === 0)  return [target.val];

    let parentNodes:Map<number, TreeNode> = new Map();
    let targetValue:number = target.val;
    let startingNode:TreeNode | null = null;
    if (root.val === targetValue)  startingNode = root;

    function breadthFirstSearchNoParent(currentNode:TreeNode, currentHeight:number):void {
        let potentialNodes:Array<TreeNode> = [];
        if (currentNode.left !== null)  potentialNodes.push(currentNode.left);
        if (currentNode.right !== null)  potentialNodes.push(currentNode.right);

        for (const node of potentialNodes) {
            parentNodes.set(node.val, currentNode);
            if (node.val === targetValue)  startingNode = node;
            breadthFirstSearchNoParent(node, currentHeight + 1);
        }
    }

    let visited:Set<number> = new Set();
    let result:number[] = [];
    function breadthFirstSearchWithParent(currentNode:TreeNode, currentHeight:number):void {
        let potentialNodes:Array<TreeNode> = [];
        if (currentHeight === k)  {
            result.push(currentNode.val);
            return;
        }
        let parent:TreeNode | undefined = parentNodes.get(currentNode.val);
        if (parent !== undefined)  potentialNodes.push(parent);
        if (currentNode.left !== null)  potentialNodes.push(currentNode.left);
        if (currentNode.right !== null)  potentialNodes.push(currentNode.right);

        for (const node of potentialNodes) {
            if (!visited.has(node.val)) {
                visited.add(node.val)
                breadthFirstSearchWithParent(node, currentHeight + 1);
            }
        }
    }

    breadthFirstSearchNoParent(root, 0);

    if (startingNode === null)  return []
    visited.add(startingNode.val);
    breadthFirstSearchWithParent(startingNode, 0);

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