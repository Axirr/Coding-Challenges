class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}


/*
Don't fully understand the math, but it's something like
    currentNode will have travelled a full cycle plus outsideLength before collision
    So then travelling outsideLength again will get it back to the start node of the cycle
*/
function detectCycle(head: ListNode | null): ListNode | null {
    if (head === null)  return null;
    if (head.next === null)  return null;

    let currentNode:ListNode | null = head;
    let doubleSpeedNode:ListNode | null = head;

    while (doubleSpeedNode !== null) {
        doubleSpeedNode = doubleSpeedNode.next === null ? null : doubleSpeedNode.next.next;
        currentNode = currentNode!.next;

        if (doubleSpeedNode === currentNode)  {
            let slowNode2: ListNode = head!;
            while (true) {
                if (slowNode2 === currentNode)  return slowNode2;

                slowNode2 = slowNode2.next!;
                currentNode = currentNode!.next!;
            }
        }

    }

    return null;
}

function modifyListConstantSpaceDetectCycle(head: ListNode | null): ListNode | null {
    if (head === null)  return null;
    if (head.next === null)  return null;

    let currentNode:ListNode | null = head;
    let doubleSpeedNode:ListNode | null = head.next;
    let recognizableValue = 1000000;
    let didFindCycle = false;

    // Detect cycle
    while (doubleSpeedNode !== null) {
        if (doubleSpeedNode === currentNode)  {
            didFindCycle = true;
            break;
        }

        doubleSpeedNode = doubleSpeedNode.next === null ? null : doubleSpeedNode.next.next;
        currentNode = currentNode!.next;
    }

    // Replace all values of nodes in cycle with a uniquely recognizable one
    if (didFindCycle) {
        while (true) {
            currentNode!.val = recognizableValue;
            if (currentNode?.next?.val === recognizableValue)  break;

            currentNode = currentNode!.next;
        }

        // Traverse from head to first instance of recognizable value, which is the cycle head
        currentNode = head;
        while (true) {
            if (currentNode!.val === recognizableValue)  return currentNode;

            currentNode = currentNode!.next;
        }
    }


    return null;
}

function spaceIntensiveDetectCycle(head: ListNode | null): ListNode | null {
    if (head === null)  return null;

    let nodeMap:Map<ListNode, number> = new Map<ListNode, number>();
    let currentNode:ListNode | null = head;
    let index:number = 0;

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

How to do in constant space?
    Using the values is tempting but very fragile
        E.g. all values the same
Double speed moving pointer
    Will catch up with the other at some point in the cycle
        But how do we figure out if it is the start node of cycle?
        Start node's parent is not in the cycle
            Or is null
        Retraverse from the start until hit a node in the cycle
            E.g. for each node, traverse whole cycle as a search
            Might work, but very inefficient for possible large cycle

Finding start node:
    Two pointer traversal until firstPointer.child = secondPointer
    A nested for loop
    n^2
Modify values in cycle to something recognizable
    Tough with strong typing
    Higher than max value?

Then retraverse from start until hit first instance of that value
Involves modification of original linked list, which isn't great
    Necessary for O(1) time complexity?

Looked up better solution without modifying the list:
    Starting traversal from start of the list again when first duplciate found
    Values at time of meeting:
        currentNode travel time = A = outsideLength + insideLength
        doubleNode travel time = 2A = outsideLength + X
            Where X % insideLength = 0;
*/

/*
Completion time (minutes): 13
Did it go well? yes
If not, why?
    Naive worked and was only O(n) for both time and space
*/