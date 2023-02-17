function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

var minDiffInBST = function(root) {
    let valueArray = helperRecurive(root);

    minDist = valueArray[1] - valueArray[0];
    for (let i = 0; i < valueArray.length - 1; i++) {
        minDist = Math.min(minDist, valueArray[i + 1] - valueArray[i])
        if (minDist === 0)  return 0;
    }
    return minDist
};

function helperRecurive(root) {
    let resultArray = []
    if (root.left !== null)  resultArray = resultArray.concat(helperRecurive(root.left))
    resultArray.push(root.val)
    if (root.right !== null)  resultArray = resultArray.concat(helperRecurive(root.right))

    return resultArray;
}

function mainMinDiffInBST() {
    let root;
    let minDist;

    root = new TreeNode(5)
    root.left = new TreeNode(2)
    minDist = minDiffInBST(root)
    console.log(minDist)
    console.assert(minDist === 3)

    root = new TreeNode(3)
    newLeft = new TreeNode(-10)
    root.left = newLeft
    newLeft.right = new TreeNode(0)
    minDist = minDiffInBST(root)
    console.log(minDist)
    console.assert(minDist === 3)

    root = new TreeNode(5)
    newLeft = new TreeNode(2)
    root.left = newLeft
    newLeft.right = new TreeNode(4)
    minDist = minDiffInBST(root)
    console.log(minDist)
    console.assert(minDist === 1)
}

mainMinDiffInBST()

/*
Data range/assumptions:
nodes n: [2, 100]
values: [0, 10^5]
*/

/*
Tests:
n = 2
n = 100
large difference
small difference
min nodes are far appart
*/

/*
Ideas:

Naive:
    put all values in an array
    sort
    traverse record mins
    Time complexity: n + nlogn + n

Inorder traversal, non-recursive:
    DFS, not BFS
*/

/*
Did go well? partially
If not, why?
    Initial good but slow
        Because of not realizing it was a BST instead of a tree, so needing a sort
    Improvement was a bit slow
        Because trying to do iterative instead of recursive
        So much simpler
        Premature optimization
*/