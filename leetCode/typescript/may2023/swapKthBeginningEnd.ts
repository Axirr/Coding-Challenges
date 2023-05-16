import myAssert from "../march2023/Trie"

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }

    prettyPrint(count = 0) {
        if (count > 15)  throw new Error("likely infinite loop")
        console.log(this.val);
        if (this.next !== null)  this.next.prettyPrint(count + 1);
    }
}


// function valueSwapNodes(head: ListNode | null, k: number): ListNode | null {
//     let count:number = 0;
//     if (head === null) throw new Error("head is null");
//     let currentNode:ListNode = head!;
//     let kStartParentNode:ListNode | null = null;
//     let kEndParentNode:ListNode = head;

//     while (true) {
//         if (count === k - 1)  kStartParentNode = currentNode;
//         if (count > k - 1) kEndParentNode = kEndParentNode.next!;

//         count += 1;
//         if (currentNode.next === null)  break
//         else currentNode = currentNode.next;
//     }

//     let tempStoreVal:number = kStartParentNode!.val;
//     kStartParentNode!.val = kEndParentNode.val;
//     kEndParentNode.val = tempStoreVal;

//     return head;
// }

function swapNodes(head: ListNode | null, k: number): ListNode | null {
    let count:number = 0;
    if (head === null) throw new Error("head is null");
    if (k === 1 && head.next === null)  return head;
    if (head.next!.next === null)  {
        let secondNode:ListNode = new ListNode(head.val, null);
        return new ListNode(head.next!.val, secondNode);
    }

    let currentNode:ListNode = head!;
    let kStartParentNode:ListNode | null = null;
    let kEndParentNode:ListNode | null = head;
    let didChange:boolean = false
    let maybeValue:ListNode | null = null;

    while (true) {
        if (count === k - 2)  kStartParentNode = currentNode;
        if (count > k) {
            kEndParentNode = kEndParentNode.next!;
            didChange = true;
        }
        if (count === k - 2 && !didChange) maybeValue = currentNode;

        count += 1;
        if (currentNode.next === null)  {
            break
        }
        else currentNode = currentNode.next;
    }

    if (!didChange)  {
        kEndParentNode = maybeValue;
    }

    if (kStartParentNode !== null) console.log(`Start parent val is ${kStartParentNode.val}`)
    else  console.log(`START IS NULL`)
    if (kEndParentNode !== null)  console.log(`End parent val is ${kEndParentNode.val}`)
    else  console.log(`END IS NULL`)

    if (kStartParentNode === kEndParentNode)  return head;

    let kStartNode:ListNode = head;
    if (kStartParentNode !== null)  kStartNode = kStartParentNode.next!;
    let kEndNode:ListNode = head;
    if (kEndParentNode !== null)  kEndNode = kEndParentNode.next!;

    // let swapNext:ListNode | null = kStartNode.next;
    // kStartNode.next = kEndNode.next;
    // kEndNode.next = swapNext;

    let distance:number = Math.abs((k - 2) - (count - k - 1));
    // console.log(`Distance ${distance}`)
    // if (distance === 1 && (kStartParentNode !== null || kEndParentNode !== null))  {
    if (distance === 1) {
        let absoluteFirst:ListNode = kStartParentNode!;
        let absoluteLast:ListNode | null = kEndNode!.next;
        let firstValue:number = kStartNode.val;
        let secondValue:number = kEndNode.val;

        if ((k - 2) >  count - k - 1) {
            absoluteFirst = kEndParentNode!;
            absoluteLast = kStartNode!.next;
            firstValue = kEndNode.val;
            secondValue = kStartNode.val;
        }

        let secondNew = new ListNode(firstValue, absoluteLast);
        let firstNew = new ListNode(secondValue, secondNew);
        if (absoluteFirst !== null) absoluteFirst.next = firstNew;
        else return firstNew

        return head;
    }

    let swapNext:ListNode | null = kEndNode.next;
    kEndNode.next = kStartNode.next;
    kStartNode.next = swapNext;

    if (kEndParentNode !== null)  kEndParentNode.next = kStartNode;
    if (kStartParentNode !== null)  kStartParentNode!.next = kEndNode;


    console.log(`${count - k}`)
    if (k === 1 || count - k === 0)  {
        console.log('Different return')
        return kEndNode;
    }

    return head;
}

