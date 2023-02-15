class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}


function hasCycle(head: ListNode | null): boolean {
    if (head === null) return false;
    let impossibleValue = Math.pow(10,6);
    let currentNode:ListNode = head;

    while (true) {
        if (currentNode.val === impossibleValue) return true;
        currentNode.val = impossibleValue;
        if (currentNode.next !== null)  currentNode = currentNode.next;
        else break;
    }

    return false;
};

function mainHasCycle(): void {
    let head:ListNode | null;
    let doesHaveCycle:boolean;

    head = new ListNode(5);
    doesHaveCycle = hasCycle(head);
    console.log(doesHaveCycle)
    console.assert(!doesHaveCycle)
}

mainHasCycle();

/*
Constant space complexity?
    Depth first search, cycle will be infinite so if exceed n then know we have cycle
        We don't have n and this is inefficient
    Replace every node that you visit with a dummy reference
        If you ever reach the dummy, you know it has cycled
        Problem: how to set a reference when don't have the thing using it
    Set value of visited node to impossible value
*/