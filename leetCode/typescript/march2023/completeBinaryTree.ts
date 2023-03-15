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

function isCompleteTree(root: TreeNode | null): boolean {
    if (root === null)  return true;

    let stack:Array<any> = [[root, 0]];
    let currentNode: TreeNode | null = root;

    let maxHeight:number = 0;

    while (currentNode !== null) {
        maxHeight += 1;
        currentNode = currentNode.left;
    }

    maxHeight -= 1;

    let maxHeightCompleteAllowed:boolean = true;
    let currentHeight:number;

    while (stack.length > 0) {
        let currentDuo = stack.pop();
        // console.log(`stackLength ${stack.length}`)
        currentNode = currentDuo[0];
        // console.log(`current node value ${currentNode === null ? "null" : currentNode.val}`)
        currentHeight = currentDuo[1];
        if (currentHeight > maxHeight)  return false;

        // console.log(`maxHeight ${maxHeight}`)
        // console.log(`currentHeight ${currentHeight}`)
        if (currentNode === null) {
            // console.log('null node')
            if (currentHeight === maxHeight) {
                maxHeightCompleteAllowed = false;
            } else  return false
        } else if (isLeaf(currentNode)) {
                if (!(currentHeight === maxHeight || currentHeight === (maxHeight - 1)))  return false;
                if (currentHeight === maxHeight && !maxHeightCompleteAllowed)  return false;
            // if (!maxHeightCompleteAllowed && currentHeight < maxHeight) {
            if (currentHeight < maxHeight) {
                stack.push([currentNode!.right, currentHeight + 1])
                stack.push([currentNode!.left, currentHeight + 1])
            }
        } else {
            stack.push([currentNode!.right, currentHeight + 1])
            stack.push([currentNode!.left, currentHeight + 1])
        }
    }

    return true;
}

function isLeaf(node:TreeNode | null):boolean {
    if (node === null)  return false;
    if (node.left === null && node.right === null)  return true;
    return false;
}


// function oldIsCompleteTree(root: TreeNode | null): boolean {
//     if (root === null)  return true;
//     if (root.left === null && root.right === null)  return true;
//     if (root.left === null && root.right !== null)  return false;

//     // if (isLeafParent(root)) {
//     //     if (isCompleteLeafParent(root)) return true;
//     //     let isLeftLeaf:boolean = isLeaf(root.left)
//     //     let isRightLeaf:boolean = isLeaf(root.left)
//     //     if (isLeftLeaf && isRightLeaf)  return true;
//     //     if (!isRightLeaf)  return false;
//     //     if (root.left!.right === null || root.left!.left !== null) return true;
//     //     // if (!isLeftLeaf && isRightLeaf)
//     //     // if (isLeftLeaf && !isRightLeaf) return false;
//     //     return false;
//     // }

//     let maxHeight:number = 0;
//     let currentNode: TreeNode | null = root;

//     while (currentNode !== null) {
//         maxHeight += 1;
//         currentNode = currentNode.left;
//     }

//     maxHeight -= 1;
//     // if (maxHeight <= 0)  return false;

//     return recursiveDFScomplete(root, 0, maxHeight, [null]);
// };

// function recursiveDFScomplete(root: TreeNode | null, currentDepth:number, maxHeight:number, firstComplete:Array<boolean | null>):boolean {
//     let isComplete:boolean = false;
//     console.log(`currentHeight ${currentDepth} maxHeight ${maxHeight}`)

//     if (root === null) isComplete = true;
//     else {
//         if (isLeafParent(root!)) {
//             if (firstComplete[0] !== null) {
//                 // console.log(`current depth for checking complete left parent one higher is ${currentDepth}`)
//                 isComplete = (currentDepth === maxHeight - 2) && isCompleteLeafParent(root)
//             } else {
//                 if (currentDepth !== (maxHeight - 1))  isComplete = false;
//                 else {
//                     let completeLeafParent = isCompleteLeafParent(root);
//                     if (completeLeafParent)  isComplete = true;
//                     else {
//                         firstComplete[0] = false;
//                         if (root.left === null && root.right !== null)  isComplete = false;
//                         else {
//                             isComplete = true;
//                         }
//                     }
//                 }
//             }
//         } else {
//             let leftValid:boolean = recursiveDFScomplete(root.left, currentDepth + 1, maxHeight, firstComplete);
//             let rightValid:boolean = recursiveDFScomplete(root.right, currentDepth + 1, maxHeight, firstComplete);

//             isComplete = leftValid && rightValid;
//         }
//     }

//     // console.log(`isComplete for node with value ${root!.val} is ${isComplete}`)
//     return isComplete;
// }

// function isLeafParent(node: TreeNode):boolean {
//     if (node.left !== null) {
//         if (node.left.left === null && node.left.right === null)  return true;
//     }
//     if (node.right !== null) {
//         if (node.right.left === null && node.right.right === null) return true;
//     }
//     return false;
// }

// function isCompleteLeafParent(node: TreeNode):boolean {
//     if (node.left === null && node.right === null)  return false;
//     if (node.left === null || node.right === null)  return false;

//     if (node.left.left === null && node.left.right === null && node.right.left === null && node.right.right === null) return true;

//     return false;
// }

