class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }

    prettyPrint(count = 0) {
        if (count > 15)  return
        console.log(this.val);
        if (this.next !== null)  this.next.prettyPrint(count + 1);
    }
}


function swapNodes(head: ListNode | null, k: number): ListNode | null {
    let count:number = 0;
    if (head === null) throw new Error("head is null");
    let currentNode:ListNode = head!;
    let kStartParentNode:ListNode | null = null;
    let kEndParentNode:ListNode = head;

    while (true) {
        if (count === k - 1)  kStartParentNode = currentNode;
        if (count > k - 1) kEndParentNode = kEndParentNode.next!;

        count += 1;
        if (currentNode.next === null)  break
        else currentNode = currentNode.next;
    }

    let tempStoreVal:number = kStartParentNode!.val;
    kStartParentNode!.val = kEndParentNode.val;
    kEndParentNode.val = tempStoreVal;

    return head;
}

function complicatedSwwapNodes(head: ListNode | null, k: number): ListNode | null {
    let count:number = 0;
    if (head === null) throw new Error("head is null");
    let currentNode:ListNode = head!;
    let kStartParentNode:ListNode | null = null;
    let kEndParentNode:ListNode = head;

    while (true) {
        if (count === k - 2)  kStartParentNode = currentNode;
        if (count > k) kEndParentNode = kEndParentNode.next!;

        count += 1;
        if (currentNode.next === null)  break
        else currentNode = currentNode.next;
    }
    if (kStartParentNode !== null) console.log(`Start parent val is ${kStartParentNode.val}`)
    else  console.log(`START IS NULL`)
    console.log(`End parent val is ${kEndParentNode.val}`)

    let kStartNode:ListNode;
    if (kStartParentNode === null)  kStartNode = head;
    else  kStartNode = kStartParentNode.next!;
    let kEndNode:ListNode = kEndParentNode.next!;

    let swapNext:ListNode | null = kStartNode.next;
    kStartNode.next = kEndNode.next;
    kEndNode.next = swapNext;

    kEndParentNode.next = kStartNode;
    kStartParentNode!.next = kEndNode;
    // if (kStartParentNode !== null)  kStartParentNode.next = kEndNode;
    // else return kEndNode;


    // if (k === 0)  return kEndNode;
    return head;
};

function mainSwapNodes():void {
    let head:ListNode | null;
    let k:number;
    let result:ListNode | null;

    head = linkedListFromList([7,9,6,6,7,8,3,0,9,5]);
    k = 5;
    result = swapNodes(head, k);
    result!.prettyPrint();
    console.log()

    head = linkedListFromList([1,2,3,4,5]);
    k = 2;
    result = swapNodes(head, k);
    result!.prettyPrint();
    console.log()
}

function linkedListFromList(list:number[]):ListNode {
    if (list.length === 0)  throw new Error("List needs at least one element");
    let head:ListNode = new ListNode(list[0], null);
    let previousNode:ListNode = head;
    for (let i = 1; i < list.length; i++) {
        const newNode = new ListNode(list[i], null);
        previousNode.next = newNode;
        previousNode = newNode;
    }

    return head;
}

mainSwapNodes();

/*
Data range/assumptions:
n: [1, 10^5]
k: [1, 10^5]
    < n
val: [1, 100]
*/

/*
Tests:
n = 1
n = max
k = 1
k = n
Swapping root node
*/

/*
Ideas:

Naive:
    K from the front is trivial
        Keep count and traverse
    K from the back
        Keep track of the node that is k nodes behind
            With a count
            Don't update until k elements into the list

What to do in case where parent is the one being swapped?
    Move parent value back one?
*/

/*
Completion time (minutes): 52
Question difficulty: Medium
How did it go (1 - 6): 1
    Had to look up solution
    And still don't understand the more complicated version I was trying to do
        Which could definitely be asked for
*/