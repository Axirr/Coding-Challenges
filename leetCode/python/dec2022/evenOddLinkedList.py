from typing import Optional
import copy

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
    
    def prettyString(self):
        resultList = [str(self.val)]
        currentNode = self.next
        while currentNode:
            resultList.append(str(currentNode.val))
            currentNode = currentNode.next
        return ' '.join(resultList)

class Solution:
    def oddEvenList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        count = 0
        currentNode = head
        while currentNode:
            count += 1
            if count == 2:
                break
            currentNode = currentNode.next
        
        if count < 2:
            return head
        else:
            lastOdd = head
            firstEven = head.next
            lastEven = head.next
            currentOddNode = head.next.next
            while currentOddNode:
                lastOdd.next = currentOddNode
                lastOdd = currentOddNode

                currentEvenNode = currentOddNode.next
                if currentEvenNode:
                    lastEven.next = currentEvenNode
                    lastEven = currentEvenNode
                
                    currentOddNode = currentEvenNode.next
                else:
                    currentOddNode = None
            lastOdd.next = firstEven
            lastEven.next = None
        return head

def constructLinkedList(myList):
    if len(myList) == 0:  return None
    head = ListNode(myList[0])
    currentNode = head
    for i in range(1, len(myList)):
        item = myList[i]
        newNode = ListNode(item)
        currentNode.next = newNode
        currentNode = newNode
    return head

def main():
    mySol = Solution()
    linkedList = constructLinkedList([2,1,3,5,6,4,7])
    resultLL = mySol.oddEvenList(linkedList)
    print(resultLL.prettyString())
    linkedList = constructLinkedList([1,2,3,4,5])
    resultLL = mySol.oddEvenList(linkedList)
    print(resultLL.prettyString())
    linkedList = constructLinkedList([])
    resultLL = mySol.oddEvenList(linkedList)
    assert resultLL is None
    linkedList = constructLinkedList([1])
    resultLL = mySol.oddEvenList(linkedList)
    print(resultLL.prettyString())

main()

'''
Data range/assumptions:
len [0, 10^4]
values large
'''

'''
Tests:
Empty list
One element list
Large list
Even len
Odd len
'''

'''
Ideas:

Naive:
    Construct two new lists, one with odd nodes and other with even, then link two together

    Time complexity: n
    Space complexity: 2n
        Too big for question

Swap in place during traversal:
    Do head manually?
    Hold 3 nodes in place at a time
        Previous Odd Even
        Swap Odd and Even (including their next's)
        Attach new odd to head
    Will have to do last few nodes manually

    Time complexity: n
    Space complexity: 1

Doesn't work

Two pointers:
    Next odd, next even
    But where to store intermediate values
    Don't need to, just relink?
        Always hook odds to back of current odds
            And update that to point to start of evens
        And v.v.
'''