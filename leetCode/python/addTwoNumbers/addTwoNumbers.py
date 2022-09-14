from typing import Optional
'''
Algorithm
Store interim result in regular list
Add digits, back propogate carry as far as is needed
Have one additional carry for potential new digit
    Handle back propogate case where goes all the way to new digit
Construct linked list from regular list
'''

class ListNode:
    def __init__(self, val, next):
        self.val = val
        self.next = next
    
    def prettyPrint(self):
        currentNode = self
        while (currentNode != None):
            print(currentNode.val)
            currentNode = currentNode.next

    
class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        node1 = l1
        node2 = l2
        resultLinkedList = ListNode(None, None)
        currentNode = resultLinkedList
        carry = 0
        while (True):
            if (node1 and node2):
                newDigit = node1.val + node2.val + carry
            elif (node1):
                newDigit = node1.val + carry
            else:
                newDigit = node2.val + carry
            carry = 0
            if (newDigit > 9):
                carry = 1
                newDigit = (newDigit % 10) 
            currentNode.val = newDigit
            if (node1):
                node1 = node1.next
            if (node2):
                node2 = node2.next
            if (node1 == None and node2 == None):
                break
            newNode = ListNode(None, None)
            currentNode.next = newNode
            currentNode = newNode
        if (carry > 0):
            newNode = ListNode(carry, None)
            currentNode.next = newNode
        return resultLinkedList
    

def main():
    mySolution = Solution()

    # linkedList1 = makeLinkedListFromList([2,4,3])
    # linkedList2 = makeLinkedListFromList([5,6,4])

    # linkedList1 = makeLinkedListFromList([0])
    # linkedList2 = makeLinkedListFromList([0])

    linkedList1 = makeLinkedListFromList([9,9,9,9,9,9,9])
    linkedList2 = makeLinkedListFromList([9,9,9,9])

    resultLinkedList = mySolution.addTwoNumbers(linkedList1, linkedList2)
    resultLinkedList.prettyPrint()

def makeLinkedListFromList(myList):
    headNode = ListNode(myList[0], None)
    currentNode = headNode
    for i in range(1, len(myList)):
        newNode = ListNode(myList[i], None)
        currentNode.next = newNode
        currentNode = newNode
    return headNode

main()