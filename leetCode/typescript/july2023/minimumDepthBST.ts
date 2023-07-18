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


function minDepth(root: TreeNode | null): number {
    if (root === null)  return 0;
    // if (root.left === null && root.right === null)  return 1;

    let height:number = 1;
    let frontier:TreeNode[] = [root];
    let newFrontier:TreeNode[] = [];
    while (frontier.length > 0) {
        while (frontier.length > 0) {
            let currentNode:TreeNode = frontier.pop()!;
            if (currentNode.left === null && currentNode.right === null)  return height;
            if (currentNode.left !== null)  newFrontier.push(currentNode.left);
            if (currentNode.right !== null)  newFrontier.push(currentNode.right);
        }

        frontier = newFrontier;
        newFrontier = [];
        height += 1;
    }

    return height;
};

function mainMinDepth():void {
    let root:TreeNode;
    let result:number;
    let doQuitIfAssertFails:boolean = true;

    
    root = new TreeNode(3, new TreeNode(4));
    result = minDepth(root);
    console.log(`final result ${result}`);
    myAssert(result === 2, doQuitIfAssertFails);

    root = new TreeNode(3, new TreeNode(4), new TreeNode(7));
    result = minDepth(root);
    console.log(`final result ${result}`);
    myAssert(result === 2, doQuitIfAssertFails);
}

mainMinDepth();

/*
Data range/assumptions:
*/

/*
Tests:
*/

/*
Ideas:

Naive:
    Breadth first search
    When first leaf node found, return height
*/

/*
Completion time (minutes):
Question difficulty:
How did it go (1 - 6):
*/