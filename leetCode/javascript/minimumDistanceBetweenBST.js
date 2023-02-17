function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

var minDiffInBST = function(root) {
    let valueArray = []
    let setValues = new Set()
    let frontier = [root]
    let nextFrontier = []

    while (frontier.length > 0) {
        while (frontier.length > 0) {
            let currentNode = frontier.pop()
            if (currentNode.val in setValues) { return 0; }
            setValues.add(currentNode.val)
            valueArray.push(currentNode.val)

            if (currentNode.left !== null)  nextFrontier.push(currentNode.left);
            if (currentNode.right !== null)  nextFrontier.push(currentNode.right);
        }

        frontier = nextFrontier
        nextFrontier = []
    }

    valueArray.sort((a, b) => a - b)
    console.log(valueArray)
    minDist = valueArray[1] - valueArray[0]
    for (let index = 0; index < valueArray.length - 1; index++) {
        minDist = Math.min(minDist, valueArray[index + 1] - valueArray[index]);
    }

    return minDist;
};

function mainMinDiffInBST() {
    let root;
    let minDist;

    root = new TreeNode(5)
    root.left = new TreeNode(2)
    minDist = minDiffInBST(root)
    console.log(minDist)
    console.assert(minDist === 3)

    root = new TreeNode(5)
    newLeft = new TreeNode(2)
    root.left = newLeft
    newLeft.right = new TreeNode(5)
    minDist = minDiffInBST(root)
    console.log(minDist)
    console.assert(minDist === 0)

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
*/

/*
Did go well?
If not, why?
*/