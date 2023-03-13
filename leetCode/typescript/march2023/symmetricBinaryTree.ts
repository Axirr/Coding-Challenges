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


function isSymmetric(root: TreeNode | null): boolean {
    if (root === null)  return true;

    let leftStack:Array<TreeNode | null>= [root.left];
    let rightStack:Array<TreeNode | null>= [root.right];

    while (leftStack.length > 0 && rightStack.length > 0) {
        let leftCurrent: TreeNode | null = leftStack.pop()!;
        let rightCurrent: TreeNode | null = rightStack.pop()!;

        if (leftCurrent === null && rightCurrent === null)  continue;
        if (leftCurrent === null || rightCurrent === null)  return false;

        if (leftCurrent.val !== rightCurrent.val)  return false;

        leftStack.push(leftCurrent.right);
        leftStack.push(leftCurrent.left);

        rightStack.push(rightCurrent.left);
        rightStack.push(rightCurrent.right);
    }

    return true;
};

function mainIsSymmetric(): void {
    let root:TreeNode | null;
    let resultSymmetric:boolean;

    root = new TreeNode(5, new TreeNode(6), new TreeNode(6));
    resultSymmetric = isSymmetric(root);
    console.log(resultSymmetric);
    console.assert(resultSymmetric);

    root = new TreeNode(5, new TreeNode(7), new TreeNode(6));
    resultSymmetric = isSymmetric(root);
    console.log(resultSymmetric);
    console.assert(!resultSymmetric);

    root = new TreeNode(-10)
    resultSymmetric = isSymmetric(root);
    console.log(resultSymmetric);
    console.assert(resultSymmetric);
}

mainIsSymmetric();

/*
Data range/assumptions:
num nodes n: [1, 1000]
values: [-100, 100]
*/

/*
Tests:
n = 1
n = 1000
symmetric
nonsymmetric
*/

/*
Ideas:

Naive:
    Traverse at same time in same order
    Asserting value equality at each step
*/

/*
Completion time (minutes):
Did it go well?
Describe why:
*/