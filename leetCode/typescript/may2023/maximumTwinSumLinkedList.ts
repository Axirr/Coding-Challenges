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

Better:
    Count back and forth
*/

/*
Completion time (minutes):
Question difficulty:
How did it go (1 - 6):
*/