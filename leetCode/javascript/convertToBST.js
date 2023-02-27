class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }

    prettyPrint() {
        if (this.left !== null) {
            this.left.prettyPrint();
        }
        console.log(this.val)
        if (this.right !== null) {
            this.right.prettyPrint();
        }
    }
}

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
    return helper(nums, 0, nums.length - 1);
};

function helper(nums, startIndex, endIndex) {
    // console.log(`start index ${startIndex}`);
    // console.log(`end index ${endIndex}`);
    let middleIndex = Math.ceil((startIndex + endIndex) / 2);
    let newNode = new TreeNode(nums[middleIndex]);
    let leftEnd = middleIndex - 1;
    if (leftEnd - startIndex >= 0) {
        newNode.left = helper(nums, startIndex, leftEnd);
    }
    let rightStart = middleIndex + 1;
    if (endIndex - rightStart >= 0) {
        newNode.right = helper(nums, rightStart, endIndex);
    }

    return newNode;
}

function mainSortedArrayToBST() {
    let nums;
    let binaryTree;

    nums = [-10,-3,0,5,9];
    binaryTree = sortedArrayToBST(nums);
    binaryTree.prettyPrint();
}

mainSortedArrayToBST();

/*
*/

/*
*/

/*
Ideas:
Naive:
    Recursive, store middle and call on subArray to left and right if non-empty

What is middle?
    Uneven is simple
        Round up the length
    For even, I guess either could work, so just do the same thing for both
*/

/*
Did it go well?
If not, why?
*/