myNull = "a"

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

class ArrayAndRoot {
    myArray;
    currentRoot;

    constructor(myArray, currentRoot) {
        this.myArray = myArray;
        this.currentRoot = currentRoot;
    }
}

/**
 * @param {TreeNode} root
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function(root) {
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
    // let nodeList = returnAllNodes(root)
    // let usedIndex = new Set();
    // let dictionaryForSolutions = new Map();
    // let resultNodes = [];
    
    // for (let i = 0; i < nodeList.length; i++) {
    //     if (usedIndex.has(i))  continue;
    //     const currentNode = nodeList[i];
    //     for (let j = i + 1; j < nodeList.length; j++) {
    //         if (usedIndex.has(j))  continue;
    //         const testNode = nodeList[j];
    //         if (binaryTreeEquality(currentNode, testNode)) {
    //             let testString = genStringForNode(testNode);
    //             if (!dictionaryForSolutions.has(testString)) {
    //                 usedIndex.add(j)
    //                 dictionaryForSolutions.set(testString, null);
    //                 resultNodes.push(testNode)
    //                 break;
    //             }
    //         }
    //     }
    // }

    // return resultNodes;
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
        // i = 0;
        // let result = []
        // let maxNum = Math.pow(level - 1, 2)
        // console.log(`maxNum ${maxNum}`)
        // while (i < maxNum) {
        //     result.push(null)
        //     i += 1;
        // }
        // console.log(`Result ${result}`)
        // return result;
        return [myNull]
    }

    let nodes = [root]
    if (root.left !== null || root.right !== null) {
        nodes = nodes.concat(returnAllNodes(root.left, level + 1))
        nodes = nodes.concat(returnAllNodes(root.right, level + 1))
    }

    return nodes;
}



/**
 * @param {TreeNode} root
 * @return {TreeNode[]}
 */
var complicatedFindDuplicateSubtrees = function(root) {
    let treeArray = generateAllSubTrees(root);
    treeArray = treeArray[0].concat(treeArray[1])
    treeArray.filter((x) => x === undefined);
    // treeArray.forEach((element) => {
    //     console.log(element.myArray);
    // })
    let i = treeArray.length - 1;
    let usedIndex = new Set();
    let resultArrays = [];

    while (i >= 0) {
        const firstTree = treeArray[i].myArray;
        let j = 0;
        if (!usedIndex.has(i)) {
            while (j < i) {
                if (!usedIndex.has(j)) {
                    // if (arrayEquality(firstTree, treeArray[j].myArray)) {
                    if (treeArray[i].currentRoot !== treeArray[j].currentRoot && binaryTreeEquality(treeArray[i].currentRoot, treeArray[j].currentRoot)) {
                        // console.log(`Match for index ${i} and ${j}`)
                        // console.log(treeArray[i])
                        // console.log(treeArray[j])
                        usedIndex.add(j)
                        usedIndex.add(i)
                        resultArrays.push(treeArray[j].currentRoot)
                        break;
                        // resultArrays.push(treeArray[j].currentRoot);
                        if (!usedIndex.has(i)) {
                            usedIndex.add(i)
                            // resultArrays.push(treeArray[i].currentRoot);
                            resultArrays.push(treeArray[i].myArray);
                        }
                    }
                }
                j++;
            }
        }
        i -= 1;
    }
    return resultArrays;
};

function generateAllSubTrees(root) {
    if (root === null) return [[], []];

    let doubleLeft = generateAllSubTrees(root.left);
    let doubleRight = generateAllSubTrees(root.right);
    let leftSubtrees = doubleLeft[0]
    let rightSubtrees = doubleRight[0]

    let oldNewArray = [[],doubleLeft[1].concat(doubleRight[1])]
    if (root.left === null && root.right === null)  oldNewArray[0].push(new ArrayAndRoot([root.val], root))

    leftSubtrees.forEach((subArray) => {
        oldNewArray[1].push(new ArrayAndRoot([...subArray.myArray], subArray.currentRoot))
        subArray.myArray.push(root.val);
        subArray.currentRoot = root;
        oldNewArray[0].push(subArray);
    })
    rightSubtrees.forEach((subArray) => {
        oldNewArray[1].push(new ArrayAndRoot([...subArray.myArray], subArray.currentRoot))
        subArray.myArray.push(root.val);
        subArray.currentRoot = root;
        oldNewArray[0].push(subArray);
    })

    return oldNewArray;
}

function arrayEquality(array1, array2) {
    if (array1.length !== array2.length)  return false;
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i])  return false;
    }
    return true;
}

function binaryTreeEquality(tree1, tree2) {
    if (tree1 === null || tree2 === null) {
        if (tree1 === null && tree2 === null)  return true;
        return false;
    }

    if (tree1.val !== tree2.val)  return false;
    if (!binaryTreeEquality(tree1.left, tree2.left))  return false;
    if (!binaryTreeEquality(tree1.right, tree2.right))  return false;

    return true;
}

function mainFindDuplicateSubTrees() {
    let tree;
    let duplicateArray;

    tree = new TreeNode(2, new TreeNode(1), new TreeNode(1));
    duplicateArray = findDuplicateSubtrees(tree);
    console.log(duplicateArray);
    console.assert(duplicateArray.length === 1)

    tempTree = new TreeNode(2, new TreeNode(4), null);
    secondTemp = new TreeNode(3, tempTree, new TreeNode(4));
    leftTree = new TreeNode(2, new TreeNode(4), null);
    tree = new TreeNode(1, leftTree, secondTemp);
    duplicateArray = findDuplicateSubtrees(tree);
    console.log(duplicateArray);
    console.assert(duplicateArray.length === 2)
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
*/

/*
Did it go well? No, quite bad
If not, why
    Not really sure
    Solution was awkward and wrong
    Awkward:
        Return arrays rather than dealing with trees
    Wrong:
        Was creating trees for all children, rathern than just the last batch of children
*/