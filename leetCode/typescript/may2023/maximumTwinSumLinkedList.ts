import myAssert from '../march2023/Trie';
import funcs from './swapEverySecondNode';

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}
 

function pairSum(head: ListNode | null): number {
    if (head === null)  throw new Error("head cannot be null");

    let slow:ListNode | null = head;
    let fast:ListNode | null = head;

    while (fast !== null && fast.next !== null) {
        slow = slow!.next;
        fast = fast.next!.next;
    }

    // Slow is now middle
    // Reverse back half of list
    let nextNode:ListNode | null = null;
    let prevNode:ListNode | null = null;
    while (slow !== null) {
        nextNode = slow.next;
        slow.next = prevNode;
        prevNode = slow;
        slow = nextNode;
    }

    let maxSum:number = 0;
    let start:ListNode | null = head;
    while (prevNode !== null) {
        maxSum = Math.max(maxSum, start!.val + prevNode.val)

        prevNode = prevNode.next;
        start = start!.next;
    }

    return maxSum;
}

function saveALittleSpacePairSum(head: ListNode | null): number {
    if (head === null)  throw new Error("head cannot be null");

    let length:number = 0;
    let currentNode:ListNode | null = head;
    while (currentNode !== null) {
        length++;
        currentNode = currentNode.next;
    }

    let stepSize:number = Math.max(5, Math.floor(Math.log2(length)))
    // let stepSize:number = Math.max(5, Math.floor(length / 10));
    let count:number = 0;
    let indexMap:Map<number, ListNode> = new Map();

    currentNode = head;
    while (currentNode) {
        if (count % stepSize === 0) {
            indexMap.set(count, currentNode);
        }

        count++;
        currentNode = currentNode.next;
    }

    currentNode = head;
    count = 0;
    let backCount:number = length - count - 1;
    let roundDownCount:number;
    let maxTwinSum:number = 0;

    while (backCount - count >=0) {
        backCount = length - count - 1;
        roundDownCount = backCount - (backCount % stepSize);
        let backNode:ListNode = indexMap.get(roundDownCount)!;
        while (roundDownCount < backCount) {
            backNode = backNode.next!;
            roundDownCount++;
        }

        maxTwinSum = Math.max(maxTwinSum, currentNode!.val + backNode.val)
        count++;
        currentNode = currentNode!.next;
    }

    return maxTwinSum;
}

function spaceIntensivePairSum(head: ListNode | null): number {
    if (head === null)  throw new Error("head cannot be null");

    let backwardsList:ListNode[] = []
    let currentNode:ListNode | null = head;
    while (currentNode !== null) {
        backwardsList.push(currentNode);

        currentNode = currentNode.next;
    }

    currentNode = head;
    let backIndex:number = backwardsList.length - 1;
    let maxTwinSum:number = currentNode.val + backwardsList[backIndex].val;
    while (backIndex >= 0) {
        maxTwinSum = Math.max(maxTwinSum, currentNode!.val + backwardsList[backIndex].val);

        backIndex--;
        currentNode = currentNode!.next;
    }

    return maxTwinSum;
};

function mainPairSum():void {
    let head:ListNode | null;
    let result:number;
    let doQuitIfAssertFails:boolean = true;

    head = funcs.linkedListFromList([5,4,2,1]);
    result = pairSum(head);
    console.log(`Final result ${result}`);
    myAssert(result === 6, doQuitIfAssertFails);

    head = funcs.linkedListFromList([4,2,2,3]);
    result = pairSum(head);
    console.log(`Final result ${result}`);
    myAssert(result === 7, doQuitIfAssertFails);

    head = funcs.linkedListFromList([1,100000]);
    result = pairSum(head);
    console.log(`Final result ${result}`);
    myAssert(result === 100001, doQuitIfAssertFails);
}

mainPairSum();

/*
Data range/assumptions:
n = [2, 10^5]
val: [1, 10^5]
*/

/*
Tests:
n = 1
n = max
vals large
vals small
max is start/end
*/

/*
Ideas:

Naive:
    Rebuild list backwards
    Then run same traversal procedure on both
    Time: O(n)
    Space: O(n)

How to do in space O(1)?
    Normal mirror index won't work
        E.g. frontIndex = i, endIndex = length - i - 1
    Stack would work but will take the same amount of space
    Repeated traversal decrement distance by 1 would work but very slow 
        n^2
    Keep references to certain nodes akin to binary search
        Calculate length
        Then make references every log(n) count?
        Won't be binary search time complexity though?
        Worst case is n * log(n)
            If have O(1) function for finding best index
            Mod count

How to choose how many shortcut nodes to make?
    Tradeoff between space and time complexity
    stepSize = 1
        Time: O(n)
        Space: O(n)
    stepSize = n
        Time:
            n * n / 2 => O(n^2)
        Space: O(1)
    stepSize = k
        Time: n * n / k
            Technically still n^2?
                Not if k scales with n too
                k = x * n
                n * n / xn
                n * 1 / x
        Space: O(n / k)
*/

/*
Completion time (minutes): 15
Question difficulty: Medium
How did it go (1 - 6): 5
    Solution was simple but worked
    No bugs
*/