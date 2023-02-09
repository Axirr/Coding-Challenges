function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}


var postorderTraversal = function(root) {
    let resultArray = []
    if (root === null) { return resultArray; }
    if (root.left !== null) {
        resultArray = resultArray.concat(postorderTraversal(root.left))
    }
    if (root.right !== null) {
        resultArray = resultArray.concat(postorderTraversal(root.right))
    }
    resultArray.push(root.val)
    return resultArray;
};

function myMain() {
    let treeNode = new TreeNode(1, null, null)
    let bottomLeft = new TreeNode(3, null, null)
    treeNode.right = new TreeNode(2, bottomLeft, null)
    let resultArray = postorderTraversal(treeNode);
    console.log(resultArray)
}

myMain();