import myAssert from "../march2023/Trie";

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}


function swapPairs(head: ListNode | null): ListNode | null {
    if (head === null || head.next === null)  return head;

    let evenList:ListNode[] = [];
    let oddList:ListNode[] = [];
    let currentNode:ListNode | null = head;
    let count = 0;

    while (currentNode !== null) {
        if (count % 2 === 1)  oddList.push(currentNode);
        else evenList.push(currentNode);

        currentNode = currentNode.next;
        count++;
    }

    let resultList:ListNode = oddList[0];
    let currentResultNode:ListNode = resultList;
    let oddIndex:number = 1;
    let evenIndex:number = 0;

    while (true) {
        if (oddIndex <= evenIndex) {
            currentResultNode.next = oddList[oddIndex];
            oddIndex++;
        } else {
            currentResultNode.next = evenList[evenIndex];
            evenIndex++;
        }

        if (oddIndex === oddList.length)  break;

        currentResultNode = currentResultNode.next;
    }

    // Add any remaining even list nodes
    while (evenIndex < evenList.length) {
        currentResultNode.next!.next = evenList[evenIndex];

        evenIndex++;
        currentResultNode = currentResultNode.next!;
    }

    // Null out the next on the new final node
    currentResultNode.next!.next = null;

    return resultList;
};

function mainSwapPairs(): void {
    let head:ListNode | null;
    let resultHead:ListNode | null;
    let doQuitIfAssertFails:boolean = true;
    let listResult:number[];
    let correctList:number[];

    head = linkedListFromList([1,2,3,4, 5]);
    resultHead = swapPairs(head);
    listResult = listFromLinkedList(resultHead);
    console.log(listResult);
    correctList = [2,1,4,3,5];
    myAssert(listEquality(listResult, correctList), doQuitIfAssertFails);

    head = linkedListFromList([1,2,3,4]);
    resultHead = swapPairs(head);
    listResult = listFromLinkedList(resultHead);
    console.log(listResult);
    correctList = [2,1,4,3];
    myAssert(listEquality(listResult, correctList), doQuitIfAssertFails);

    head = linkedListFromList([]);
    resultHead = swapPairs(head);
    listResult = listFromLinkedList(resultHead);
    console.log(listResult);
    correctList = [];
    myAssert(listEquality(listResult, correctList), doQuitIfAssertFails);

    head = linkedListFromList([1,2,3]);
    resultHead = swapPairs(head);
    listResult = listFromLinkedList(resultHead);
    console.log(listResult);
    correctList = [2, 1, 3];
    myAssert(listEquality(listResult, correctList), doQuitIfAssertFails);
}

function linkedListFromList(list:number[]):ListNode | null {
    if (list.length === 0)  return null;
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

mainSwapPairs();

/*
Data range/assumptions:
n: [0, 100]
val: [0, 100]
*/

/*
Tests:
n = 1
n = 100
n = 2
*/

/*
Ideas:

Naive:
    Make separate lists of both
    Traverse one, insert, until non-head list is consumed
*/

/*
Completion time (minutes): 25
Question difficulty: Medium
How did it go (1 - 6): 3
    Idea was good
    Had some tricky bugs though
*/