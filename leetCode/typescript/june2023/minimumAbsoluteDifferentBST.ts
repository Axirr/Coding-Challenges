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


function getMinimumDifference(root: TreeNode | null): number {
    if (root === null)  return 0;

    let sortedList:number[] = [];
    let frontier:TreeNode[] = [root!];
    while (frontier.length > 0) {
        let currentNode:TreeNode = frontier.pop()!;
        sortedList.push(currentNode.val);
        if (currentNode.left)  frontier.push(currentNode.left);
        if (currentNode.right)  frontier.push(currentNode.right);
    }
    sortedList.sort((a, b) => {
        if (a > b)  return 1;
        if (a < b)  return -1;
        return 0;
    })

    let minDiff = sortedList[1] - sortedList[0];
    for (let i = 1; i < sortedList.length - 1; i++) {
        minDiff = Math.min(minDiff, sortedList[i + 1] - sortedList[i])
    }

    return minDiff;
};

function mainGetMinDiff():void {
    let root:TreeNode;
    let result:number;

    root = new TreeNode(5, new TreeNode(0));
    result = getMinimumDifference(root);
    console.log(`final result ${result}`);
}

mainGetMinDiff();

/*
Data range/assumptions:
*/

/*
Tests:
*/

/*
Ideas:

Naive:
*/

/*
Completion time (minutes):
Question difficulty:
How did it go (1 - 6):
*/