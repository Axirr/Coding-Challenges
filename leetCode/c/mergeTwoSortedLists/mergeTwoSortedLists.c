 #include <stddef.h>
 /*
 Data range/assumptions
 Can be 0 length
 Only collective 100 nodes total, no scale issues
 */

/*
Important test cases
Both empty
One empty
One all before the first of the next
*/

/*
Plain language:
Naive:
    Iterate through lists, compare vals, put head into result list, rebase linked list to head.next
    Until one of them runs out
    Concate non-empty remaining list onto the result and return
*/


struct ListNode* mergeTwoLists(struct ListNode* list1, struct ListNode* list2){
    if (list1 == NULL) {  return list2;  }
    if (list2 == NULL) {  return list1;  }
    struct ListNode* list1Head = list1;
    struct ListNode* list2Head = list2;
    struct ListNode* resultListHead = list1Head;
    if (list2Head->val < list1Head->val) {
        resultListHead = list2Head;
        list2Head = list2Head->next;
    } else {
        list1Head = list1Head->next;
    }
    struct ListNode* resultEnd = resultListHead;
    while (list1Head != NULL && list2Head != NULL) {
        if (list1Head->val <= list2Head->val) {
            resultEnd->next = list1Head;
            resultEnd = resultEnd->next;
            list1Head = list1Head->next;
        } else {
            resultEnd->next = list2Head;
            resultEnd = resultEnd->next;
            list2Head = list2Head->next;
        }
    }
    if (list1Head != NULL) {
        resultEnd->next = list1Head;
    } else {
        resultEnd->next = list2Head;
    }
    return resultListHead;
}

struct ListNode {
    int val;
    struct ListNode *next;
};

int main() {
    mergeTwoLists(NULL, NULL);
    return 0;
}