from typing import Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
    
    def prettyPrint(self):
        print(self.val, end=" ")
        currentNode = self.next
        while currentNode:
            print(currentNode.val, end=" ")
            currentNode = currentNode.next
        print()

class Solution:
    def middleNode(self, head: Optional[ListNode]) -> Optional[ListNode]:
        currentNode = head
        count = 0
        while (currentNode):
            count += 1
            currentNode = currentNode.next
        halfCount = (count // 2)
        count = 0
        currentNode = head
        while (halfCount > 0):
            currentNode = currentNode.next
            halfCount -= 1
        return currentNode

        '''
        1 -> 0
        2 -> 1
        3 -> 1
        4 -> 2
        '''

def main():
    mySol = Solution()
    originalNode = ListNode(1)
    tempNode = ListNode(2)
    originalNode.next = tempNode
    myNode = tempNode
    tempNode = ListNode(3)
    myNode.next = tempNode
    myNode = tempNode
    tempNode = ListNode(4)
    myNode.next = tempNode
    myNode = tempNode
    tempNode = ListNode(5)
    myNode.next = tempNode
    returnNode = mySol.middleNode(originalNode)
    returnNode.prettyPrint()

main()

'''
Data range/assumptions:
Len [1, 100]
Values small
'''

'''
Testing:
Len 1
Len 100
Even len
Odd len
'''

'''
Ideas:

Naive:
    Traverse list to get total count
    half = count // 2
    traverse half # times

    Time complexity: O(n)
'''