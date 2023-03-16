import TreeNode from "./sumRootLeafNumbers";

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
    if (postorder.length === 0)  return null;
    let resultTree:TreeNode = new TreeNode(postorder[postorder.length - 1]);
    if (postorder.length === 1)  return resultTree;

    let parentNodeVal:number = postorder[postorder.length - 1];
    let parentIndex:number = inorder.indexOf(parentNodeVal);

    let inorderLeft:number[] = inorder.slice(0, parentIndex);
    let inorderRight:number[] = inorder.slice(parentIndex + 1, inorder.length);

    let postorderLeft:number[] = postorder.slice(0, inorderLeft.length);
    // Have to exclude last element since it's the parent
    let postorderRight:number[] = postorder.slice(inorderLeft.length, postorder.length - 1);

    let leftTreeNode:TreeNode | null = buildTree(inorderLeft, postorderLeft);
    let rightTreeNode:TreeNode | null = buildTree(inorderRight, postorderRight);

    resultTree.left = leftTreeNode;
    resultTree.right = rightTreeNode;

    return resultTree;
};

function mainBuildTree():void {
    let inorder:number[];
    let postorder:number[];
    let constructedTree:TreeNode | null;

    inorder = [9,3,15,20,7];
    postorder = [9,15,7,20,3];
    constructedTree = buildTree(inorder, postorder);
    constructedTree!.prettyPrint();

    inorder = [-1];
    postorder = [-1];
    constructedTree = buildTree(inorder, postorder);
    constructedTree!.prettyPrint();
}

mainBuildTree();

/*
Data range/assumptions:
nodes n: [1, 3000]
values: [-3000, 3000]
unique values
*/

/*
Tests:
n = 1
n = 3000
large and small values
*/

/*
Ideas:

Why do we need both?
A tree can be constructed with either surely?
    Part of the issues is the missing "null" nodes
    Trees are only as deep as they need to be
    So a tree might be [9] when it should be [9, null, null] if in full format
    So need the other tree to determine this

Inorder format:
    [left tree] [this.val] [right tree]

Postorder format:
    [left tree] [right tree] [this.val]

Naive:
    Pop from back of post order
    This is parent
    Split inorder around this value to get it's children
    Then pop from the front of other to get left node (maybe)
    Find that in postorder to determine if it is a direct child
        How?
            In post-order it should be at the back of it's tree if it is a parent
*/

/*
Completion time (minutes): 38
    But spent a lot of time on other stuff like the tree pretty print
How did it go (0 - 6): 5
Describe:
    Took a bit to figure it out but then first recursive solution worked well
*/