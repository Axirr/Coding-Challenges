#include <stdbool.h>

#define NULL 0

struct ListNode* removeNthFromEnd(struct ListNode* head, int n){
    int count = 1;
    struct ListNode* currentNode = head;
    while (currentNode != NULL) {
        currentNode = currentNode->next;
        count += 1;
    }

    int targetCount = count - n;

    struct ListNode* previousNode;
    currentNode = head;
    count = 1;
    while (currentNode != NULL) {
        if (count == targetCount) {
            if (currentNode == head) {
                head = head->next;
                break;
            } else {
                previousNode->next = currentNode->next;
                break;
            }
        }

        previousNode = currentNode;
        currentNode = currentNode->next;
        count += 1;
    }

    return head;
}

struct ListNode {
    int val;
    struct ListNode *next;
};

/*
Simple test case
1 -> 2 -> 3
Remove 1 from end
count 1
node = 1
count 2
node = 2
count 3
node 3
node NULL, break
targetCount = 3 - 1 = 2
node 1
count 1
count != 2
prev 1
current 2
count 2
count == 2
result = 2
prev->next = 2->next = 3
break
return resultNode
correct
*/

/*
Data range/assumptions:
Non-empty
N is a valid node
List not very long?
*/

/*
Important test cases:
One element list
Remove last element
*/

/*
Naive:
    Traverse list, counting
    When find end, count - n is the one you need
    Retraverse, until count = count - n
    Remove and hook up previous node to node after removal
    Unlink returned node from list?
    Seems too simple?
    Number of nodes is so small, naive totally fine
*/