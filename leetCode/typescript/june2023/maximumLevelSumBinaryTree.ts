import myAssert from "../march2023/Trie";
import TreeNode from './minimumAbsoluteDifferentBST'

function maxLevelSum(root: TreeNode | null): number {
    if (root === null)  return 0;

    let maxLevel:number = 1;
    let currentLevel:number = 1;
    let maxSumForLevel:number = root.val;
    let frontier:TreeNode[] = [root];
    let nextFrontier:TreeNode[] = [];
    let total:number = 0;
    while (frontier.length > 0) {
        while (frontier.length > 0) {
            let currentNode:TreeNode = frontier.pop()!;
            total += currentNode.val;
            if (currentNode.right !== null)  nextFrontier.push(currentNode.right)
            if (currentNode.left !== null)  nextFrontier.push(currentNode.left)

        }
        if (total > maxSumForLevel) {
            maxLevel = currentLevel;
            maxSumForLevel = total;
        }

        maxSumForLevel = Math.max(total, maxSumForLevel);
        currentLevel++;
        total = 0;
        frontier = nextFrontier;
        nextFrontier = [];
    }

    return maxLevel;
};

function mainMaxLevelSum():void {
    let root:TreeNode;
    let result:number;
    let correctResult:number;
    let doQuitIfAssertFails:boolean = true;

    root = new TreeNode(5, new TreeNode(1), new TreeNode(3))
    correctResult = 1;
    result = maxLevelSum(root);
    console.log(`final result ${result}`);
    myAssert(result === correctResult, doQuitIfAssertFails);

    root = new TreeNode(5, new TreeNode(-3), new TreeNode(10))
    correctResult = 2;
    result = maxLevelSum(root);
    console.log(`final result ${result}`);
    myAssert(result === correctResult, doQuitIfAssertFails);
}

mainMaxLevelSum();

/*
Data range/assumptions:
*/

/*
Tests:
*/

/*
Ideas:

Naive:
    Level based double frontier BFS
*/

/*
Completion time (minutes): 14
Question difficulty: Medium
How did it go (1 - 6): 5
    Pretty quick
    Small bugs
*/