function mainIsCompleteTree():void {
    let root:TreeNode | null;
    let complete:boolean;

    root = new TreeNode(5, null, new TreeNode(3))
    complete = isCompleteTree(root);
    console.log()
    console.log(`Complete is ${complete} should be 'false'`)

    root = new TreeNode(5, new TreeNode(3))
    complete = isCompleteTree(root);
    console.log()
    console.log(`Complete is ${complete} should be 'true'`)

    root = new TreeNode(5, new TreeNode(1, new TreeNode(2), new TreeNode(3)), new TreeNode(7))
    complete = isCompleteTree(root);
    console.log()
    console.log(`Complete is ${complete} should be 'true'`)

    root = new TreeNode(1, new TreeNode(2, new TreeNode(5)), new TreeNode(3, new TreeNode(7)))
    complete = isCompleteTree(root);
    console.log()
    console.log(`Complete is ${complete} should be 'false'`)

    root = new TreeNode(1, new TreeNode(2, new TreeNode(5)), new TreeNode(3, new TreeNode(7), new TreeNode(8)))
    complete = isCompleteTree(root);
    console.log()
    console.log(`Complete is ${complete} should be 'false'`)

    root = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3, null, new TreeNode(7)))
    complete = isCompleteTree(root);
    console.log()
    console.log(`Complete is ${complete} should be 'false'`)

    root = new TreeNode(5)
    complete = isCompleteTree(root);
    console.log()
    console.log(`Complete is ${complete} should be 'true'`)

    root = new TreeNode(5, new TreeNode(3), new TreeNode(7));
    complete = isCompleteTree(root);
    console.log()
    console.log(`Complete is ${complete} should be 'true'`)

    root = new TreeNode(5, new TreeNode(1, new TreeNode(2), new TreeNode(3)), new TreeNode(7, new TreeNode(2), new TreeNode(3)))
    complete = isCompleteTree(root);
    console.log()
    console.log(`Complete is ${complete} should be 'true'`)

}

mainIsCompleteTree();

/*
Data range/assumptions:
number of nodes n: [1, 100]
values: [1, 1000]
*/

/*
Tests:
n = 1
n = 100
complete
not complete
everything complete but second last
different depth, but "complete"
*/

/*
Ideas:

Naive:
    DFS, returning max depth and if complete
        Complete: leaf nodes have both branches null
    If get one that is not complete, means all further right have to be not fully not complete

Depth of further right ones?
    Can be (must be, sometimes) lower than depth of furthest
    E.g. 1
        2  null
    Right branch has max depth 0
    Left branch has max depth 1

Tried non-recursively, but keeping track of depth is hard
Recursive is awkward on what it returns
    If not leaf parent, return leaf parent below
        I.e. return if subtree is complete
    If leaf parent, return true if both children leaves
    Else false
        Not a failure though
        Just necessitates that all trees must be complete but one level higher going forward
        Furthest left determines this height
            Could just do that traversal once

Flailing around a bit
    Confusing complete parent from half parent
    Idea:
        Look for either complete or half parent until first one found
        Then, look for either half parent (next only) or complete parent one level higher
    Must make the categories exclusive though:
        completeLeafParent = leafParent && isLeaf(left) && isLeaf(right)
        halfLeafParent = leafParent && isLeaf(left) && !isLeaf(right)
leafParent = has at least one leaf child
If leaf parent and not deepest or one higher, auto fail

firstComplete sequencing:
    null until first nonComplete parent found
    then only complete will do
        Don't need the intermediate step, because the first failure step is the only chance to have a halfComplete
            And it doesn't matter if it's half complete or full complete

Feel like maybe I could make a working solution now, starting from scratch
Iterative DFS, storing (node, depth)
Two previousFlags
    bottomLevelFlags
    oneUpLevelFlags
Flags indicate if previous one (on that level) was complete or not
    Anything with leaf nodes on maxHeight - 1 must be complete
    For maxHeight level, need a leaf node until hit first null, and then need all the rest to be null
Anything that ends on a higher level, automatic break and fail
    Store the leaf nodes, not the leafParent nodes

Store the second height nodes even if not leaf?
    To ensure all are non-null?

Seems promising, but don't really know that I should spend more time on this problem

How to handle shallow trees?
    If root = maxHeight, true
    If root = maxHeight - 1, then it would be the only one on that level?
        Could be handled normally?

How to deal with what the "leaf node" of a deadend is
    If always recorded as null, then could get an offset issue where the "last level" looks like null, null, ...
        But some of those are on a different height
    Just solved by the height issue
        Value is null, but height is current place

Problem:
    maxHeight might not be the leftmost
        It only is guaranteed for complete trees
    Solution: if greater than maxHeight, return false immediately
*/

/*
Completion time (minutes): 215
Did it go well? disastrous
If not, why?
    A lot of minor adjustments, feeling like the solution was just around the corner
    But it wasn't
    Ended up chasing test cases
    Need a hard rule (on medium problems at least)
        If takes more than an hour, should look up the solution or start over
        Waste of time otherwise
        And solution is clearly flawed
            Maybe it works, but it has an inelegant structure
            Needs a bunch of hardcoded paths rather than being general
    Tried again in the afternoon with a better idea
        Still needed a fair amount of debugging but got most of the solution right pretty quickly
*/