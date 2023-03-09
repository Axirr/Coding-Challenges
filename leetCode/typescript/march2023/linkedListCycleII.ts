class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}


function detectCycle(head: ListNode | null): ListNode | null {
    if (head === null)  return null;

    let nodeMap:Map<ListNode, number> = new Map<ListNode, number>();
    let currentNode:ListNode | null = head;
    let index = 0;

    while (currentNode !== null) {
        nodeMap.set(currentNode, index);
        if (nodeMap.has(currentNode.next!)) return currentNode.next;
        
        currentNode = currentNode.next;
        index++;
    }

    return null;
};

function mainDetectCycle():void {
    let head:ListNode;
    let resultNode:ListNode | null;

    let linkListNode = new ListNode(4)
    let tempListNode = new ListNode(0, linkListNode)
    tempListNode = new ListNode(2, tempListNode);
    linkListNode.next = tempListNode;
    head = new ListNode(3, tempListNode);
    resultNode = detectCycle(head);
    console.log(resultNode);
}

mainDetectCycle();

/*
Data range/assumptions:
lenght n: [0, 10^4]
values: [10^-5, 1-^5]
pos: negative one for not found
*/

/*
Test:
n = 1
n = max
values large
values negative
not found
*/

/*
Ideas:

Naive:
    Put all nodes in a set
    If node.next in set, return
    Time: O(n)
    Space: O(n)
*/

/*
Completion time (minutes): 13
Did it go well? yes
If not, why?
    Naive worked and was only O(n) for both time and space
*/