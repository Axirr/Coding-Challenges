'use strict'

let myNull = "a"

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
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

class NodeWithParent {
    parent;
    val;
    left;
    right;
    isLeftChild;

    constructor(val, parentNode, isLeftChild, left = null, right = null) {
        this.val = val;
        this.parent = parentNode;
        this.left = left;
        this.right = right;
        this.isLeftChild = isLeftChild;
    }

    prettyPrint() {
        if (this.left !== null) {
            this.left.prettyPrint();
        }
        let parentVal = this.parent === null ? "null" : this.parent.val;
        console.log(`Value ${this.val} Parent ${parentVal}`)
        if (this.right !== null) {
            this.right.prettyPrint();
        }
    }
}

var findDuplicateSubtrees = function(root) {
    let parentNodeTree = createParentNodeTreeFromRoot(root, null);
    parentNodeTree.prettyPrint();

    let leafNodes = leafNodesForParentTree(parentNodeTree, true);
    console.log("may want to delete")
    leafNodes.forEach((node) => node.isLeft = true);
    let frontier = new Map();
    let newFrontier = new Map();
    let resultNodes = [];
    for (let node of leafNodes) {
        let keyForNode = node.isLeft ? node.val * -1 : node.val;
        if (frontier.has(keyForNode))  {
            frontier.get(keyForNode).push(node);
        }
        else frontier.set(keyForNode, [node])
    }

    while (frontier.size > 0) {
        for (let [currentKey, value] of frontier.entries()) {
            if (value.length > 1) {
                resultNodes.push(value[0])
                for (let node of value) {
                    let newNode = node.parent;
                    if (newNode === null) continue;
                    if (newNode.parent !== null) {
                        let keyForNode = node.isLeft ? node.val * -1 : node.val;
                        if (newFrontier.has(keyForNode)) {
                            newFrontier.get(keyForNode).push(newNode)
                        } else {newFrontier.set(keyForNode, [newNode])}
                    }
                }
            } 
        }
        frontier = newFrontier;
        newFrontier = new Map();
    }
    
    return resultNodes;

}

function leafNodesForParentTree(root) {
    if (root === null)  return [];

    let resultNodes = leafNodesForParentTree(root.left)
    resultNodes = resultNodes.concat(leafNodesForParentTree(root.right))
    if (root.left === null & root.right === null)  resultNodes.push(root)

    return resultNodes;
}

function createParentNodeTreeFromRoot(root, parent, isLeftChild) {
    if (root === null)  return null;

    let myParentNode = new NodeWithParent(root.val, parent, isLeftChild)
    myParentNode.left = createParentNodeTreeFromRoot(root.left, myParentNode, true);
    myParentNode.right = createParentNodeTreeFromRoot(root.right, myParentNode, false);

    return myParentNode;
}

/**
 * @param {TreeNode} root
 * @return {TreeNode[]}
 */
var slowFindDuplicateSubtrees = function(root) {
    let pathMap = new Map();
    let nodes = returnAllNodes(root, 0);
    let resultNodes = []

    for (const node of nodes) {
        if (node === myNull)  continue;
        let hashString = genStringForNode(node);
        if (pathMap.has(hashString)) {
            if (!pathMap.get(hashString)) {
                pathMap.set(hashString, true)
                resultNodes.push(node);
            }
        } else {
            pathMap.set(hashString, false)
        }
    }

    return resultNodes;
}

function genStringForNode(node) {
    let myArray = returnAllNodes(node, 0);
    let stringArray = []
    for (let i = 0; i < myArray.length; i++) {
        const element = myArray[i];
        if (element !== myNull) {
            stringArray.push(element.val)
        } else stringArray.push(element)
    }
    let myString = stringArray.toString();
    return myString;
}

function returnAllNodes(root, level) {
    if (root === null) {
        return [myNull]
    }

    let nodes = [root]
    if (root.left !== null || root.right !== null) {
        nodes = nodes.concat(returnAllNodes(root.left, level + 1))
        nodes = nodes.concat(returnAllNodes(root.right, level + 1))
    }

    return nodes;
}

function mainFindDuplicateSubTrees() {
    let tree;
    let duplicateArray;

    // tempTree = new TreeNode(0, new TreeNode(0), new TreeNode(0))
    // tempTree = new TreeNode(0, tempTree, null)
    // secondTemp = new TreeNode(0, new TreeNode(0), new TreeNode(0))
    // secondTemp = new TreeNode(0, secondTemp, null)
    // tree = new TreeNode(0, tempTree, secondTemp)
    // duplicateArray = findDuplicateSubtrees(tree)
    // console.log(`Length ${duplicateArray.length} should be 2`)
    // console.assert(duplicateArray.length === 2)
    // return;

    tree = new TreeNode(2, new TreeNode(1), new TreeNode(1));
    duplicateArray = findDuplicateSubtrees(tree);
    console.log(duplicateArray);
    console.assert(duplicateArray.length === 1)
    console.log()
    return;

    tempTree = new TreeNode(2, new TreeNode(4), null);
    secondTemp = new TreeNode(3, tempTree, new TreeNode(4));
    leftTree = new TreeNode(2, new TreeNode(4), null);
    tree = new TreeNode(1, leftTree, secondTemp);
    duplicateArray = findDuplicateSubtrees(tree);
    console.log(duplicateArray);
    console.assert(duplicateArray.length === 2)
    return;

}


mainFindDuplicateSubTrees();

/*
Data range/assumptions:
number of nodes n: [1, 5000]
values: [-200, 200]
*/

/*
n = 1
n = 5000
no duplicates
multiple duplicates
duplicates far apart in tree
Duplicates starting at different heights
*/

/*
Ideas:

Naive:
    Collect all subtrees
    Organize by node count
    Compare within node count groups

Aren't the subtrees of duplicate subtrees also duplicates?
    Bubble up from leaves until match can no longer be found and that's the duplicate?

Need to push subtrees, and also trees with the new root

Current version slow and wrong

Simpler naive:
    Collect list of every node
    Compare each node to others

What about duplicates in value but not starting point?
    Simple but inefficient: compare against all others when adding

Naive probably working but is too slow
Speed up: cache hash value for each solution and potential new value
    Then at least only traverse each once at full cost
    Convert array version into string?
    Check if string is in Map?
    Problem: how to generate unqiue hash value?
        String works that way, but they're none constant to check equality
            Also need to include nulls
This is a better way to compare nodes in general:
    Calculate hash for node
    Map: hashString: isInSolution(false)
    if find again
        add to solution
        set isInSolution = true

Still slow though
Better:
    Double linked nodes, to allow traversal up from leaf?
    Since every recursive subtree must come from a recursive subtree
    Pseudocode:
        Give all nodes (except root) reference to parent
        Collect all leaf nodes (no left or right)
        Compare each leaf node to others
        Add one match to solutions
        Add all matches to future frontier
        If frontier is empty return
        Else, keep doing that
And should only need to compare the next value if we group them into sets
*/

/*
Did it go well? No, disastrous
If not, why
    Not really sure
    Solution was awkward and wrong
    Awkward:
        Return arrays rather than dealing with trees
    Wrong:
        Was creating trees for all children, rathern than just the last batch of children
    And my naive solution wasn't naive enough
        Struggled to make naive solution, which should never be the case
*/