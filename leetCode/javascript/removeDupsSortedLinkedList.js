
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}


var deleteDuplicates = function(head) {
    if (head == null) { return head; }
    let lastGood = head;
    let lastValue = head.val;
    let currentPlace = head;
    while (currentPlace) {
        if (currentPlace.val !== lastValue) {
            lastGood.next = currentPlace

            lastGood = currentPlace
            lastValue = currentPlace.val
        }
        currentPlace = currentPlace.next
    }
    lastGood.next = null;
    return head;
};

function printLinkedList(head) {
    current = head
    while (current != null) {
        console.log(current.val)
        current = current.next
    }
}

function myMain() {
    let head;
    let noDups;

    head = new ListNode(7)
    head.next = new ListNode(7)
    noDups = deleteDuplicates(head);
    printLinkedList(noDups)
}

myMain()

/*
Data range/assumptions:
n: [0, 300]
*/

/*
*/

/*
*/