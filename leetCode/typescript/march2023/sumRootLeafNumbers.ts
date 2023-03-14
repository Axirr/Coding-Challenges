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

function sumNumbers(root: TreeNode | null): number {
    let total:number = recursiveDFSsum(root, 0);
    return total;
};


function recursiveDFSsum(root: TreeNode | null, currentSum:number):number {
    if (root === null)  return 0;

    let total = 0;
    if (root.left === null && root.right === null)  return currentSum * 10 + root.val;
    else {
        total += recursiveDFSsum(root.left, currentSum * 10 + root.val)
        total += recursiveDFSsum(root.right, currentSum * 10 + root.val)
    }


    return total;
}

function storeDigitsRecursiveDFSsum(root: TreeNode | null, currentDigits:number[]):number {
    let total:number = 0;
    if (root === null)  return total;

    // Leaf node
    currentDigits.push(root.val);
    if (root.left === null && root.right === null) {
        for (let i = currentDigits.length - 1; i >= 0; i--) {
            total += currentDigits[i] * Math.pow(10, currentDigits.length - 1 - i)
        }
    // Non-leaf node
    } else {
        total += storeDigitsRecursiveDFSsum(root.left, currentDigits);
        total += storeDigitsRecursiveDFSsum(root.right, currentDigits);

    }
    currentDigits.pop()

    return total;
}

// Ugly version trying to return all digits to top level

// function recursiveDFSsum(root: TreeNode | null, currentDepth:number):number[] {
//     if (root === null) return [0];
//     if (root.left === null && root.right === null)  return [root.val * Math.pow(10, currentDepth)];
    
//     let resultArray:number[] = [];

//     if (root.left !== null) {
//         resultArray = recursiveDFSsum(root.left, currentDepth + 1);
//         for (let i = 0; i < resultArray.length; i++) {
//             resultArray[i] += root.val;
//         }
//     }
//     if (root.right !== null) {
//         let tempResultArray:number[] = recursiveDFSsum(root.right, currentDepth + 1);
//         for (let i = 0; i < tempResultArray.length; i++) {
//             resultArray.push(tempResultArray[i] + root.val);
//         }
//     }

//     return resultArray;
// }

function mainSumNumbers():void {
    let doQuitAssert:boolean = true;

    let root:TreeNode | null;
    let sumNumber:number;

    root = new TreeNode(1, new TreeNode(2, new TreeNode(7)), new TreeNode(3));
    sumNumber = sumNumbers(root);
    console.log(sumNumber);
    if (sumNumber !== 140)  {
        console.log("Assertion failed")
        if (doQuitAssert)  console.log('quitting'); return;
    }
}

mainSumNumbers();

/*
Data range/assumptions:
number of nodes n: [1, 1000]
values: [0, 9]
max depth 10
*/

/*
Tests:
n = 1
n = 1000
zero in values
zero as root?
depth = 10
*/

/*
Ideas:

Naive:
    Depth first search, add up when get to bottom
    O(n)

Simpler case: add up all digits
    Each non-leaf level returns itself plus below
    Leaf levels just return itself
With depth added, simply need to multiply by 10^depth

Bit more complicated than thought
Issues:
    Leaf nodes have lowest power of 10, not highest
    Can't just return a number

Not really doing it like good DFS
    Should pass down an array of digits
    And then just sum those once I get to the bottom
    And then can re

Is it possible to do with O(1) memory?
    Some DFS can do that
    But not where we have to keep the digits

Improved solution learned from LeetCode discussion boards
*/

/*
Completion time (minutes): 38
Did it go well? medium
Describe how it went:
    Started with a suboptimal idea
    But then did stop, replan, and execute
*/