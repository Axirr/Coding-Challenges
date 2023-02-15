class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}


function hasCycle(head: ListNode | null): boolean {
    if (head === null)  return false;

    let visitedSet:Set<ListNode> = new Set<ListNode>();
    let frontier:ListNode[] = [head];
    let nextFrontier:ListNode[] = [];

    while (frontier.length > 0) {
        while (frontier.length > 0) {
            let tempOptional:ListNode | undefined = frontier.pop()
            let currentNode:ListNode;
            if (tempOptional !== undefined) {
                currentNode = tempOptional;
                if (visitedSet.has(currentNode))  return true;
                visitedSet.add(currentNode)
                if (currentNode.next !== null)  nextFrontier.push(currentNode.next);
            }
        }
        frontier = nextFrontier;
        nextFrontier = [];
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