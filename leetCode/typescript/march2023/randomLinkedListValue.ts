class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}


class Solution {
    listLength:number;
    head:ListNode | null;
    constructor(head: ListNode | null) {
        this.head = head;
        let currentNode:ListNode;

        if (head === null)  {
            this.listLength = 0;
            return;
        }
        else  { currentNode = head };
        let length:number = 0;

        while (true) {
            length++;
            if (currentNode.next === null)  break;
            else  currentNode = currentNode.next;
        }
        this.listLength = length;
    }

    getRandom(): number {
        let randomNumber:number = Math.floor(Math.random() * this.listLength);
        let count:number = 0;
        let currentNode:ListNode = this.head!;

        while (count < randomNumber) {
            count++;
            currentNode = currentNode.next!;
        }
        return currentNode.val;
    }
}

function mainRandomLinkedListValue(): void {
    let head:ListNode | null;
    let randomNumber:number;
    let sol:Solution;
    let iterations:number = 100;
    let runCount:number;
    let setValues:Set<number>;

    head = new ListNode(1);
    head.next = new ListNode(2, new ListNode(3));
    sol = new Solution(head);
    setValues = new Set<number>();
    setValues.add(1);
    setValues.add(2);
    setValues.add(3);
    runCount = 0;
    while (runCount < iterations && setValues.size > 0) {
        randomNumber = sol.getRandom();
        setValues.delete(randomNumber);
        console.log(`Random number ${randomNumber}`);
        runCount++;
    }
    console.assert(setValues.size === 0);
}

mainRandomLinkedListValue();

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(head)
 * var param_1 = obj.getRandom()
 */

/*
Data range/assumptions:
length of list n: [1, 10^4]
values: +-10^4
At most 10^4 calls will be made to get random
*/

/*
Tests:
n = 1
n = 10^4
large values
negative values
Make sure can get last number
Make sure can get first number
*/

/*
Ideas:

Naive:
    Traverse list once to determine length
    Return random number in that range
    Traverse again until get it
    O(2n)
    Seems wasteful, but actually not bad?
        I guess if they make 10^4 calls it becomes functionally n^2
*/

/*
Completion time (minutes): 20
Did it go well? Yes
If not, why?
    Seemed like a simple problem for medium?
    Didn't even have to use the naive approach
    Would be a little harder with a dynamic list
        But then just update length value
*/