function mainSwapNodes():void {
    let head:ListNode | null;
    let k:number;
    let result:ListNode | null;
    let listResult:number[];
    let correctList:number[];
    let doQuitIfAssertFails:boolean = true;

    head = linkedListFromList([1]);
    k = 1;
    result = swapNodes(head, k);
    listResult = listFromLinkedList(result);
    correctList = [1];
    console.log(listResult);
    myAssert(listEquality(listResult, correctList), doQuitIfAssertFails);
    console.log()

    head = linkedListFromList([100,24,24,36,18,52,95,61,54,88,86,79,11,1,31,26]);
    k = 16;
    result = swapNodes(head, k);
    listResult = listFromLinkedList(result);
    correctList = [26,24,24,36,18,52,95,61,54,88,86,79,11,1,31,100];
    console.log(listResult);
    myAssert(listEquality(listResult, correctList), doQuitIfAssertFails);
    console.log()

    head = linkedListFromList([80,46,66,35,64]);
    k = 1;
    result = swapNodes(head, k);
    listResult = listFromLinkedList(result);
    correctList = [64,46,66,35,80];
    console.log(listResult);
    myAssert(listEquality(listResult, correctList), doQuitIfAssertFails);
    console.log()

    head = linkedListFromList([100,90]);
    k = 2;
    result = swapNodes(head, k);
    listResult = listFromLinkedList(result);
    correctList = [90, 100];
    console.log(listResult);
    myAssert(listEquality(listResult, correctList), doQuitIfAssertFails);
    console.log()

    head = linkedListFromList([1,2]);
    k = 1;
    result = swapNodes(head, k);
    listResult = listFromLinkedList(result);
    correctList = [2,1];
    console.log(listResult);
    myAssert(listEquality(listResult, correctList), doQuitIfAssertFails);
    console.log()

    head = linkedListFromList([7,9,6,6,7,8,3,0,9,5]);
    k = 5;
    result = swapNodes(head, k);
    listResult = listFromLinkedList(result);
    correctList = [7,9,6,6,8,7,3,0,9,5];
    console.log(listResult);
    myAssert(listEquality(listResult, correctList), doQuitIfAssertFails);
    console.log()

    head = linkedListFromList([7,9,6,6,7,8,3,0,9,5]);
    k = 6;
    result = swapNodes(head, k);
    listResult = listFromLinkedList(result);
    correctList = [7,9,6,6,8,7,3,0,9,5];
    console.log(listResult);
    myAssert(listEquality(listResult, correctList), doQuitIfAssertFails);
    console.log()

    head = linkedListFromList([1,2,3,4,5]);
    k = 2;
    result = swapNodes(head, k);
    listResult = listFromLinkedList(result);
    correctList = [1,4,3,2,5];
    console.log(listResult);
    myAssert(listEquality(listResult, correctList), doQuitIfAssertFails);
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

function listFromLinkedList(linkedList:ListNode | null) {
    let list:number[] = [];
    let currentNode:ListNode | null = linkedList;

    while (currentNode !== null) {
        list.push(currentNode.val);
        currentNode = currentNode.next;
    }

    return list;
}

function listEquality(list1:number[], list2:number[]) {
    if (list1.length !== list2.length)  return false;
    for (let i = 0; i < list1.length; i++) {
        if (list1[i] !== list2[i])  return false;
    }

    return true;
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

Two situations to deal with:
    A parent node is null (i.e. one of our nodes is the head)
    One of our nodes is the parent of the other

Node is head:
    Skip next swap on that parent
    Return the new head
    For special case k = 1 and n = 1, just return list no changes

Parent is a swap target:
    Move parent back one after getting the swapNode from it?
        Non-trivial with non-linked list
        Recursively run with k - 1?
        Seems ugly

Change swapping order?
    If we swap the swap target first, and update parent of other, will be fixed?
    What about special case both have same parent?
        Just return list, no swap needed
    Nope

Special procedure to just redo that part entirely?
    Use end of latest and start of earliest
    Make new nodes with new values
    Fresh nodes
*/

/*
Completion time (minutes): 52
Question difficulty: Medium
How did it go (1 - 6): 1
    Had to look up solution
    And still don't understand the more complicated version I was trying to do
        Which could definitely be asked for
*/